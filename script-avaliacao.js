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
        });
    });
    
    document.getElementById('selfAssessmentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        let formData = {};
        const questions = ['q1', 'q2', 'q3', 'q4', 'q5'];
        
        questions.forEach(q => {
            const rating = document.querySelector(`input[name="${q}"]`);
            formData[q] = rating ? rating.value : 0;
        });
        
        let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
        assessments.push(formData);
        localStorage.setItem('assessments', JSON.stringify(assessments));
        
        downloadJSON(formData, 'autoavaliacao.json');
        
        alert('Autoavaliação enviada com sucesso!');
    });

    // Carregar relatórios
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
            });
            
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
