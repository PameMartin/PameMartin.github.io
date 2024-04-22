
/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){

    hideAllErrors();

    if(formHasErrors()){
        e.preventDefault();
        return false;
    }
    return true;
}

function resetForm(e){

    if(confirm('Clear Form?')){
        hideAllErrors();

        document.getElementById("fname").focus();

        return true;
    }

    e.preventDefault();

    return false;

}

function formHasErrors(){
    let errorFlag = false;

    let requiredFields = ["fname", "lname", "message"]
    for(let i = 0; i < requiredFields.length; i++){

        let textfield = document.getElementById(requiredFields[i]);

        if(!formFieldHasInput(textfield)){
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if(!errorFlag){
                textfield.focus();
                textfield.select();
            }
            errorFlag = true;
        }
    }

    let regexPhone = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/);
    let phoneValue = document.getElementById("phone").value;

    if(!regexPhone.test(phoneValue)){
        document.getElementById("phone_error").style.display = "block";
        if(!errorFlag){
            document.getElementById("phone").focus();
            document.getElementById("phone").select();
        }
        errorFlag = true;
    }

    let regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);

    let emailValue = document.getElementById("email").value;

    if(!regexEmail.test(emailValue)){
        document.getElementById("email_error").style.display = "block";
        if(!errorFlag){
            document.getElementById("email").focus();
            document.getElementById("email").select();
        }
        errorFlag = true;
    }
    
    return errorFlag;
}

function hideAllErrors(){
    let errorItems = document.getElementsByClassName("error");
    for(let i = 0; i < errorItems.length; i++){
        errorItems[i].style.display = "none";
    }
}

function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

function load(){
    document.getElementById("contact_form").addEventListener("submit", validate);
    document.getElementById("contact_form").reset();
    document.getElementById("contact_form").addEventListener("reset", resetForm);

    hideAllErrors();
}

document.addEventListener("DOMContentLoaded", load);