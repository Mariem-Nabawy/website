document.addEventListener('DOMContentLoaded', function () {
    console.log("Document ready");

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAnAlu8sxHplzyhJ2-sh14TvRQ94WHYvCk",
        authDomain: "gym-web-4f44a.firebaseapp.com",
        projectId: "gym-web-4f44a",
        storageBucket: "gym-web-4f44a.appspot.com",
        messagingSenderId: "1091541048044",
        appId: "1:1091541048044:web:9f5560bb94eafa65c1a3c9"
    };

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized");
    }

    // Firebase Authentication reference
    const auth = firebase.auth();

    // Get references to DOM elements
    const loginSection = document.getElementById('login');
    const registerSection = document.getElementById('register');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Set initial visibility
    function setInitialVisibility() {
        loginSection.style.display = 'block';
        registerSection.style.display = 'none';
        console.log("Initial visibility set: login visible, register hidden");
    }

    setInitialVisibility(); // Set initial state

    // Function to toggle visibility of sections
    function toggleVisibility(sectionToShow) {
        if (sectionToShow === 'register') {
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
            console.log("Register section visible, login hidden");
        } else if (sectionToShow === 'login') {
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            console.log("Login section visible, register hidden");
        }
    }

    // Register link click event listener
    if (registerLink) {
        registerLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("Register link clicked");
            toggleVisibility('register');
        });
    } else {
        console.error("Register link not found in the DOM.");
    }

    // Login link click event listener
    if (loginLink) {
        loginLink.addEventListener('click', function (e) {
            e.preventDefault();
            console.log("Login link clicked");
            toggleVisibility('login');
        });
    } else {
        console.error("Login link not found in the DOM.");
    }

    // Handle Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            console.log("Login form submitted");

            const email = loginForm.querySelector('input[placeholder="Email"]').value.trim();
            const password = loginForm.querySelector('input[placeholder="Password"]').value.trim();

            if (!email || !password) {
                showPopupMessage("Email and password must not be empty.", "error");
                return;
            }

            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                console.log("Login successful:", userCredential);
                showPopupMessage('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } catch (error) {
                console.error('Error during login:', error);
                showPopupMessage(`Login failed: ${error.message}`, 'error');
            }
        });
    }

    // Handle Register Form Submission
    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            console.log("Register form submitted");

            const email = registerForm.querySelector('input[placeholder="Email"]').value.trim();
            const password = registerForm.querySelector('input[placeholder="Password"]').value.trim();

            if (!email || !password) {
                showPopupMessage("Email and password must not be empty.", "error");
                return;
            }

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                console.log("Registration successful:", userCredential);
                showPopupMessage('Registration successful! You can now log in.', 'success');
                setTimeout(() => {
                    toggleVisibility('login');
                }, 2000);
            } catch (error) {
                console.error('Error during registration:', error);
                showPopupMessage(`Registration failed: ${error.message}`, 'error');
            }
        });
    }

    // Function to display popup messages
    function showPopupMessage(message, type) {
        const popup = document.createElement('div');
        popup.className = `popup-message ${type}`;
        popup.textContent = message;

        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
});
