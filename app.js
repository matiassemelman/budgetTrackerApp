let transactionForm = document.getElementById("transactionForm");

transactionForm.addEventListener("submit", function addingTransaction(event) {
  event.preventDefault();
  let transactionFormData = new FormData(transactionForm);
 insertRowTransactionTable(transactionFormData);
});

function insertRowTransactionTable(transactionFormData) {
    let transactionTableRef = document.getElementById("transactionTable");

    let newTransactionRowRef = transactionTableRef.insertRow(-1);

    let newTypeCellRef = newTransactionRowRef.insertCell(0);
    newTypeCellRef.textContent = transactionFormData.get('transactionType');

    newDescriptionCellRef = newTransactionRowRef.insertCell(1);
    newDescriptionCellRef.textContent = transactionFormData.get('description');

    newAmountCellRef = newTransactionRowRef.insertCell(2);
    newAmountCellRef.textContent = transactionFormData.get('amount')

    newCategoryCellRef = newTransactionRowRef.insertCell(3);
    newCategoryCellRef.textContent = transactionFormData.get('category')

}