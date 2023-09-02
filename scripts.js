document.addEventListener("DOMContentLoaded", function () {
    // This code runs when the DOM (Document Object Model) is fully loaded.
    // It hides the appProper content and sets up event listeners.
    // Hide the appProper content initially
    const signUpButton = document.getElementById("SignUpBtn");
    const appProper = document.querySelector(".appProper");
    appProper.style.display = "none";
  
    // Show the login page content
    const loginPage = document.querySelector(".login-page");
    const signUpFormsHomepage = document.querySelector(".signUpFormsHomepage");
    const logInFormsWindow = document.querySelector(".logInFormsWindow");
  
    loginPage.style.display = "flex";
    signUpFormsHomepage.style.display = "none";
  
    signUpButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission
      signUpFormsHomepage.style.display = "block";
      logInFormsWindow.style.display = "none";
    });
  });
  
  const encodedUserName = document.getElementById("encodedUserName");
  const encodedPassWord = document.getElementById("encodedPassWord");
  
  const adminUser = {
    adminName: "admin",
    adminPass: "admin",
  };
  
  const LogInButton = document.getElementById("LogIn");
  LogInButton.addEventListener("click", (event) =>
    signIn(event, adminUser, bankClients)
  );
  
  function authenticateUser(username, password, adminUser, bankClients) {
    // Check if it's the admin
    if (username === adminUser.adminName && password === adminUser.adminPass) {
      return adminUser;
    }
  
    // Authenticate regular users
    const authenticatedUser = bankClients.find(
      (client) => client.userName === username && client.password === password
    );
    return authenticatedUser || null;
  }
  
  // Define the updateDOMWithUserData function
  function updateDOMWithUserData(user) {
    const loginPage = document.querySelector(".login-page");
    const appProper = document.querySelector(".appProper");
    const expenseTracker = document.querySelector("#expense-tracker-sidebar");
    const userHomePage = document.querySelector(".user-home-page");
    const adminHomePage = document.querySelector(".admin-home-page");
    const dashboardgreeting = document.querySelector("#dashboard-greeting");
    const displayBal = document.querySelector("#account");
    const budgetAppContainer = document.getElementById("budget-app-container");
  
    loginPage.style.display = "none";
    appProper.style.display = "block";
    expenseTracker.style.display = "none";
  
    if (user === adminUser) {
      expenseTracker.style.display = "none";
      userHomePage.style.display = "none";
      adminHomePage.style.display = "block";
    } else {
      adminHomePage.style.display = "none";
      userHomePage.style.display = "grid";
      dashboardgreeting.textContent = `Welcome ${user.userName}!`;
      const formattedBalance = user.accountBalance.toLocaleString("en-PH", {
        style: "currency",
        currency: "PHP",
      });
      displayBal.textContent = `Accout No.: ${user.accountNumber} Account Balance: ${formattedBalance}`;
  
      // Check if the user has a budgetTrackerUser and entries
      if (user.budgetTrackerUser && user.budgetTrackerUser.entries) {
        // Create or update the BudgetTracker instance
        if (!budgetAppContainer.hasChildNodes()) {
          const budgetTracker = new BudgetTracker("#budget-app-container", user);
          budgetTracker.updateSummary(); // Update the summary initially
          budgetAppContainer.appendChild(budgetTracker.container);
        } else {
          const budgetTracker =
            budgetAppContainer.querySelector(".budget-tracker");
          budgetTracker.user = user; // Update the user object in the existing instance
          budgetTracker.load(); // Load the entries
          budgetTracker.updateSummary(); // Update the summary
        }
      } else {
        // Clear the budgetAppContainer if no budgetTrackerUser or entries
        budgetAppContainer.innerHTML = "";
      }
    }
  }
  
  // Modify the signIn function
  function signIn(event, adminUser, bankClients) {
    event.preventDefault();
    const enteredUserName = encodedUserName.value;
    const enteredPassWord = encodedPassWord.value;
  
    const authenticatedUser = authenticateUser(
      enteredUserName,
      enteredPassWord,
      adminUser,
      bankClients
    );
  
    if (authenticatedUser) {
      console.log(bankClients);
      console.log(authenticatedUser);
      const userId = bankClients.findIndex(
        (user) => user.accountNumber == authenticatedUser.accountNumber
      );
      console.log(userId);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: userId, ...authenticatedUser })
      );
      updateDOMWithUserData(authenticatedUser);
    } else {
      // Handle authentication failure
      alert("User credentials do not match");
    }
  }
  
  function restrictInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, "").substring(0, 11);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const anchors = document.querySelectorAll(".anchor");
    const contentSections = document.querySelectorAll(".content");
  
    // Show the home content section by default
    const defaultSection = document.querySelector(".home-content");
    defaultSection.classList.remove("hidden");
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
  function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
  
  const depositBtnUser = document.getElementById("Deposit");
  depositBtnUser.addEventListener("click", () => {
    console.log("deposit button clcked");
    const user = this.getCurrentUser();
    deposit(user.id, false);
  });
  
  // Event listener for the "Withdraw" button
  const withdrawBtn = document.getElementById("Widthdraw");
  withdrawBtn.addEventListener("click", () => {
    console.log("Withdraw button clicked");
    const user = this.getCurrentUser();
    withdraw(user.id, false);
  });
  

 /*const sendMoneyBtn = document.getElementById("SendMoney");
    sendMoneyBtn.addEventListener("click", () => {
    console.log("Send Money button clicked");
    const user = this.getCurrentUser();
 send(user.id, false);
 }); */
  
  const logoutBtn = document.getElementById("logoutBtn");
  
  logoutBtn.addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to the index page
  });
  
  const SubmitSignupButtonHome = document.getElementById(
    "SubmitSignupButtonHome"
  );
  SubmitSignupButtonHome.addEventListener("click", registerUser);
  
  let BankDeposit = 0;
  
  let bankClients = JSON.parse(localStorage.getItem("bankClients")) || [];
  
  function updateLocalStorage() {
    localStorage.setItem("bankClients", JSON.stringify(bankClients));
  }
  
  function updateAccountBalanceDisplay() {
    const accountBalanceElement = document.getElementById("BankDeposit");
    accountBalanceElement.textContent = `Account Balance: ₱ ${accountBalance.toFixed(
      2
    )}`;
  }
  
  function registerUser() {
    const newFirstNameInput = document.getElementById("newFirstName").value;
    const newLastNameInput = document.getElementById("newLastName").value;
    const newDOBInput = document.getElementById("newDOB").value;
    const newContactNumInput = document.getElementById("newContactNum").value;
    const newEmailAddInput = document.getElementById("newEmailAdd").value;
    const registeredPassword = document.getElementById("NewPassword").value;
    const matchPassword = document.getElementById("repeatPassword").value;
    const registerUserName = document.getElementById("NewUserName").value;
  
    const NewAccountBalanceInput =
      document.getElementById("NewAccountBalance").value;
  
    const newUser = {
      firstName: newFirstNameInput,
      lastName: newLastNameInput,
      dateOfBirth: newDOBInput,
      contactNumber: newContactNumInput,
      emailAddress: newEmailAddInput,
      userName: registerUserName,
      password: registeredPassword,
      accountBalance: parseFloat(NewAccountBalanceInput), // Parse the value as a float
      accountNumber: generateAccountNumber(),
      budgetTrackerUser: {
        entries: [],
      },
    };
  
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
      alert("Password is too short. Minimum 6 letter is required.");
      return;
    } else if (registeredPassword !== matchPassword) {
      alert("Passwords do not match");
      return;
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
  
      let randomNumber = "";
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
      alert(
        "Required funds to open an account is below our required opening balance of Php 5,000.00"
      );
      return;
    }
  
    // If all conditions are satisfied, add the new user and proceed
    alert(
      `Hi! The account of Ms/Mr ${registerUserName} has just been created. Welcome to LunarFinance.`
    );
  
    bankClients.push(newUser);
  
    updateLocalStorage();
    updateUserTable();
  
    updateAccountBalanceDisplay();
  
    location.reload();
  }
  
  function updateUserTable() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    bankClients.forEach((user, index) => {
      if (user.userName === "admin") {
        return;
      } else {
        const row = userTableBody.insertRow();
        const userNameCell = row.insertCell(0);
        const clientsNameCell = row.insertCell(1);
        const balanceCell = row.insertCell(2);
        const AccountNumberCell = row.insertCell(3);
        const actionsCell = row.insertCell(4); // Shift actions cell index
  
        userNameCell.textContent = user.userName;
        clientsNameCell.textContent = `${user.firstName} ${user.lastName}`;
        balanceCell.textContent = `${getFormattedBalance(index)}`;
        AccountNumberCell.textContent = user.accountNumber;
        const depositButton = createActionButton("Deposit", () =>
          deposit(index, true)
        );
        const withdrawButton = createActionButton("Withdraw", () =>
          withdraw(index, true)
        );
        const sendButton = createActionButton("Send", () =>
          send(user.accountNumber, true)
        );
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
      currency: "PHP",
    });
  }
  
  function get_balance(userIndex) {
    return bankClients[userIndex].accountBalance;
  }
  
  // Deposit function
  function deposit(userIndex, isAdmin) {
    const amount = parseFloat(prompt("Enter the deposit amount:"));
    if (amount > 0) {
      bankClients[userIndex].accountBalance += amount;
      if (isAdmin) {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
      } else {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
        updateDOMWithUserData(bankClients[userIndex]);
      }
    } else {
      alert("Invalid deposit amount.");
    }
  }
  
  // Withdraw function
  function withdraw(userIndex, isAdmin) {
    const amount = parseFloat(prompt("Enter the withdrawal amount:"));
    if (amount > 0 && bankClients[userIndex].accountBalance >= amount) {
      bankClients[userIndex].accountBalance -= amount;
      if (isAdmin) {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
      } else {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
        updateDOMWithUserData(bankClients[userIndex]);
      }
    } else {
      alert("Invalid withdrawal amount or insufficient balance.");
    }
  }
  
  // Transfer money function
  function send(senderNumber, isAdmin) {
    console.log("Sender Account Number:", senderNumber);
    console.log("Bank Clients:", bankClients);
    const recipientNumber = prompt("Enter the recipient's Account Number:");
    const senderIndex = bankClients.findIndex(
      (user) => user.accountNumber === senderNumber
    );
   
    const recipientIndex = bankClients.findIndex(
      (user) => user.accountNumber === recipientNumber
    );
  
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
      if (isAdmin) {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
      } else {
        updateLocalStorage();
        updateAccountBalanceDisplay();
        updateUserTable();
        updateDOMWithUserData(bankClients[userIndex]);
      }
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
    const totalBalance = bankClients.reduce(
      (sum, user) => sum + parseFloat(user.accountBalance),
      0
    );
    const accountBalanceElement = document.getElementById("BankDeposit");
  
    const formattedTotalBalance = totalBalance.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  
    accountBalanceElement.textContent = `Total Balance: ${formattedTotalBalance}`;
  }
  
  updateAccountBalanceDisplay();
  updateUserTable();
  
  class BudgetTracker {
    constructor(containerId, user) {
      this.containerId = containerId;
      this.user = user;
      this.container = document.querySelector(containerId);
      this.container.innerHTML = BudgetTracker.html(); // Set up the initial HTML structure
  
      // Set the root property to the table element
      this.root = this.container.querySelector(".budget-tracker");
  
      // Add an event listener for the "NEW ENTRY" button
      this.root.querySelector(".new-entry").addEventListener("click", () => {
        this.onNewEntryBtnClick();
      });
  
      // Load initial data from user's budgetTrackerUser
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
                        <div>
                            <strong>Total:</strong>
                            <span class="total">₱0.00</span>
                            </div>
                            <div>
                            <strong>Estimated remaining balance:</strong>
                            <span class="estimated">₱0.00</span>
                            </div>
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
      const entries = this.user.budgetTrackerUser.entries || [];
  
      for (const entry of entries) {
        this.addEntry(entry);
      }
  
      this.updateSummary();
    }
  
    updateSummary() {
      console.log("test", this.getCurrentUser());
      const currentUser = this.getCurrentUser();
      let estimatedBalance = 0;
      const total = this.getEntryRows().reduce((total, row) => {
        const amount = row.querySelector(".input-amount").value;
        const isExpense = row.querySelector(".input-type").value === "expense";
        const modifier = isExpense ? -1 : 1;
  
        return total + amount * modifier;
      }, 0);
      estimatedBalance = currentUser.accountBalance + total;
      console.log(estimatedBalance);
      const totalFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(total);
      const estimatedFormatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(estimatedBalance);
  
      this.root.querySelector(".total").textContent = totalFormatted;
      this.root.querySelector(".estimated").textContent = estimatedFormatted;
    }
  
    save() {
      const data = this.getEntryRows().map((row) => {
        return {
          date: row.querySelector(".input-date").value,
          description: row.querySelector(".input-description").value,
          type: row.querySelector(".input-type").value,
          amount: parseFloat(row.querySelector(".input-amount").value),
        };
      });
      console.log(data);
      this.user.budgetTrackerUser.entries = data;
      updateLocalStorage(); // Update the entire bankClients array in local storage
  
      this.updateSummary();
  
      if (currentUser) {
        currentUser.budgetTrackerUser.entries = data; // Save entries to currentUser's budgetTrackerUser
        updateLocalStorage(); // Update the entire bankClients array in local storage
      }
    }
  
    getCurrentUser() {
      return JSON.parse(localStorage.getItem("currentUser"));
    }
  
    addEntry(entry = {}) {
      this.root
        .querySelector(".entries")
        .insertAdjacentHTML("beforeend", BudgetTracker.entryHtml());
  
      const row = this.root.querySelector(".entries tr:last-of-type");
  
      row.querySelector(".input-date").value =
        entry.date || new Date().toISOString().replace(/T.*/, "");
      row.querySelector(".input-description").value = entry.description || "";
      row.querySelector(".input-type").value = entry.type || "income";
      row.querySelector(".input-amount").value = entry.amount || 0;
      row.querySelector(".delete-entry").addEventListener("click", (e) => {
        this.onDeleteEntryBtnClick(e);
      });
  
      row.querySelectorAll(".input").forEach((input) => {
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
  
    static containerHtml() {
      return `
          <div id="budget-app-container" class="budget-app-container"></div>
      `;
    }
  }
  
  currentUser.budgetTrackerUser = new BudgetTracker("#budget-app-container");
  