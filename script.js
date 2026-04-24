document.addEventListener("DOMContentLoaded", function () {

    let formBox = document.getElementById("formBox");
    let openBtn = document.getElementById("addBtn");
    let cancelBtn = document.getElementById("cancel");
    let submitBtn = document.getElementById("submit");

    let item = document.getElementById("item");
    let category = document.getElementById("category");
    let model = document.getElementById("model");
    let qty = document.getElementById("qty");

    let table = document.getElementById("inventoryTable");

    loadData();

    openBtn.addEventListener("click", () => {
        formBox.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
        formBox.style.display = "none";
        clearInputs();
    });

    submitBtn.addEventListener("click", () => {

        let newItem = {
            id: Date.now(), // 🔥 unique ID
            item: item.value,
            category: category.value,
            model: model.value,
            qty: qty.value
        };

        if (!newItem.item || !newItem.category || !newItem.model || !newItem.qty) {
            alert("Fill all fields!");
            return;
        }

        saveData(newItem);
        addToTable(newItem);

        formBox.style.display = "none";
        clearInputs();
    });

    function addToTable(data) {
        let row = table.insertRow();

        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.item}</td>
            <td>${data.category}</td>
            <td>${data.model}</td>
            <td>${data.qty}</td>
            <td><button onclick="deleteItem(${data.id})">Delete</button></td>
        `;
    }

    function saveData(newItem) {
        let items = JSON.parse(localStorage.getItem("inventory")) || [];
        items.push(newItem);
        localStorage.setItem("inventory", JSON.stringify(items));
    }

    function loadData() {
        let items = JSON.parse(localStorage.getItem("inventory")) || [];
        items.forEach(item => addToTable(item));
    }

    function clearInputs() {
        item.value = "";
        category.value = "";
        model.value = "";
        qty.value = "";
    }

    // 🔥 Delete using ID
    window.deleteItem = function(id) {
        let items = JSON.parse(localStorage.getItem("inventory")) || [];

        let updated = items.filter(item => item.id !== id);

        localStorage.setItem("inventory", JSON.stringify(updated));

        location.reload(); // simple refresh
    }

});