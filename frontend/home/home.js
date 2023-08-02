const notyf = new Notyf();

const urlForm = document.getElementById('url-form');
const customUrlCheckbox = document.getElementById('customUrlCheckbox');

function copyFunction() {
    try {
        const copyText = document.getElementById('shortenedUrl');
        navigator.clipboard.writeText(copyText.innerHTML);
        notyf.success('URL copied to clipboard!');
    } catch (err) {
        notyf.error('An error occurred: ' + err);
    }
}

async function showShortenedUrl(responseData) {
    const main = document.querySelector('main');
    const section = main.querySelector('section');

    if (section) {
        main.removeChild(section);
    }

    const newSection = document.createElement('section');
    newSection.innerHTML = `
        <a href="https://shortenit.me/${responseData.shortenedUrl}" target="_blank" id="shortenedUrl">https://shortenit.me/${responseData.shortenedUrl}</a>
        <button onclick="copyFunction()" id="copyButton">Copy</button>
        `;
    main.appendChild(newSection);
    notyf.success('URL shortened successfully!');
    await getTotalUrls();
}

async function getTotalUrls() {
    const totalUrls = document.getElementById('totalUrls');
    const totalClicks = document.getElementById('totalClicks');
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

    const customUrlCheckbox = document.getElementById('customUrlCheckbox');

    const url = document.getElementById('url').value;
    const data = new URLSearchParams();
    data.append('url', url);

    try {
        if (customUrlCheckbox.checked) {
            const customUrl = document.getElementById('customUrl').value;
            data.append('customUrl', customUrl);
            const response = await fetch(
                'https://shortenit.me/api/custom-url',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: data,
                }
            );
            const responseData = await response.json();
            if (response.status !== 200) {
                return notyf.error(responseData.error);
            }
            await showShortenedUrl(responseData);
        } else {
            const response = await fetch(
                'https://shortenit.me/api/shorten-url',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/x-www-form-urlencoded; charset=UTF-8',
                    },
                    body: data,
                }
            );
            const responseData = await response.json();
            if (response.status !== 200) {
                return notyf.error(responseData.error);
            }
            await showShortenedUrl(responseData);
        }
    } catch (err) {
        notyf.error('An error occurred: ' + err);
    }
});

customUrlCheckbox.addEventListener('change', () => {
    const customUrl = document.querySelector('.custom-url-main');
    if (customUrlCheckbox.checked) {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = 'customUrl';
        newInput.placeholder = 'Custom URL';
        newInput.required = true;
        newInput.minLength = 3;
        newInput.classList.add('fade-in-out');
        customUrl.appendChild(newInput);
    } else {
        const customUrlInput = document.getElementById('customUrl');
        customUrl.removeChild(customUrlInput);
    }
});
