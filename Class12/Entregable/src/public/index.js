/*         CLEANING THE FORM INPUTS       */
const socket = io();
const button = document.getElementById('button');
const thumbnail = document.getElementById('thumbnail');
const title = document.getElementById('title');
const price = document.getElementById('price');

button.addEventListener('click', () => {
    title.innerHTML = '';
    thumbnail.innerHTML = '';
    price.innerHTML = '';
    
})   

