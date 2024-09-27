// script-metas.js

// Verifica se o usuário está logado
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const goalForm = document.getElementById('goalForm');
    const goalsList = document.getElementById('goalsList');

    // Carregar metas do localStorage
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    renderGoals();

    // Adicionar nova meta
    goalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('goalTitle').value.trim();
        const description = document.getElementById('goalDescription').value.trim();

        if (title && description) {
            const newGoal = { title, description, status: 'Em andamento', date: new Date().toLocaleString() };
            goals.push(newGoal);
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
            goalForm.reset();
            alert('Meta adicionada com sucesso!');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Função para renderizar metas
    function renderGoals() {
        goalsList.innerHTML = '';
        if (goals.length === 0) {
            goalsList.innerHTML = '<p>Nenhuma meta disponível.</p>';
            return;
        }
        goals.forEach((goal, index) => {
            const goalDiv = document.createElement('div');
            goalDiv.className = 'goal';
            goalDiv.innerHTML = `
                <h4>Meta ${index + 1}: ${goal.title}</h4>
                <p><strong>Descrição:</strong> ${goal.description}</p>
                <p><strong>Status:</strong> ${goal.status}</p>
                <p><em>Data de Criação:</em> ${goal.date}</p>
                <button onclick="editGoal(${index})">Editar</button>
                <button onclick="deleteGoal(${index})">Excluir</button>
            `;
            goalsList.appendChild(goalDiv);
        });
    }

    // Função para editar meta
    window.editGoal = function(index) {
        const newTitle = prompt('Novo título:', goals[index].title);
        const newDescription = prompt('Nova descrição:', goals[index].description);
        if (newTitle && newDescription) {
            goals[index].title = newTitle.trim();
            goals[index].description = newDescription.trim();
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
            alert('Meta atualizada com sucesso!');
        } else {
            alert('Título e descrição não podem estar vazios.');
        }
    }

    // Função para excluir meta
    window.deleteGoal = function(index) {
        if (confirm('Tem certeza que deseja excluir esta meta?')) {
            goals.splice(index, 1);
            localStorage.setItem('goals', JSON.stringify(goals));
            renderGoals();
            alert('Meta excluída com sucesso!');
        }
    }
});
