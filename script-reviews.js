// script-reviews.js

// Verifica se o usuário está logado
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    // Carregar reviews do localStorage
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    renderReviews();

    // Adicionar novo review
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reviewer = document.getElementById('reviewer').value.trim();
        const reviewText = document.getElementById('reviewText').value.trim();

        if (reviewer && reviewText) {
            const newReview = { reviewer, reviewText, date: new Date().toLocaleString() };
            reviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            renderReviews();
            reviewForm.reset();
            alert('Review adicionada com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para renderizar reviews
    function renderReviews() {
        reviewsList.innerHTML = '';
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p>Nenhum review disponível.</p>';
            return;
        }
        reviews.forEach((review, index) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.innerHTML = `
                <h4>Review ${index + 1}</h4>
                <p><strong>Revisor:</strong> ${review.reviewer}</p>
                <p><strong>Comentário:</strong> ${review.reviewText}</p>
                <p><em>Data:</em> ${review.date}</p>
            `;
            reviewsList.appendChild(reviewDiv);
        });
    }
});
