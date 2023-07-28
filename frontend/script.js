const urlForm = document.getElementById('url-form');
const urlShortened = document.getElementById('urlShortened');

urlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const url = document.getElementById('url').value;
    const data = new URLSearchParams();
    data.append('url', url);

    fetch('http://127.0.0.1:3000/api/shorten-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: data,
    }).then(function(response) {
        response.json().then(function(data) {
            if (response.status !== 200) {
                return alert(data.error);
            }
            urlShortened.href = 'http://127.0.0.1:3000/' + data.urlShortened;
            urlShortened.innerHTML = 'http://127.0.0.1:3000/' + data.urlShortened;
        });
    }).catch(function(err) {
        alert('An error occurred: ' + err);
    });
    
});

copyButton.addEventListener('click', () => {
    const text = urlShortened.innerHTML;
    navigator.clipboard.writeText(text).then(() => {
        alert('URL copied to clipboard!');
    }).catch((err) => {
        console.log(err);
        alert('Failed to copy URL');
    });
});