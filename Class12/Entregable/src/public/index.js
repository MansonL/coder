const socket = io.connect();
const button = document.getElementById('button');
const thumbnail = document.getElementById('thumbnail');
const title = document.getElementById('title');
const price = document.getElementById('price');

const container = $("#table-container")[0];

/* ---------------------------- ADDING PRODUCTS TO THE TABLE --------------------- */


const addingTable = (body,data) => {
    let inner = ''
    data.map(product => {
        inner+=`
        <tr>
          <th scope="row">${product.id}</th>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td><img src="${product.thumbnail}" class="w-100 h-100" /></td>
        </tr>
        `;
    });
    body.innerHTML= inner;
};

/* ------------------------ SUBMIT BUTTON LISTENER (UPDATES AND CLEANING INPUTS) ---------------- */

button.addEventListener('click', () => {
    title.innerHTML = '';
    thumbnail.innerHTML = '';
    price.innerHTML = '';
});   

/* ------------------------------- LISTENING TO FIRST CONNECTIONS AND DISPLAYING THE PRODUCTS --------- */


socket.on('show', data => {
  if(typeof data === 'string' && $("#alert")[0] === undefined){
    container.insertAdjacentHTML('afterbegin',`<div class="alert alert-danger alert-dismissible fade show mt-2" role="alert" id="alert">
    <span>${data}
      <br />Add products in the form above...
      </span>
  </div>`);
  }else if($("#table")[0] === undefined){
    container.insertAdjacentHTML('afterbegin',`
        <table class="table table-stripped table-hover" id="table" ></table>`
    ); 
    const table = container.children[0];
    table.insertAdjacentHTML('afterbegin',
        `<thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Image</th>
        </tr>
      </thead>`
    );
    table.insertAdjacentHTML('beforeend',`<tbody></tbody>`);
    const body = table.children[1];
    addingTable(body,data);
  }else{
    if($("#alert")[0])$("#alert")[0].remove();
    const body = container.children[0].children[1]; // <TBODY>
    addingTable(body,data)
  }
});


