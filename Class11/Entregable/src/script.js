const button = document.getElementById('button');
        const thumbnail = document.getElementById('thumbnail');
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        button.addEventListener('onclick', () => {
            title.innerHTML = '';
            thumbnail.innerHTML = '';
            price.innerHTML = '';
        });
