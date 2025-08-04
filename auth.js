const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Dummy credentials
const validUser = {
  username: 'student',
  password: 'study123'
};

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === validUser.username && password === validUser.password) {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'index.html';
  } else {
    loginMessage.textContent = 'Invalid username or password.';
  }
});
