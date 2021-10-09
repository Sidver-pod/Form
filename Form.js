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

// btn.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log(e.target.className);
// });

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

// myForm.addEventListener('click', onSubmit);

// function onSubmit(e){
//   e.preventDefault();
//   console.log(nameInput.value);
//   console.log(emailInput.value);
// }

// myForm.addEventListener('click', subTest);

// function subTest(e){
//   e.preventDefault();
//   console.log(nameInput.value);
//   console.log(emailInput.value);  
// }

/*-------------------------STORING IN [LOCAL STORAGE]-------------------------*/

//NOT NEEDED! /*var count = 1; //initialized for the very first user (helps make unique KEYS)*/
//METHOD #1
// btn.addEventListener('click', (e) => {
//   var uniqueName = 'name' + count;
//   var uniqueEmail = 'email' + count;
//   localStorage.setItem(uniqueName, nameInput.value);
//   localStorage.setItem(uniqueEmail, emailInput.value);
//   count++; //update
// });

//METHOD #2
//STORING IN OBJECT FORM (SCALABLE WAY OF STORING)
btn.addEventListener('click', (e) => {
  let userName = nameInput.value;
  let userEmail = emailInput.value;
  
  let myObj = {
    name: userName,
    email: userEmail
  }; //object
  
  let uniqueUser = 'user' + emailInput.value; //***UPDATED UNIQUE USER ID /*count; //KEY*/
  let myObj_serialized = JSON.stringify(myObj); //VALUE (converts to a 'string')
  localStorage.setItem(uniqueUser, myObj_serialized);
  //***NOT NEEDED! /*count++; //update*/
  myObj_deserialized = JSON.parse(localStorage.getItem(uniqueUser));
  console.log(myObj_deserialized);
});

//READING SAVED DATA FROM LOCAL STORAGE INTO THE FRONTEND
nameInput.value = JSON.parse(localStorage.getItem('usersid@gmail.com')).name;
emailInput.value = JSON.parse(localStorage.getItem('usersid@gmail.com')).email;

//**[UPDATED] WITH 'DOMContentLoaded' event (runs right after the document is ready; does not wait for CSS, Images etc. to load!)
document.addEventListener('DOMContentLoaded', () => {
  /*READING KEYS - PRINTING DETAILS*/
  var ul = document.querySelector('ul');
  
  //looping through keys
  Object.keys(localStorage).forEach((key) => {
    var stringified_Value = localStorage.getItem(key);
    var parsed_Value = JSON.parse(stringified_Value);

    var li = document.createElement('li');
    li.innerText = parsed_Value.name + " | " + parsed_Value.email;
    ul.appendChild(li);
  }); //for loop ends here
}); //DOMContentLoaded ends here
