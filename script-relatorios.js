// script-relatorios.js

// Verifica se o usuário está logado
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const reportsList = document.getElementById('reportsList');

    // Carregar avaliações do localStorage
    let assessments = JSON.parse(localStorage.getItem('assessments')) || [];

    if (assessments.length === 0) {
        reportsList.innerHTML = '<p>Nenhum relatório disponível.</p>';
        return;
    }

    assessments.forEach((assessment, index) => {
        const reportDiv = document.createElement('div');
        reportDiv.className = 'report';
        reportDiv.innerHTML = `
            <h3>Relatório ${index + 1}</h3>
            <p><strong>Desempenho Geral:</strong> <span class="star-rating">${'★'.repeat(assessment.q1)}${'☆'.repeat(5 - assessment.q1)}</span></p>
            <p><strong>Capacidade de Trabalhar em Equipe:</strong> <span class="star-rating">${'★'.repeat(assessment.q2)}${'☆'.repeat(5 - assessment.q2)}</span></p>
            <p><strong>Habilidade de Comunicação:</strong> <span class="star-rating">${'★'.repeat(assessment.q3)}${'☆'.repeat(5 - assessment.q3)}</span></p>
            <p><strong>Capacidade de Cumprir Prazos:</strong> <span class="star-rating">${'★'.repeat(assessment.q4)}${'☆'.repeat(5 - assessment.q4)}</span></p>
            <p><strong>Proatividade:</strong> <span class="star-rating">${'★'.repeat(assessment.q5)}${'☆'.repeat(5 - assessment.q5)}</span></p>
            <p><em>Data da Avaliação:</em> ${new Date(assessment.date).toLocaleString()}</p>
        `;
        reportsList.appendChild(reportDiv);
    });
});
