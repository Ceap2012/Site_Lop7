// --- 1. FUNÇÃO DE ALTERNAR CONTEÚDO (Mantida para uso futuro) ---
function toggleContent(id) {
    const element = document.getElementById(id);

    if (element) {
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}


// --- 2. LÓGICA DO QUIZ ---

function submitQuiz(event) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault(); 

    const form = document.getElementById('quiz-form');
    let score = 0;
    const totalQuestions = 4;
    
    // Respostas corretas: q1=b (Indicativo), q2=b (Ênclise), q3=c (Lide), q4=c (Agente)
    const correctAnswers = {
        q1: 'b', 
        q2: 'b', 
        q3: 'c',  
        q4: 'c'   
    };

    // Itera sobre as respostas do usuário
    for (let i = 1; i <= totalQuestions; i++) {
        const questionName = 'q' + i;
        const selectedOption = form.elements[questionName].value; 

        if (selectedOption === correctAnswers[questionName]) {
            score++;
        }
    }

    // Exibe o resultado
    const resultDiv = document.getElementById('quiz-result');
    const percentage = (score / totalQuestions) * 100;
    
    let feedback;
    let scoreColor; // Cor do fundo da caixa de resultado

    if (score === totalQuestions) {
        feedback = 'Parabéns! Você é um MESTRE da Língua Portuguesa!';
        scoreColor = '#28a745'; // Verde (Sucesso)
    } else if (score >= 2) {
        feedback = 'Muito bom! Você acertou a maioria e está no caminho certo.';
        scoreColor = '#ffc107'; // Amarelo (Atenção)
    } else {
        feedback = 'Continue estudando! Revise os tópicos para a próxima tentativa.';
        scoreColor = '#dc3545'; // Vermelho (Alerta)
    }

    // Aplica cor e conteúdo ao resultado
    resultDiv.style.backgroundColor = scoreColor;
    
    resultDiv.innerHTML = `
        <h3>Resultado Final</h3>
        <p class="result-score">${score} / ${totalQuestions}</p>
        <p>Aproveitamento: ${percentage.toFixed(0)}%</p>
        <p>${feedback}</p>
        <button class="link-button" style="background-color: white; color: ${scoreColor}; font-weight: 700;" onclick="window.location.reload()">Refazer Quiz</button>
    `;

    // Torna a div de resultado visível
    resultDiv.style.display = 'block';

    // Rola a tela para o resultado
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}
