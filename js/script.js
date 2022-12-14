//On load of page focus state is set to the name input field
document.getElementById('name').focus();

//By default the other job role input field is set to hidden
document.getElementById('other-job-role').style.display = "none";

//add event listener for the select job options
document.getElementById('title').addEventListener('change', selectChange);

//function that runs for select changes
function selectChange(event){
    //grabs the index of the selected option
    let i = event.target.selectedIndex;
    
    //checks value of index and compares to other
    if(event.target.options[i].text === "Other"){
        //if other is selected makes the input field for other visible
        document.getElementById('other-job-role').style.display = "initial";
    }
    else{
        //if other is not selected makes the input field not visible
        document.getElementById('other-job-role').style.display = "none";
    }
}

//by default disable the color select element
document.getElementById('color').setAttribute('disabled','');

//add event listener for the select design options
document.getElementById('design').addEventListener('change', selectDesignChange);

//function that runs forselect design changes
function selectDesignChange(event){
    //removes the disabled attribute from the color select element
    document.getElementById('color').removeAttribute('disabled','');

    //grabs the index of the selected option
    let i = event.target.selectedIndex;
    //grabs the value of the index
    let value = event.target.options[i].value;
    
    //loop through the color options
    for(let j = 0; j < document.getElementById('color').length; j++){
        //checks each option to see it matches the theme
        if(document.getElementById('color').options[j].getAttribute("data-theme") === value){
            //removes the hidden attribute
            document.getElementById('color').options[j].removeAttribute("hidden",'');
        }
        else{
            //adds the hidden attribute
            document.getElementById('color').options[j].setAttribute("hidden",'');
        }
    }
}

//add event listener for the fieldset element
document.getElementById('activities').addEventListener('change', selectActivity);

//global variable to store cost
let cost = 0;

function selectActivity(event){
    //grabs the cost of the targeted event
    let dataCost = parseInt(event.target.getAttribute("data-cost"));

    //checks if the event was a check or uncheck
    if(event.target.checked){
        //adds the value of the check to the global variable
        cost += dataCost;
        //updates the html with the new total cost
        document.getElementById('activities-cost').innerHTML = `Total: $${cost}`;
        //removes form error if present
        if(document.getElementById('activities').classList.contains('not-valid')){
            document.getElementById('activities').classList.remove('not-valid');
            document.getElementById('activities').classList.add('valid');
            document.getElementById('activities').lastElementChild.style.display = "none";
        }
    }
    else{
        //subtracts the value of the check to the global variable
        cost -= dataCost;
        //updates the html with the new total cost
        document.getElementById('activities-cost').innerHTML = `Total: $${cost}`;
    }
}

//selects the credit card option by default
document.getElementById('payment').value = "credit-card";

//hide the other payment options by default
document.getElementById('paypal').style.display = "none";
document.getElementById('bitcoin').style.display = "none";

//add event listener for the select payment options
document.getElementById('payment').addEventListener('change', selectPayment);

//function runs when user changes payment method
function selectPayment(event){
    //grabs the index of the selected option
    let i = event.target.selectedIndex;
    //grabs the value of the index
    let value = event.target.options[i].value;

    if(value === "credit-card"){
        //show credit payment info
        document.getElementById('credit-card').style.display = "inherit";

        //hide the other payment options by default
        document.getElementById('paypal').style.display = "none";
        document.getElementById('bitcoin').style.display = "none";
    }
    else if(value === "paypal"){
        //show paypal payment info
        document.getElementById('paypal').style.display = "inherit";

        //hide the other payment options by default
        document.getElementById('credit-card').style.display = "none";
        document.getElementById('bitcoin').style.display = "none";
    }
    else{
        //show bitcoin payment info
        document.getElementById('bitcoin').style.display = "inherit";

        //hide the other payment options by default
        document.getElementById('paypal').style.display = "none";
        document.getElementById('credit-card').style.display = "none";
    }
}

//selects the form element and adds the event listener for submit
document.querySelector('form').addEventListener('submit', formCheck);

