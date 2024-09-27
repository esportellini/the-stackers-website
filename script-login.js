// script-login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    // Inicializa usuários padrão se não existirem no localStorage
    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                username: 'admin',
                password: 'admin123', // ⚠️ Em produção, nunca armazene senhas em texto puro
                name: 'Administrador'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Define o status de login e armazena informações do usuário
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            // Redireciona para a página inicial
            window.location.href = 'index.html';
        } else {
            alert('Usuário ou senha inválidos.');
        }
    });
});
