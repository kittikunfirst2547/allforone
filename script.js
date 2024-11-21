const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // เก็บค่าที่ผู้ใช้กรอก
    const username = document.getElementById('username').value;
    const useremail = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;
    const termsAccepted = document.getElementById('terms'). value;

    if (!termsAccepted) {
        alert("You must agree to the terms and conditions.");
        return;
    }

    // เก็บข้อมูลใน localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('useremail', useremail);
    localStorage.setItem('password', password);

    // แสดงข้อความสำเร็จ
    alert("Registration successful!");
    wrapper.classList.remove('active');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the login form
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve stored data from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Check if username and password match
    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        // Redirect to dashboard or home page
        window.location.href = 'dashboard.html';  // Example redirect
    } else {
        alert('Login successful!');
    }
    window.location.href = 'email.html';
    console.log(localStorage.getItem('useremail'));
});

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});