let transactionForm = document.getElementById("transactionForm");
// Selecting form


transactionForm.addEventListener("submit", function addingTransaction(event) {
  // adding event listener
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

document.addEventListener('DOMContentLoaded', function renderDataWhenPageLoaded(){
  // Function to render the data of LocalStorage (Persistence data)

  let myLocalStorageData = JSON.parse(localStorage.getItem('transactionData'))
  // Initializing var with the array of transactions data

  myLocalStorageData.forEach(data => {
    insertRowTransactionTable(data);
    // For each element of the array, render in the table.

  }); 


})


function formDataToTransactionObject(transactionFormData){
  let transactionType = transactionFormData.get('transactionType');
  let transactionDescription = transactionFormData.get('description');
  let transactionAmount = transactionFormData.get('amount');
  let transactionCategory = transactionFormData.get('category')
  return {
"transactionType" : transactionType ,
"transactionDescription" : transactionDescription ,
"transactionAmount" : transactionAmount ,
"transactionCategory" : transactionCategory,
  }
}

function insertRowTransactionTable(transactionObject) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionObject['transactionType'];

    newDescriptionCellRef = newTransactionRowRef.insertCell(1);
    newDescriptionCellRef.textContent = transactionObject['transactionDescription'];

    newAmountCellRef = newTransactionRowRef.insertCell(2);
    newAmountCellRef.textContent = transactionObject['transactionAmount']

    newCategoryCellRef = newTransactionRowRef.insertCell(3);
    newCategoryCellRef.textContent = transactionObject['transactionCategory']

    let newDeleteCell = newTransactionRowRef.insertCell(4);
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete Row";
    deleteButton.addEventListener('click', function removeTransaction(event){
     console.log(event.target.parentNode.parentNode)


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

