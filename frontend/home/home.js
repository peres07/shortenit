const urlForm = document.getElementById('url-form');
const urlShortened = document.getElementById('urlShortened');
const totalUrls = document.getElementById('totalUrls');

async function getTotalUrls() {
    const response = await fetch(
        'https://shortenit.me/api/statistics/total-urls'
    );
    const responseData = await response.json();
    totalUrls.innerHTML =
        'Total URLs shortened: ' + responseData.totalShortened;
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
        urlShortened.href = 'https://shortenit.me/' + responseData.urlShortened;
        urlShortened.innerHTML =
            'https://shortenit.me/' + responseData.urlShortened;
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
