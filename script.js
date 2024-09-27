// script.js

// Função para verificar se o usuário está logado
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

// Chama a função de verificação de login imediatamente
checkLogin();

// Função para realizar logout
function logout() {
    // Opcional: Limpa todos os dados do localStorage
    // localStorage.clear();

    // Limpa apenas o status de login e informações do usuário
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    alert('Você foi desconectado.');
    // Redireciona para a página de login
    window.location.href = 'login.html';
}

// Funções de redirecionamento existentes
function startSelfEvaluation() {
    window.location.href = 'autoavaliacao.html';
}

function viewReviews() {
    window.location.href = 'reviews.html';
}

function manageGoals() {
    window.location.href = 'metas.html';
}

function viewReports() {
    window.location.href = 'relatorios.html';
}

function viewProfile() {
    window.location.href = 'perfil.html';
}

// Exibir o nome do usuário na página inicial
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection && currentUser) {
        const welcomeMessage = welcomeSection.querySelector('h2');
        welcomeMessage.textContent = `Bem-vindo, ${currentUser.name}`;
    }
});
