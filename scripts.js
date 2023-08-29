document.addEventListener("DOMContentLoaded", function() {
    // Hide the appProper content initially
    const appProper = document.querySelector(".appProper");
    appProper.style.display = 'none';
  
    // Show the login page content
    const loginPage = document.querySelector(".login-page");
  
    loginPage.style.display = 'flex';
  }); 
  
  const encodedUserName = document.getElementById("encodedUserName");
  const encodedPassWord = document.getElementById("encodedPassWord");
   
 const adminUser = {
    adminName:'admin',
    adminPass:'admin'
  }
  
  const LogInButton = document.getElementById('LogIn');
  LogInButton.addEventListener('click', signIn);
  
  function signIn(event) {
    event.preventDefault(); 
    const enteredUserName = encodedUserName.value;
    const enteredPassWord = encodedPassWord.value;  

    if (enteredUserName === adminUser.adminName && enteredPassWord === adminUser.adminPass) {
        // Handle admin user
        const loginPage = document.querySelector(".login-page");
        const appProper = document.querySelector(".appProper");
        const userHomePage = document.querySelector('.user-home-page')
        const adminHomePage = document.querySelector('.admin-home-page')
        const expenseTracker = document.querySelector('#expense-tracker-sidebar')

        loginPage.style.display = 'none';
        appProper.style.display = 'block';
        expenseTracker.style.display = 'none';
        userHomePage.style.display = 'none';
        adminHomePage.style.display = 'block';

        return; // Exit the function after handling admin
    }

    let userFound = false;

    for (let i = 0; i < bankClients.length; i++) {
        if (enteredUserName === bankClients[i].userName && enteredPassWord === bankClients[i].password) {
            userFound = true;

            const loginPage = document.querySelector(".login-page");
            const appProper = document.querySelector(".appProper");
            const userHomePage = document.querySelector('.user-home-page')
            const adminHomePage = document.querySelector('.admin-home-page')
            const AccountCreation = document.querySelector('#create-new-account-sidebar')
            const expenseTracker = document.querySelector('#expense-tracker-sidebar')
            const dashboardgreeting = document.querySelector('#dashboard-greeting')
            const displayBal = document.querySelector('#account')

            loginPage.style.display = 'none';
            appProper.style.display = 'block';

            if (enteredUserName === 'admin') {
                expenseTracker.style.display = 'none';
                userHomePage.style.display = 'none';
                adminHomePage.style.display = 'block';
            } else {
                AccountCreation.style.display = 'none';
                adminHomePage.style.display = 'none';
                userHomePage.style.display = 'grid';
                dashboardgreeting.textContent = `Welcome ${bankClients[i].userName}!`;
                const formattedBalance = bankClients[i].accountBalance.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP"
                });

                displayBal.textContent = `Account Balance: ${formattedBalance}`;

               
            }
        }
    }

    if (!userFound) {
        alert("User credentials do not match");
    }
}




  
  function restrictInput(event) {
      const input = event.target;
      input.value = input.value.replace(/[^0-9]/g, '').substring(0, 11);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      const anchors = document.querySelectorAll(".anchor");
      const contentSections = document.querySelectorAll(".content");
  
      // Show the home content section by default
      const defaultSection = document.querySelector(".home-content");
      defaultSection.classList.remove("hidden")
      this.querySelector(".icon").classList.add("active");
      
      anchors.forEach((anchor) => {
          anchor.addEventListener("click", function (event) {
              event.preventDefault();
              const target = this.getAttribute("href");
  
              contentSections.forEach((section) => {
                  section.classList.add("hidden");
              });
  
              const targetSection = document.querySelector(target);
              if (targetSection) {
                  targetSection.classList.remove("hidden");
  
                  // Add active class to the clicked menu item
                  anchors.forEach((a) => {
                      a.querySelector(".icon").classList.remove("active");
                  });
                  this.querySelector(".icon").classList.add("active");
              }
          });
      });
  });
  
  
  
  
  const SubmitSignupButton = document.getElementById('SubmitSignupButton')
  SubmitSignupButton.addEventListener('click', registerUser)
  
  let BankDeposit = 0;
 
  let bankClients = JSON.parse(localStorage.getItem("bankClients")) || [
  
  ];
  
  
  
  
  
  
  
  function updateLocalStorage() {
    localStorage.setItem("bankClients", JSON.stringify(bankClients));
  }
  
  
  
  function updateAccountBalanceDisplay() {
    const accountBalanceElement = document.getElementById("BankDeposit");
    accountBalanceElement.textContent = `Account Balance: ₱ ${accountBalance.toFixed(
      2
    )}`;
  }
  
  
  function registerUser (){
      const newFirstNameInput = document.getElementById("newFirstName").value;
      const newLastNameInput = document.getElementById("newLastName").value;
      const newDOBInput = document.getElementById("newDOB").value;
      const newContactNumInput = document.getElementById("newContactNum").value;
      const newEmailAddInput = document.getElementById("newEmailAdd").value;
      const registeredPassword = document.getElementById('NewPassword').value
      const matchPassword = document.getElementById('repeatPassword').value
      const registerUserName = document.getElementById('NewUserName').value
      
  
      const NewAccountBalanceInput = document.getElementById('NewAccountBalance').value
  
  
      const newUser = {
          firstName:newFirstNameInput,
          lastName:newLastNameInput,
          dateOfBirth:newDOBInput,
          contactNumber:newContactNumInput,
          emailAddress: newEmailAddInput,
          userName: registerUserName,
          password: registeredPassword,
          accountBalance: parseFloat(NewAccountBalanceInput), // Parse the value as a float
        accountNumber: generateAccountNumber(),
        budgetTrackerUser: new BudgetTracker('#budget-app')
      }
  
  
      if (/^\d/.test(newFirstNameInput)) {
        alert("First name cannot start with a number");
        return;
    }
  
    // Validation: Check if last name starts with a number
    if (/^\d/.test(newLastNameInput)) {
        alert("Last name cannot start with a number");
        return;
    }
  
    // Validation: Check if username starts with a number
    if (/^\d/.test(registerUserName)) {
        alert("Username cannot start with a number");
        return;
    }
  
    if (registeredPassword.length < 6) {
      alert ("Password is too short. Minimum 6 letter is required.")
      return
     } else if(registeredPassword !== matchPassword){
      alert ("Passwords do not match")
      return
    }
  
  
      function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
      }
  
      function generateAccountNumber() {
          const digits = Array.from({ length: 10 }, (_, i) => i);
          const shuffledDigits = shuffleArray(digits);
      
          let randomNumber = '';
          for (let i = 0; i < 12; i++) {
              if (i === 0) {
                  randomNumber += shuffledDigits.splice(1, 1);
              } else {
                  randomNumber += shuffledDigits.splice(0, 1);
              }
          }
      
          return randomNumber;
      }
  
  
      for (let i = 0; i < bankClients.length; i++) {
          if (registerUserName === bankClients[i].userName) {
              alert("Desired username has already been taken");
              return;
          }
      }
      
      if (NewAccountBalanceInput < 5000) {
          alert("Required funds to open an account is below our required opening balance of Php 5,000.00");
          return;
      }
      
  
      
      // If all conditions are satisfied, add the new user and proceed
      alert(`Hi! The account of Ms/Mr ${registerUserName} has just been created. Welcome to LunarFinance.`);
      
      
  
      bankClients.push(newUser);
  
     
  
      updateLocalStorage()
      updateUserTable()
      

      const homeAnchor = document.querySelector('.anchor[href=".home-content"]');
      homeAnchor.click();
      updateAccountBalanceDisplay()
  }
  
  
  
  
  function updateUserTable() {
      const userTableBody = document.getElementById("userTableBody");
      userTableBody.innerHTML = "";
      bankClients.forEach((user, index) => {
        if (user.userName ==='admin'){
          return
  
        } else{ 
          const row = userTableBody.insertRow();
          const userNameCell = row.insertCell(0);
          const clientsNameCell = row.insertCell(1)
          const balanceCell = row.insertCell(2);
          const AccountNumberCell = row.insertCell(3); 
          const actionsCell = row.insertCell(4); // Shift actions cell index
  
          userNameCell.textContent = user.userName;
          clientsNameCell.textContent = `${user.firstName} ${user.lastName}`
          balanceCell.textContent = `${getFormattedBalance(index)}`;
          AccountNumberCell.textContent = user.accountNumber; 
          const depositButton = createActionButton("Deposit", () => deposit(index));
          const withdrawButton = createActionButton("Withdraw", () => withdraw(index));
          const sendButton = createActionButton("Send", () => send(user.accountNumber));
          actionsCell.appendChild(depositButton);
          actionsCell.appendChild(withdrawButton);
          actionsCell.appendChild(sendButton);
        }
      });
  }
  
  function getFormattedBalance(userIndex) {
    const balance = get_balance(userIndex);
    console.log(balance); // Add this line to check the balance value
    return balance.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP"
    });
  }
  
  function get_balance(userIndex) {
    return bankClients[userIndex].accountBalance;
  }
  
  // Deposit function
  function deposit(userIndex) {
    const amount = parseFloat(prompt("Enter the deposit amount:"));
    if (amount > 0) {
      bankClients[userIndex].accountBalance += amount;
      updateLocalStorage();
      updateAccountBalanceDisplay();
      updateUserTable();
    } else {
      alert("Invalid deposit amount.");
    }
  }
  
  // Withdraw function
  function withdraw(userIndex) {
    const amount = parseFloat(prompt("Enter the withdrawal amount:"));
    if (amount > 0 && bankClients[userIndex].accountBalance >= amount) {
      bankClients[userIndex].accountBalance -= amount;
      updateLocalStorage();
      updateAccountBalanceDisplay();
      updateUserTable();
    } else {
      alert("Invalid withdrawal amount or insufficient balance.");
    }
  }
  
  // Transfer money function
  function send(senderNumber) {
    const recipientNumber = prompt("Enter the recipient's name:");
    const senderIndex = bankClients.findIndex((user) => user.accountNumber === senderNumber);
    const recipientIndex = bankClients.findIndex((user) => user.accountNumber === recipientNumber);
  
    if (senderIndex === -1) {
      alert("Sender does not exist.");
      return;
    }
  
    if (recipientIndex === -1) {
      alert("Recipient does not exist.");
      return;
    }
  
    if (senderIndex === recipientIndex) {
      alert("Cannot send to the same user.");
      return;
    }
  
    const amount = parseFloat(prompt("Enter the transfer amount:"));
    if (amount > 0 && bankClients[senderIndex].accountBalance >= amount) {
      bankClients[senderIndex].accountBalance -= amount;
      bankClients[recipientIndex].accountBalance += amount;
      updateLocalStorage();
      updateAccountBalanceDisplay();
      updateUserTable();
    } else {
      alert("Invalid transfer amount or insufficient balance.");
    }
  }
  
  function createActionButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }
  
  
  function list_users() {
    return bankClients.map((user) => user.firstName);
  }
  
  
  
  
  function updateAccountBalanceDisplay() {
   

    const totalBalance = bankClients.reduce((sum, user) => sum + parseFloat(user.accountBalance), 0);
    const accountBalanceElement = document.getElementById("BankDeposit");


    const formattedTotalBalance = totalBalance.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP"
    });

    
    accountBalanceElement.textContent = `Total Balance: ${formattedTotalBalance}`;
}
  
  
  
  updateAccountBalanceDisplay();
  updateUserTable();
  
  class BudgetTracker {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.container.innerHTML = BudgetTracker.html(); // Set up the initial HTML structure

        // Set the root property to the table element
        this.root = this.container.querySelector(".budget-tracker");

        // Add an event listener for the "NEW ENTRY" button
        this.root.querySelector(".new-entry").addEventListener("click", () => {
            this.onNewEntryBtnClick();
        });

        // Load initial data from Local Storage
        this.load();
    }
    
  static html() {
      return `
          <table class="budget-tracker">
              <thead>
                  <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody class="entries"></tbody>
              <tbody>
                  <tr>
                      <td colspan="5" class="controls">
                          <button type="button" class="new-entry">NEW ENTRY</button>
                      </td>
                  </tr>
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="5" class="summary">
                          <strong>Total:</strong>
                          <span class="total">₱0.00</span>
                      </td>
                  </tr>
              </tfoot>
          </table>
      `;
  }
  
  static entryHtml() {
      return `
          <tr>
              <td>
                  <input class="input input-date" type="date">
              </td>
              <td>
                  <input class="input input-description" type="text" placeholder="Add a Description (e.g. wages, bills, etc.)">
              </td>
              <td>
                  <select class="input input-type">
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                  </select>
              </td>
              <td>
                  <input type="number" class="input input-amount">
              </td>
              <td>
                  <button type="button" class="delete-entry">&#10005;</button>
              </td>
          </tr>
      `;
  }
  
  load() {
      const entries = JSON.parse(localStorage.getItem("budget-tracker-entries-dev") || "[]");
  
      for (const entry of entries) {
          this.addEntry(entry);
      }
  
      this.updateSummary();
  }
  
  updateSummary() {
      const total = this.getEntryRows().reduce((total, row) => {
          const amount = row.querySelector(".input-amount").value;
          const isExpense = row.querySelector(".input-type").value === "expense";
          const modifier = isExpense ? -1 : 1;
  
          return total + (amount * modifier);
      }, 0);
  
      const totalFormatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "PHP"
      }).format(total);
  
      this.root.querySelector(".total").textContent = totalFormatted;
  }
  
  save() {
      const data = this.getEntryRows().map(row => {
          return {
              date: row.querySelector(".input-date").value,
              description: row.querySelector(".input-description").value,
              type: row.querySelector(".input-type").value,
              amount: parseFloat(row.querySelector(".input-amount").value),
          };
      });
  
      localStorage.setItem("budget-tracker-entries-dev", JSON.stringify(data));
      this.updateSummary();
  }
  
  addEntry(entry = {}) {
      this.root.querySelector(".entries").insertAdjacentHTML("beforeend", BudgetTracker.entryHtml());
  
      const row = this.root.querySelector(".entries tr:last-of-type");
  
      row.querySelector(".input-date").value = entry.date || new Date().toISOString().replace(/T.*/, "");
      row.querySelector(".input-description").value = entry.description || "";
      row.querySelector(".input-type").value = entry.type || "income";
      row.querySelector(".input-amount").value = entry.amount || 0;
      row.querySelector(".delete-entry").addEventListener("click", e => {
          this.onDeleteEntryBtnClick(e);
      });
  
      row.querySelectorAll(".input").forEach(input => {
          input.addEventListener("change", () => this.save());
      });
  }
  
  getEntryRows() {
      return Array.from(this.root.querySelectorAll(".entries tr"));
  }
  
  onNewEntryBtnClick() {
      this.addEntry();
  }
  
  onDeleteEntryBtnClick(e) {
      e.target.closest("tr").remove();
      this.save();
  }
  }
  
  const budgetTracker = new BudgetTracker('#budget-app')
  
  const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
 
    window.location.href = "index.html"; 
});