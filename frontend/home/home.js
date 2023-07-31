const urlForm = document.getElementById('url-form');
const urlShortened = document.getElementById('urlShortened');
const totalUrls = document.getElementById('totalUrls');
const totalClicks = document.getElementById('totalClicks');

async function getTotalUrls() {
    const response = await fetch(
        'http://127.0.0.1:3000/api/statistics/get-total'
    );
    console.log(response);
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
            return alert(responseData.error);
        }
        alert('URL shortened successfully!');

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
        await getTotalUrls();
    } catch (err) {
        console.log(err);
        alert('An error occurred: ' + err);
    }
});

function copyFunction() {
    if (urlShortened.innerHTML === 'Your link will show here') {
        return alert('No URL to copy!');
    }
    const copyText = document.getElementById('urlShortened');
    navigator.clipboard.writeText(copyText.innerHTML);
    alert('URL copied to clipboard!');
}
