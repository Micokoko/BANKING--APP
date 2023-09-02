Banking App: LunarFinance
This README file provides an overview of the functions and features of the Banking App: LunarFinance. This application allows users to manage their finances, including tracking income and expenses, performing deposits and withdrawals, and enabling money transfers. It also includes user authentication and supports both regular users and an admin user.

Table of Contents
Overview
Features
Usage
Functions
Contributors
Overview
The Banking App: LunarFinance is a web-based tool that helps users manage their finances by providing a secure and user-friendly platform for banking operations. Users can log in with their credentials, manage their budget, and perform various financial transactions. The application also includes an admin panel for managing user accounts.

Features
User Authentication: Users can log in using their username and password. There is a separate admin user with special privileges.

User Dashboard: Once logged in, users are directed to a dashboard where they can view their financial summary and manage their budget.

Income and Expense Tracking: Users can add income and expense entries, specifying the date, description, type (income or expense), and amount.

Financial Summary: The application calculates and displays the total income, total expenses, and estimated remaining balance for the user.

Deposits and Withdrawals: Users can perform deposits and withdrawals, updating their account balance accordingly.

Money Transfers: Users can initiate money transfers to other accounts, ensuring secure transactions.

Admin Panel: The admin user has access to additional features, such as viewing and managing all user accounts and their balances.

Usage
To use the Banking App: LunarFinance, follow these steps:

Open the application in a web browser.
Log in with your username and password.
Add income and expense entries on your dashboard.
Perform deposits and withdrawals as needed.
Initiate money transfers to other accounts.
Admin User (Admin Panel):
Log in as the admin user with the username "admin" and password "admin."
Access the admin panel to view and manage user accounts.
Functions
The application is powered by various JavaScript functions. Below is a brief overview of some key functions:

authenticateUser(username, password, adminUser, bankClients)
Description: Authenticates a user based on their username and password.
Parameters:
username (string): The entered username.
password (string): The entered password.
adminUser (object): The admin user's credentials.
bankClients (array): An array of user objects.
Returns: The authenticated user object or null if authentication fails.
updateDOMWithUserData(user)
Description: Updates the DOM to display user-specific content.
Parameters:
user (object): The authenticated user object.
Updates the displayed content based on the user's role (admin or regular user) and budget data.
signIn(event, adminUser, bankClients)
Description: Handles user login when the login button is clicked.
Parameters:
event (object): The click event.
adminUser (object): The admin user's credentials.
bankClients (array): An array of user objects.
Validates user credentials and initiates the login process.
deposit(userIndex, isAdmin)
Description: Handles deposits to a user's account.
Parameters:
userIndex (number): The index of the user in the bankClients array.
isAdmin (boolean): Indicates whether the action is performed by an admin user.
Prompts the user to enter a deposit amount and updates the user's account balance.
withdraw(userIndex, isAdmin)
Description: Handles withdrawals from a user's account.
Parameters:
userIndex (number): The index of the user in the bankClients array.
isAdmin (boolean): Indicates whether the action is performed by an admin user.
Prompts the user to enter a withdrawal amount and updates the user's account balance.
send(senderNumber, isAdmin)
Description: Handles money transfers between user accounts.
Parameters:
senderNumber (string): The account number of the sender.
isAdmin (boolean): Indicates whether the action is performed by an admin user.
Prompts the user to enter the recipient's account number and transfer amount.
registerUser()
Description: Registers a new user account.
Retrieves user input for registration, validates it, and creates a new user account.
updateLocalStorage()
Description: Updates the local storage with user account data.
Saves the bankClients array to local storage to persist user data.
updateUserTable()
Description: Updates the user table in the admin panel.
Populates the admin panel table with user account information and actions.
getFormattedBalance(userIndex)
Description: Formats a user's account balance as currency.
Parameters:
userIndex (number): The index of the user in the bankClients array.
Returns the user's account balance formatted as currency.
get_balance(userIndex)
Description: Retrieves a user's account balance.
Parameters:
userIndex (number): The index of the user in the bankClients array.
Returns the user's account balance.
createActionButton(label, onClick)
Description: Creates an HTML button element.
Parameters:
label (string): The label text for the button.
onClick (function): The function to be executed when the button is clicked.
Returns an HTML button element with the specified label and click behavior.
BudgetTracker(containerId, user)
Description: Initializes the budget tracker for a user.
Parameters:
containerId (string): The ID of the HTML container element.
user (object): The user object associated with the budget tracker.
Sets up the budget tracker interface and event listeners for managing financial entries.
getCurrentUser()
Description: Retrieves the current user from local storage.
Returns the user object of the currently logged-in user.
updateAccountBalanceDisplay()
Description: Updates the displayed total account balance.
Calculates and displays the total account balance for all users.
Contributors

Miguel Enrico Balina
Samuel Jim Palaez

Feel free to contribute to this project and enhance its features!
