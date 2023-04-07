const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    resetValidation();

    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstName.length === 0) {
        document.querySelector('#no-firstName').removeAttribute("hidden");
    } else if (lastName.length === 0) {
        document.querySelector('#no-lastName').removeAttribute("hidden");
    } else if (email.length === 0) {
        document.querySelector('#no-email').removeAttribute("hidden");
    } else if (password.length < 8) {
        document.querySelector('#short-password').removeAttribute("hidden");
    } else {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/new-pet-form');
        } else {
            alert('Failed to sign up.');
        }
    }
};

function resetValidation() {
    document.querySelector('#no-firstName').setAttribute("hidden", "hidden");
    document.querySelector('#no-lastName').setAttribute("hidden", "hidden");
    document.querySelector('#no-email').setAttribute("hidden", "hidden");
    document.querySelector('#short-password').setAttribute("hidden", "hidden");
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
