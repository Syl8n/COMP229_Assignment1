/*
  script.js
  Henry Suh
  301004212
  Sep 28th, 2021
*/


console.log('Goes to the client side.');

// Warning msg for deleting an item
if(getTitle == "Business Contact")
{
    let deleteButtons = document.querySelectorAll('.btn-danger');
        
    for(button of deleteButtons)
    {
        button.addEventListener('click', (event)=>{
            if(!confirm("Do you really want this?")) 
            {
                event.preventDefault();
            }
        });
    }
}

// confirm password validation
if(getTitle == "Sign-up Form")
{
    const confirm = document.querySelector('input[name=password_confirm]');

    confirm.addEventListener('change', onChange); 
}

function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=password_confirm]');
    
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
}
