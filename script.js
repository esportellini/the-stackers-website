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

    // Chama a função de verificação de metas ao carregar a página
    checkGoals();
});

// Função para verificar metas não cumpridas e exibir notificações
function checkGoals() {
    const notificationList = document.getElementById('notificationList');
    const notificationCount = document.getElementById('notificationCount');

    // Limpa as notificações anteriores
    notificationList.innerHTML = '';
    let count = 0; // Para contar as notificações

    // Supondo que você tenha um array de metas armazenado em algum lugar
    const goals = JSON.parse(localStorage.getItem('goals')) || []; // Exemplo de carregamento das metas

    // Verifica metas não cumpridas
    goals.forEach(goal => {
        if (!goal.completed) {
            count++;
            const li = document.createElement('li');
            li.textContent = `Atenção: ${goal.name} não foi cumprida.`;
            notificationList.appendChild(li);
        }
    });

    // Atualiza a contagem de notificações
    notificationCount.textContent = count;

    // Se não houver notificações, você pode adicionar uma mensagem padrão
    if (count === 0) {
        const li = document.createElement('li');
        li.textContent = 'Todas as metas foram cumpridas!';
        notificationList.appendChild(li);
    }
}

// Função para mostrar/ocultar as notificações
function viewNotif() {
    const notificationsSection = document.getElementById('notifications');
    notificationsSection.style.display = notificationsSection.style.display === 'none' ? 'flex' : 'none';
}

