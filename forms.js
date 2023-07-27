// input fields and button
const registerBtn = document.querySelector("#registerBtn");
const updateBtn = document.querySelector("#updateBtn");
const regSerialNoInput = document.querySelector("#r_serialNo");
// forms
const regForm = document.forms.registerForm;
const statusForm = document.forms.statusForm;
// error paragraph elements
const registerError = document.querySelector('#r_error');
const updateError = document.querySelector('#s_error');

const productDiv = document.querySelector('#productList');

/*
    TODO:   The code below attaches a `click` event to `#registerBtn` button.
        The code should communicate asynchronously with the server to save
        the information in the database.

        As long as the input serial number does not yet exist in the database,
        the form data (i.e., serial no, product name, purchase date) should be 
        successfully sent to the route `/register` via a POST request. 

        If the new product was saved successfully into the database, the page
        should immediately refresh, displaying the updated list of products
        on the screen. Otherwise, simply stay on the page.
*/
registerBtn?.addEventListener("click", async function(e) {
    e.preventDefault();
    // write your code below
    const regFormData = new FormData(regForm);
    const data = {};
    
    for (const entry of regFormData.entries()){
        console.log(`${entry[0]}, ${entry[1]}`)
        data[entry[0]] = entry[1];
    }

    const json = JSON.stringify(data);
    console.log(json);

    const response = await fetch('/register', {
        method: 'POST',
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    })

    regForm.reset();

    if (response.status == 200){
        const product = 
        `<div class="productContainer">
            <img class="icon" src="static/images/package-variant-closed.png" />
            <div class="productInfo">
                <span class="snLabel"> Serial No: ${regFormData.get('serialno')} </span>
                <span class="nameLabel"> ${regFormData.get('name')} </span>
                <span class="pDateLabel"> Purchase Date: ${regFormData.get('date')} </span>
            </div>
            <span class="productStatus">
            <div class="statusDot ${regFormData.get('status')}"> </div>
            <span class="statusText"> ${regFormData.get('status')} </span>
            </span>
        </div>`;

        productDiv.innerHTML += product;
    } else {
        console.log(`received response: ${response.status}`);
    }
    console.log('clicked register');
    
});

/*
    TODO:   The code below attaches a `keyup` event to `#r_serialNo` text field.
        The code checks if the current serial number entered by the user
        in the text field does not exist in the database.

        If the current reference number exists in the database:
        - `#r_serialNo` text field background color turns to `red`
        - `#r_error` displays an error message `Serial Number already exists on the database!`
        - `#registerBtn` is disabled

        else, if the current reference number does not exist in the
        database:
        - `#r_serialNo` text field background color turns back to `#E3E3E3`
        - `#r_error` displays no error message
        - `#registerBtn` is enabled
*/
regSerialNoInput?.addEventListener("keyup", async function (e) {
    //  write your code here
    const serialno = regSerialNoInput.value;
    console.log(serialno);

    const response = await fetch('/checkSerialNo?serialno=' + serialno, {
        method: 'GET'
    })

    if (response.status == 400){
        regSerialNoInput.style.backgroundColor = 'red';
        registerBtn.style.disabled = true;
        registerError.innerText = 'Serial Number already exists on the database!';
    }
    else if (response.status == 200){
        regSerialNoInput.style.backgroundColor = '#E3E3E3';
        registerBtn.style.disabled = false;
        registerError.innerText = '';
        console.log('possible to register');
    }
    console.log('register serial number input value changed');
    
});

/*
    TODO:  (BONUS) The code below attaches a `click` event to `#updateBtn` button.
        The code should communicate asynchronously with the server to update the product's
        shipping status information in the database.

        As long as the input serial number exists in the database,
        the form data (i.e., serial no, status) should be successfully 
        sent to the route `/update` via a POST request. 

        If the user enters an invalid serial number (e.g., one that is not yet registered),
        the frontend should react by displaying the message: 
        `Serial Number does not exist on the database!`
        in the `#s_error` paragraph element.

        If the product was successfully updated on the database, the page
        should immediately refresh, displaying the updated status of the product,
        as seen from the list on the screen. Otherwise, simply stay on the page.
  
*/
updateBtn?.addEventListener("click", async function (e) {
    e.preventDefault();
    // write your code here
    console.log('clicked update');

});
