// script-avaliacao.js

// Verifica se o usuário está logado
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.querySelectorAll('.rating');
    
    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('.fa-star');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const input = rating.querySelector('input');
                input.value = value;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.classList.add('selected');
                    } else {
                        s.classList.remove('selected');
                    }
                });
            });

            // Efeito hover para seleção
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                stars.forEach(s => {
                    if (s.getAttribute('data-value') <= value) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            star.addEventListener('mouseout', function() {
                stars.forEach(s => {
                    s.classList.remove('hover');
                });
            });
        });
    });
    
    document.getElementById('selfAssessmentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let formData = {};
        const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
        
        questions.forEach(q => {
            const rating = document.querySelector(`input[name="${q}"]`);
            formData[q] = rating ? parseInt(rating.value) : 0;
        });

        // Adiciona a data da avaliação
        formData.date = new Date().toISOString();

        let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
        assessments.push(formData);
        localStorage.setItem('assessments', JSON.stringify(assessments));
        
        downloadJSON(formData, 'autoavaliacao.json');
        
        alert('Autoavaliação enviada com sucesso!');
        this.reset();

        // Remove as classes 'selected' dos stars após o reset
        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('.fa-star');
            stars.forEach(star => {
                star.classList.remove('selected');
            });
            const input = rating.querySelector('input');
            input.value = 0;
        });
    });

    // Carregar relatórios (se houver um elemento com id 'reportList')
    if (document.getElementById('reportList')) {
        const reportList = document.getElementById('reportList');
        let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
        
        assessments.forEach((assessment, index) => {
            const report = document.createElement('div');
            report.className = 'report';
            
            const title = document.createElement('h3');
            title.textContent = `Relatório ${index + 1}`;
            report.appendChild(title);
            
            const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
            const questionsText = [
                "Desempenho geral",
                "Capacidade de trabalhar em equipe",
                "Habilidade de comunicação",
                "Capacidade de cumprir prazos",
                "Proatividade"
            ];
            
            questions.forEach((q, i) => {
                const paragraph = document.createElement('p');
                paragraph.innerHTML = `<strong>${questionsText[i]}:</strong> <span class="star-rating">${'★'.repeat(assessment[q])}${'☆'.repeat(5 - assessment[q])}</span>`;
                report.appendChild(paragraph);
            }

            );

            // Adiciona a data da avaliação
            const dateParagraph = document.createElement('p');
            const date = new Date(assessment.date);
            dateParagraph.innerHTML = `<em>Data da Avaliação:</em> ${date.toLocaleString()}`;
            report.appendChild(dateParagraph);
            
            reportList.appendChild(report);
        });
    }
});

function downloadJSON(data, filename) {
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}
