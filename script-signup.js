document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value; // Adicionando email
        const password = document.getElementById('password').value;

        // Verifica se o usuário já existe
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert('Usuário já existe! Tente outro nome de usuário.');
            return;
        }

        // Adiciona o novo usuário
        users.push({ username, email, password }); // Armazenando também o email
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro concluído! Você pode agora fazer login.');
        window.location.href = 'login.html'; // Redireciona para a tela de login
    });
});
