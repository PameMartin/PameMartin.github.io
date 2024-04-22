
/********w*************
    
	Project 4 Javascript
	Name: Pamela Eugenia Martin
	Date: April 22, 2024
	Description: JS file to validate the contact form

**********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){
    // Hides all error elements on the page
    hideAllErrors();

    // Determine if the form has errors
    if(formHasErrors()){
        // Prevents the form from submitting
        e.preventDefault();

        // When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
        return false;
    }

    // When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
    return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){

    // Confirm that the user wants to reset the form.
    if(confirm('Clear Form?')){
        // Ensure all errors fields are hidden
        hideAllErrors();

        // Set focus to the first text field on the page
        document.getElementById("fname").focus();
        // When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();

    // When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
    return false;

}

/*
 * Does all the error checking for the form.
 *
 * return True if an error was found; False if no errors were found
 */
function formHasErrors(){
    let errorFlag = false;

    // Validate required fields
    let requiredFields = ["fname", "lname", "message"]
    for(let i = 0; i < requiredFields.length; i++){

        let textfield = document.getElementById(requiredFields[i]);

        if(!formFieldHasInput(textfield)){
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            // Set focus to the first empty field
            if(!errorFlag){
                textfield.focus();
                textfield.select();
            }
            errorFlag = true;
        }
    }

    // Validate phone number
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

    // Validate email address
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

/*
 * Hides all of the error elements.
 */
function hideAllErrors(){
    // Get an array of error elements 
    let errorItems = document.getElementsByClassName("error");

    // Loop through each element in the error array
    for(let i = 0; i < errorItems.length; i++){
        // Hide the error element by setting it's display style to "none"
        errorItems[i].style.display = "none";
    }
}

/*
 * Determines if a text field element has input
 * 
 * param fieldElement A text field input element object
 * return True if the field contains input, it returns False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Handles the load event of the document.
 */
function load(){
    // Add event listener for the form submit
    document.getElementById("contact_form").addEventListener("submit", validate);
    
    // Reset the form when the document is loaded
    document.getElementById("contact_form").reset();

    // Add event listener for the reset form
    document.getElementById("contact_form").addEventListener("reset", resetForm);

    // Hide all error messages
    hideAllErrors();
}

// Add an event listener for when the DOM is fully loaded, then call the load function
document.addEventListener("DOMContentLoaded", load);