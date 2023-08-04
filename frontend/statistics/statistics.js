const notyf = new Notyf();

const urlForm = document.getElementById('url-form');

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const data = new URLSearchParams();
    data.append('url', url);

    try {
        const response = await fetch(
            `https://shortenit.me/api/statistics/get-url`,
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
        const main = document.querySelector('main');
        const section = main.querySelector('section');

        if (section) {
            main.removeChild(section);
        }

        const newSection = document.createElement('section');
        newSection.innerHTML = `
            <h2>URL Statistics</h2>
            <p>Shortened URL: <a href="https://shortenit.me/${
                responseData.shortenedUrl
            }">https://shortenit.me/${responseData.shortenedUrl}</a></p>
            <p>Redirect to: <a href="${responseData.url}">${
            responseData.url
        }</a></p>
            <p>Number of clicks: ${responseData.totalClicks}</p>
            <p>Created at: ${new Date(responseData.createdAt)
                .toISOString()
                .replace('T', ' ')
                .slice(0, -5)}</p>
        `;

        main.appendChild(newSection);
        urlForm.reset();
        notyf.success('URL statistics retrieved successfully!');
    } catch (err) {
        urlForm.reset();
        notyf.error('An error occurred: ' + err);
    }
});
