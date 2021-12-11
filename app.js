let transactionForm = document.getElementById("transactionForm");
// Selecting form



document.addEventListener('DOMContentLoaded', function renderDataWhenPageLoaded(){
  // Function to render on Page Load the data of LocalStorage (Persistence data)

  let myLocalStorageData = JSON.parse(localStorage.getItem('transactionData')) || [];
  // Initializing var with the array of transactions data
  
  myLocalStorageData.forEach(data => {
    insertRowTransactionTable(data);
    // For each element of the array, render in the table.

  }); 
})

transactionForm.addEventListener("submit", function addingTransaction(event) {
  // adding event listener to submit button
  event.preventDefault();
  // preventing page reload on submit
  
  let transactionFormData = new FormData(transactionForm);
  // convert the form data into a FormData constructor.
  
  let transactionObject = formDataToTransactionObject(transactionFormData)
  // initializing var with object created by the function in line 21, which receives the form data converted.

  saveTransactionObject(transactionObject);
  // storing the object into the localStorage

 insertRowTransactionTable(transactionObject);
  // Inserting row and cells with the keys/values of the transactionObject

  transactionForm.reset();
});


function getNewTransactionId() {
  let lastTransactionId = localStorage.getItem('lastTransactionId') || "0";
  let newTransactionId = JSON.parse(lastTransactionId) + 1;
  localStorage.setItem('lastTransactionId', JSON.stringify(newTransactionId));
  return newTransactionId;
}

function formDataToTransactionObject(transactionFormData){
  let transactionType = transactionFormData.get('transactionType');
  let transactionDescription = transactionFormData.get('description');
  let transactionAmount = transactionFormData.get('amount');
  let transactionCategory = transactionFormData.get('category');
  let transactionId = getNewTransactionId();

  return {
"transactionType" : transactionType ,
"transactionDescription" : transactionDescription ,
"transactionAmount" : transactionAmount ,
"transactionCategory" : transactionCategory,
"transactionId" : transactionId
  }
}

function insertRowTransactionTable(transactionObject) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);

    let newIdCellRef = newTransactionRowRef.insertCell(0);
    newIdCellRef.textContent = transactionObject['transactionId'];

    let newTypeCellRef = newTransactionRowRef.insertCell(1);
    newTypeCellRef.textContent = transactionObject['transactionType'];

    newDescriptionCellRef = newTransactionRowRef.insertCell(2);
    newDescriptionCellRef.textContent = transactionObject['transactionDescription'];

    newAmountCellRef = newTransactionRowRef.insertCell(3);
    newAmountCellRef.textContent = transactionObject['transactionAmount']

    newCategoryCellRef = newTransactionRowRef.insertCell(4);
    newCategoryCellRef.textContent = transactionObject['transactionCategory']

    let newDeleteCell = newTransactionRowRef.insertCell(5);
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete Row";
    deleteButton.addEventListener('click', function removeTransaction(event){
      event.target.parentNode.parentNode.remove();
     


    })
    newDeleteCell.appendChild(deleteButton); 
}

function saveTransactionObject(transactionObject) {
  let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
  // If getItem doesn't get something (empty localStorage), initialize var with empty array
  myTransactionArray.push(transactionObject);
  // Add the transaction object to the array of transactions
let transactionArrayJSON = JSON.stringify(myTransactionArray);
  // convert the array to JSON to store it in localStorage
localStorage.setItem('transactionData', transactionArrayJSON);
  // storage Item
}

