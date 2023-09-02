# Banking App: LunarFinance

## Overview
This README file provides an overview of the functions and features of the Banking App: LunarFinance. This application allows users to manage their finances, including tracking income and expenses, performing deposits and withdrawals, and enabling money transfers. It also includes user authentication and supports both regular users and an admin user.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Usage](#usage)
- [Functions](#functions)
- [Access the Website](#access-the-website)
- [Contributors](#contributors)

## Features
- **User Authentication**: Users can log in using their username and password. There is a separate admin user with special privileges.
- **User Dashboard**: Once logged in, users are directed to a dashboard where they can view their financial summary and manage their budget.
- **Income and Expense Tracking**: Users can add income and expense entries, specifying the date, description, type (income or expense), and amount.
- **Financial Summary**: The application calculates and displays the total income, total expenses, and estimated remaining balance for the user.
- **Deposits and Withdrawals**: Users can perform deposits and withdrawals, updating their account balance accordingly.
- **Money Transfers**: Users can initiate money transfers to other accounts, ensuring secure transactions.
- **Admin Panel**: The admin user has access to additional features, such as viewing and managing all user accounts and their balances.

## Usage
To use the Banking App: LunarFinance, follow these steps:

1. Open the application in a web browser.
2. Log in with your username and password.
3. Add income and expense entries on your dashboard.
4. Perform deposits and withdrawals as needed.
5. Initiate money transfers to other accounts.

### Admin User (Admin Panel):
1. Log in as the admin user with the username "admin" and password "admin."
2. Access the admin panel to view and manage user accounts.

## Functions
The application is powered by various JavaScript functions. Below is a brief overview of some key functions:

- **`authenticateUser(username, password, adminUser, bankClients)`**
  - Description: Authenticates a user based on their username and password.
  - Returns: The authenticated user object or `null` if authentication fails.

- **`updateDOMWithUserData(user)`**
  - Description: Updates the DOM to display user-specific content.

- **`signIn(event, adminUser, bankClients)`**
  - Description: Handles user login when the login button is clicked.

- **`deposit(userIndex, isAdmin)`**
  - Description: Handles deposits to a user's account.

- **`withdraw(userIndex, isAdmin)`**
  - Description: Handles withdrawals from a user's account.

- **`send(senderNumber, isAdmin)`**
  - Description: Handles money transfers between user accounts.

- **`registerUser()`**
  - Description: Registers a new user account.

- **`updateLocalStorage()`**
  - Description: Updates the local storage with user account data.

- **`updateUserTable()`**
  - Description: Updates the user table in the admin panel.

- **`getFormattedBalance(userIndex)`**
  - Description: Formats a user's account balance as currency.

- **`get_balance(userIndex)`**
  - Description: Retrieves a user's account balance.

- **`createActionButton(label, onClick)`**
  - Description: Creates an HTML button element.

- **`BudgetTracker(containerId, user)`**
  - Description: Initializes the budget tracker for a user.

- **`getCurrentUser()`**
  - Description: Retrieves the current user from local storage.

- **`updateAccountBalanceDisplay()`**
  - Description: Updates the displayed total account balance.

## Access the Website
To access the Banking App: LunarFinance website, click the following link: [Banking App: LunarFinance](https://micokoko.github.io/BANKING--APP/index.html)

## Contributors
- Miguel Enrico Balina
- Samuel Jim Palaez

Feel free to contribute to this project and enhance its features!
