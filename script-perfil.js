document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email; // Se você tiver um campo de email
    } else {
        alert('Você não está logado. Redirecionando para a tela de login...');
        window.location.href = 'login.html'; // Redireciona para a tela de login se não houver usuário logado
    }

    const profileForm = document.getElementById('profileForm');
    
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Atualiza os dados do usuário
        user.username = document.getElementById('username').value;
        user.email = document.getElementById('email').value; // Se você tiver um campo de email

        // Salva as alterações
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.map(u => (u.username === user.username ? user : u));
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Perfil atualizado com sucesso!');
    });
});
