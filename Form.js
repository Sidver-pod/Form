//console.log(document.querySelector('.item'));
//console.log(document.querySelectorAll('.item'));
//const items = document.querySelectorAll('.item');
//items.forEach((item)=>console.log(item));

//const ul = document.querySelector('.items');
//ul.firstElementChild.textContent = 'Hello';
//ul.lastElementChild.innerHTML = '<h3>Hello</h3>';
//ul.firstElementChild.style.background = 'green';
//ul.children[1].style.background = 'yellow';

const btn = document.querySelector('.but');
btn.style.background = 'red';

btn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target.className);
});

btn.addEventListener('mouseover', (e) => {
  e.preventDefault();
  document.querySelector('._form').style.background = '#ccc';
  document.querySelector('.but').style.background = 'black';
});

btn.addEventListener('mouseout', (e) => {
  e.preventDefault();
  document.querySelector('._form').style.background = 'white';
  document.querySelector('.but').style.background = 'red';
});

const myForm = document.querySelector('._form');
const nameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');

myForm.addEventListener('click', onSubmit);

function onSubmit(e){
  e.preventDefault();
  console.log(nameInput.value);
  console.log(emailInput.value);
}

myForm.addEventListener('click', subTest);

function subTest(e){
  e.preventDefault();
  console.log(nameInput.value);
  console.log(emailInput.value);  
}

/*-------------------------STORING IN [LOCAL STORAGE]-------------------------*/

var count = 1; //initialized for the very first user

btn.addEventListener('click', (e) => {
  var uniqueName = 'name' + count;
  var uniqueEmail = 'email' + count;
  localStorage.setItem(uniqueName, nameInput.value);
  localStorage.setItem(uniqueEmail, emailInput.value);
  count++; //update
});
