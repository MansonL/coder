const button = document.getElementById('button');
const p = document.getElementById('p');
const input = document.getElementById('test')
const socket = io();
console.log(button)
button.addEventListener('click', () => {
    console.log(input.value);
    const data = input.value;
    socket.emit('text', data);
});
socket.on('show', data => {
    p.innerText = data;
});
