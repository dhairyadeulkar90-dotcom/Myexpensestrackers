let expenses = [];
let selectedCategory = "Other";


function setCategory(event, category) {
    selectedCategory = category;

    
    document.getElementById("desc").value = category;

    
    let buttons = document.querySelectorAll(".categories button");
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

function addExpense() {
    let date = document.getElementById("date").value;
    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (!date || !desc || !amount) {
        alert("Please fill all fields");
        return;
    }

    let expense = {
        date,
        desc,
        amount,
        category: selectedCategory
    };

    expenses.push(expense);

   
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}


function formatDate(dateStr) {
    let d = new Date(dateStr);
    return d.toLocaleDateString("en-GB");
}

function updateUI() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    let total = 0;
    let todayTotal = 0;
    let today = new Date().toISOString().split("T")[0];

    expenses.forEach((exp) => {
        total += exp.amount;

        if (exp.date === today) {
            todayTotal += exp.amount;
        }

        let li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${exp.desc}</strong><br>
                <small>${exp.category} | ${formatDate(exp.date)}</small>
            </div>
            <span>₹${exp.amount}</span>
        `;

        historyList.appendChild(li);
    });

    document.getElementById("totalAmount").innerText = "₹" + total.toFixed(2);
    document.getElementById("todayAmount").innerText = "₹" + todayTotal.toFixed(2);
}