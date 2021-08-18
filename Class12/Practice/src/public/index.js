const button = document.getElementById('button');
const p = document.getElementById('p');
const input = document.getElementById('test')
const socket = io();
button.addEventListener('onclick', () => {
    console.log(input.innerText);
    const data = input.innerText;
    socket.emit('text', data);
});
socket.on('show', data => {
    p.innerText = data;
})
