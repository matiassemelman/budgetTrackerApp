let transactionForm = document.getElementById("transactionForm");

let transactionFormData = new FormData(transactionForm);

transactionForm.addEventListener('change', function preventingSubmit (event) {
    event.preventDefault();
 console.log(event);
 console.log(transactionFormData.description)

})

