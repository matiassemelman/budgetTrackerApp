let transactionForm = document.getElementById("transactionForm");

transactionForm.addEventListener("submit", function addingTransaction(event) {
  event.preventDefault();
  let transactionFormData = new FormData(transactionForm);
  let transactionObject = formDataToTransactionObject(transactionFormData)
  saveTransactionObject(transactionObject);
 insertRowTransactionTable(transactionObject);
});


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

}

function saveTransactionObject(transactionObject) {
  let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
  myTransactionArray.push(transactionObject);
let transactionArrayJSON = JSON.stringify(myTransactionArray);
localStorage.setItem('transactionData', transactionArrayJSON);
}