//function that runs when form is submitted
function formCheck(event){
    //checks to see if name field is empty
    if(document.getElementById('name').value === ''){
        //cancels the event form submitting
        event.preventDefault();

        //makes the form errors visible to the user
        document.getElementById('name').parentElement.classList.add('not-valid');
        document.getElementById('name').parentElement.classList.remove('valid');
        document.getElementById('name').parentElement.lastElementChild.style.display = "inherit";
    }
    else{
        //removes form error
        document.getElementById('name').parentElement.classList.remove('not-valid');
        document.getElementById('name').parentElement.classList.add('valid');
        document.getElementById('name').parentElement.lastElementChild.style.display = "none";
    }

    //check to see if email is valid
    let emailAddress = document.getElementById("email").value;
    //regex for email
    let emailReg = /^\S+@\S+\.com$/;

    //checks for valid card number
    if(!emailReg.test(emailAddress)){
        //cancels the event form submitting
        event.preventDefault();

        //makes the form errors visible to the user
        document.getElementById('email').parentElement.classList.add('not-valid');
        document.getElementById('email').parentElement.classList.remove('valid');
        document.getElementById('email').parentElement.lastElementChild.style.display = "inherit";
    }
    else{
        //removes form error
        document.getElementById('email').parentElement.classList.remove('not-valid');
        document.getElementById('email').parentElement.classList.add('valid');
        document.getElementById('email').parentElement.lastElementChild.style.display = "none";
    }


    //selects all input elements
    let allInputs = document.getElementsByTagName('input');
    let inputChecked = 0;

    //loop through the input elements
    for(let i = 0; i < allInputs.length; i++){
        //filter for input of type checkbox
        if(allInputs[i].type === 'checkbox'){
            //check to see if input is checked
            if(allInputs[i].checked){
                //add to counter
                inputChecked++;
            }
        }
    }

    //checks to see if at least one activity selected
    if(inputChecked === 0){
        //cancels the event form submitting
        event.preventDefault();

        //makes the form errors visible to the user
        document.getElementById('activities').classList.add('not-valid');
        document.getElementById('activities').classList.remove('valid');
        document.getElementById('activities').lastElementChild.style.display = "inherit";
    }
    
    //selects the index of the selected payment
    let index = document.getElementById('payment').selectedIndex;

    //grabs the value of the selected payment
    let value = document.getElementById('payment').options[index].value;

    //checks if payment is credit card
    if(value === "credit-card"){
        //grabs the value of the input field 
        let cardNumber = document.getElementById("cc-num").value;
        //regex for card length and numbers only
        let cardNumberReg = /^[0-9]{13,16}$/;

        //checks for valid card number
        if(!cardNumberReg.test(cardNumber)){
            //cancels the event form submitting
            event.preventDefault();

            //makes the form errors visible to the user
            document.getElementById('cc-num').parentElement.classList.add('not-valid');
            document.getElementById('cc-num').parentElement.classList.remove('valid');
            document.getElementById('cc-num').parentElement.lastElementChild.style.display = "inherit";
        }
        
        //grabs the value of the input field
        let zipcode = document.getElementById("zip").value;
        //regex for zipcode length and numbers only
        let zipCodeReg = /^[0-9]{5}$/;

        //checks for valid zip code
        if(!zipCodeReg.test(zipcode)){
            //cancels the event form submitting
            event.preventDefault();

            //makes the form errors visible to the user
            document.getElementById('zip').parentElement.classList.add('not-valid');
            document.getElementById('zip').parentElement.classList.remove('valid');
            document.getElementById('zip').parentElement.lastElementChild.style.display = "inherit";
        }
        
        //grabs the value of the input field
        let cvv = document.getElementById("cvv").value;
        //regex for cvv length and numbers only
        let cvvReg = /^[0-9]{3}$/;

        //checks for valid CVV
        if(!cvvReg.test(cvv)){
            //cancels the event form submitting
            event.preventDefault();

            //makes the form errors visible to the user
            document.getElementById('cvv').parentElement.classList.add('not-valid');
            document.getElementById('cvv').parentElement.classList.remove('valid');
            document.getElementById('cvv').parentElement.lastElementChild.style.display = "inherit";
        }
    }
}

//selects all input elements
let allInputs = document.getElementsByTagName('input');

//loop through the input elements
for(let i = 0; i < allInputs.length; i++){
    //filter for input of type checkbox
    if(allInputs[i].type === 'checkbox'){
        //add event listener for focus and blur
        allInputs[i].addEventListener('focus', focusActivity);
        allInputs[i].addEventListener('blur', blurActivity);
    }
}

//function that adds focus class to parent of target element
function focusActivity(event){
    event.target.parentElement.classList.add('focus');
}

//function that removes focus class to parent of target element
function blurActivity(event){
    event.target.parentElement.classList.remove('focus');
}

//checks for valid cvv
document.getElementById("cvv").addEventListener('input', cvvInput);

function cvvInput(event){
    let cvv = event.target.value;
    let cvvReg = /^[0-9]{3}$/;

    if(cvvReg.test(cvv)){
        document.getElementById('cvv').parentElement.classList.remove('not-valid');
        document.getElementById('cvv').parentElement.classList.add('valid');
        document.getElementById('cvv').parentElement.lastElementChild.style.display = "none";
    }
}

//checks for valid zip
document.getElementById("zip").addEventListener('input', zipInput);

function zipInput(event){
    let zip = event.target.value;
    let zipCodeReg = /^[0-9]{5}$/;

    if(zipCodeReg.test(zip)){
        document.getElementById('zip').parentElement.classList.remove('not-valid');
        document.getElementById('zip').parentElement.classList.add('valid');
        document.getElementById('zip').parentElement.lastElementChild.style.display = "none";
    }
}

//checks for valid card number
document.getElementById("cc-num").addEventListener('input', cardInput);

function cardInput(event){
    let card = event.target.value;
    let cardNumberReg = /^[0-9]{13,16}$/;

    if(cardNumberReg.test(card)){
        document.getElementById('cc-num').parentElement.classList.remove('not-valid');
        document.getElementById('cc-num').parentElement.classList.add('valid');
        document.getElementById('cc-num').parentElement.lastElementChild.style.display = "none";
    }
}

//checks for valid email
document.getElementById("email").addEventListener('input', emailInput);

function emailInput(event){
    let email = event.target.value;
    let emailReg = /^\S+@\S+\.com$/;

    if(emailReg.test(email)){
        document.getElementById('email').parentElement.classList.remove('not-valid');
        document.getElementById('email').parentElement.classList.add('valid');
        document.getElementById('email').parentElement.lastElementChild.style.display = "none";
    }
}

//checks for valid name
document.getElementById("name").addEventListener('input', nameInput);

function nameInput(event){
    let name = event.target.value;

    if(name !== ''){
        document.getElementById('name').parentElement.classList.remove('not-valid');
        document.getElementById('name').parentElement.classList.add('valid');
        document.getElementById('name').parentElement.lastElementChild.style.display = "none";
    }
}