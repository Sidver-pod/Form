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
  e.preventDefault();
  
  let userName = nameInput.value;
  let userEmail = emailInput.value;
  
  //check if the email already exists in the Local Storage (BUG)
  Object.keys(localStorage).every((key) => {
    var flag = 0;
    var obj = JSON.parse(localStorage.getItem(key));
    if(obj.email.toLowerCase() == userEmail.toLowerCase()){
      var list_Element = document.querySelector('ul');
      Array.from(list_Element).every((list) => {
        if(list.innerText.toLowerCase().indexOf(userEmail.toLowerCase()) != -1){
          list.remove(); //removes from list element (thereby disappears from the FRONT-END)
          flag = 1;
          return false; //***instead of forEach(), the every() helps break out by returning false!
        }
      });
    }
    if(flag == 1){
      return false; //breaking out of every()!
    }
  });
  
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
    li.innerText = parsed_Value.name + " | " + parsed_Value.email + " ";
    li.className = 'details';
    li.id = 'user' + parsed_Value.email; //key can be used for delete button
    
    //UPDATE - ADDING BUTTONS
    var edit = document.createElement('input');
    edit.value = 'edit';
    edit.name = 'edit';
    edit.className = 'e-d-butn edit';
    edit.type = 'submit';
    
    var del = document.createElement('input');
    del.value = 'delete';
    del.name = 'delete';
    del.className = 'e-d-butn del';
    del.type = 'submit';
    
    li.appendChild(edit);
    li.appendChild(del);
    
    ul.appendChild(li);
  }); //for loop ends here
  
  //------------------DELETE & EDIT------------------
  ul.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(e.target.className.slice(9, 12) == 'del'){
      //*DELETE BUTTON
      var userDetail = e.target.parentElement;
      
      //delete from Local Storage
      localStorage.removeItem(userDetail.id); //id = key
      console.log(1);
      //delete from FRONT-END
      userDetail.remove();
    }
    else if(e.target.className.slice(9, 13) == 'edit'){
      //*EDIT BUTTON
      e.target.parentElement.style.display = "none"; //hid it
      nameInput.value = JSON.parse(localStorage.getItem(e.target.parentElement.id)).name;
      emailInput.value = JSON.parse(localStorage.getItem(e.target.parentElement.id)).email;
      localStorage.removeItem(e.target.parentElement.id); //deleted from the Local Storage
      e.target.parentElement.remove(); //removing the user detail list from FRONT-END
      //**the rest of the edit functionality works like adding a new user detail list!
    }
  });
  
}); //DOMContentLoaded ends here
