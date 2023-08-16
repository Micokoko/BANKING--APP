document.addEventListener("DOMContentLoaded", function() {
    const signUpButton = document.getElementById("signUp");
    const logInforms = document.querySelector(".logInforms form");
    const signUpForms = document.querySelector(".signUpForms");

    signUpButton.addEventListener("click", function() {
        logInforms.style.display = "none";
        signUpForms.style.display = "block";
    });
});


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





let bankClients = JSON.parse(localStorage.getItem('bankClients')) || [
    {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        contactNumber: 0,
        emailAddress: "",
        userName: "a",
        password: "a",
        accountBalance:0
    },
    {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        contactNumber: 0,
        emailAddress: "",
        userName: "b",
        password: "b",
        accountBalance:0
    }
];

const encodedUserName = document.getElementById("encodedUserName");
const encodedPassWord = document.getElementById("encodedPassWord");


const LogInButton = document.getElementById('LogIn');
const SubmitSignupButton = document.getElementById('SubmitSignupButton')

LogInButton.addEventListener('click', signIn);
SubmitSignupButton.addEventListener('click', registerUser)

function signIn(event) {
    event.preventDefault(); 
    const enteredUserName = encodedUserName.value;
    const enteredPassWord = encodedPassWord.value;

    let userFound = false; 

    for (let i = 0; i < bankClients.length; i++) {
        if (enteredUserName === bankClients[i].userName && enteredPassWord === bankClients[i].password) {
            userFound = true;
            window.location.href = "index.html";
            break; // 
        }
    }

    if (!userFound) {
        alert("User credentials do not match");
    }
}

function registerUser (){
    const newFirstNameInput = document.getElementById("newFirstName").value;
    const newLastNameInput = document.getElementById("newLastName").value;
    const newDOBInput = document.getElementById("newDOB").value;
    const newContactNumInput = document.getElementById("newContactNum").value;
    const newEmailAddInput = document.getElementById("newEmailAdd").value;
    const registerUserName = document.getElementById('NewUserName').value
    const registerPassword = document.getElementById('NewPassword').value
    const matchPassword = document.getElementById('repeatPassword').value

    const newUser = {
        firstName:newFirstNameInput,
        lastName:newLastNameInput,
        dateOfBirth:newDOBInput,
        contactNumber:newContactNumInput,
        emailAddress: newEmailAddInput,
        userName: registerUserName,
        password: registerPassword,
        accountBalance:0
    }

    for (let i = 0; i < bankClients.length; i++) {
        if (registerUserName === bankClients[i].userName) {
        alert ("Desired username has already been taken")
        return
       } else if (registerPassword.length < 6) {
        alert ("Password is too short. Minimum 6 letter is required.")
        return
       } else if (registerPassword !== matchPassword){
        alert ("Passwords do not match")
        return
        } else{
            alert (`Hi ${registerUserName}! Your account has been created. Welcome to LunarFinance.` )
        }
    }   
    

    bankClients.push(newUser);
    console.log(bankClients);

    // Save updated bankClients array to localStorage
    localStorage.setItem('bankClients', JSON.stringify(bankClients));

    window.location.href = "login-page.html";
}


