const notyf = new Notyf();

const urlForm = document.getElementById('url-form');
const urlShortened = document.getElementById('urlShortened');
const totalUrls = document.getElementById('totalUrls');
const totalClicks = document.getElementById('totalClicks');

async function getTotalUrls() {
    const response = await fetch(
        'https://shortenit.me/api/statistics/get-total'
    );
    const responseData = await response.json();
    totalUrls.innerHTML =
        'Total URLs shortened: ' + responseData.totalShortened;
    totalClicks.innerHTML = 'Total URLs clicked: ' + responseData.totalClicks;
}

window.onload = async () => {
    await getTotalUrls();
};

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const data = new URLSearchParams();
    data.append('url', url);

    try {
        const response = await fetch('https://shortenit.me/api/shorten-url', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: data,
        });
        const responseData = await response.json();
        if (response.status !== 200) {
            return notyf.error(responseData.error);
        }
        const main = document.querySelector('main');
        const section = main.querySelector('section');

        if (section) {
            main.removeChild(section);
        }

        const newSection = document.createElement('section');
        newSection.innerHTML = `
        <a href="https://shortenit.me/${responseData.urlShortened}" target="_blank" id="urlShortened">https://shortenit.me/${responseData.urlShortened}</a>
        <button onclick="copyFunction()" id="copyButton">Copy</button>
        `;
        main.appendChild(newSection);
        notyf.success('URL shortened successfully!');
        await getTotalUrls();
    } catch (err) {
        notyf.error('An error occurred: ' + err);
    }
});

function copyFunction() {
    try {
        const copyText = document.getElementById('urlShortened');
        navigator.clipboard.writeText(copyText.innerHTML);
        notyf.success('URL copied to clipboard!');
    } catch (err) {
        notyf.error('An error occurred: ' + err);
    }
}
