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