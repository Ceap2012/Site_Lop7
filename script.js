const database = {
    "Futebol": {
        how: "Disputado em campo de 100m. Foco em fases de transição e quebra de linhas defensivas.",
        rules: ["90 min", "Impedimento via IA", "5 substituições", "VAR ativo"],
        tactics: "Uso de Gegenpressing e amplitude com pontas (4-3-3).",
        res: "Bolas com chips, GPS 10Hz e gramado híbrido.",
        quiz: [
            { q: "Qual a duração padrão de uma partida?", a: ["45 min", "90 min", "60 min"], correct: 1 },
            { q: "O que o VAR revisa?", a: ["Lateral", "Escanteio", "Gols e Pênaltis"], correct: 2 }
        ]
    },
    // ... outros esportes seguem o mesmo padrão
};

const timesFutebol = {
    "Flamengo": {
        historia: "Fundado em 1895 como clube de regatas.",
        titulos: "Mundial (1981), 3 Libertadores, 8 Brasileiros.",
        idolo: "Zico (O Galinho de Quintino).",
        fundador: "Grupo de remadores no bairro do Flamengo."
    },
    "Palmeiras": {
        historia: "Fundado em 1914 como Palestra Italia.",
        titulos: "3 Libertadores, 12 Brasileiros, 4 Copas do Brasil.",
        idolo: "Ademir da Guia (O Divino).",
        fundador: "Imigrantes italianos em São Paulo."
    },
    "São Paulo": {
        historia: "Fundado em 1930, conhecido como O Clube da Fé.",
        titulos: "3 Mundiais, 3 Libertadores, 6 Brasileiros.",
        idolo: "Rogério Ceni (Mito).",
        fundador: "Dissidentes do Paulistano e da AA das Palmeiras."
    }
    // Adicione mais times aqui conforme desejar
};

let roteiro = [];
let esporteAtual = "";

// FUNÇÕES DE NAVEGAÇÃO
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user) { document.getElementById('user-display').innerText = user; showScreen('screen-selection'); }
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp); el.classList.add('selected');
        document.getElementById('btn-iniciar').classList.remove('hidden');
    }
}

function abrirWorkspace() {
    showScreen('screen-workspace');
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp.toUpperCase();
        btn.onclick = () => carregarEstudo(esp);
        nav.appendChild(btn);
    });
    carregarEstudo(roteiro[0]);
}

function carregarEstudo(esp) {
    esporteAtual = esp;
    const d = database[esp];
    document.getElementById('content-theory').classList.remove('hidden');
    document.getElementById('content-quiz').classList.add('hidden');
    document.getElementById('content-team').classList.add('hidden');
    
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-tactics').innerText = d.tactics;
    document.getElementById('text-resources').innerText = d.res;
    
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}

// LÓGICA DO QUIZ
function iniciarQuiz() {
    document.getElementById('content-theory').classList.add('hidden');
    document.getElementById('content-quiz').classList.remove('hidden');
    const quizData = database[esporteAtual].quiz[0]; // Pegando a primeira pergunta
    document.getElementById('quiz-question').innerText = quizData.q;
    
    const optDiv = document.getElementById('quiz-options');
    optDiv.innerHTML = "";
    quizData.a.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style = "display:block; width:100%; margin:10px 0; background:#111; color:white; border:1px solid cyan; padding:10px;";
        btn.onclick = () => validarResposta(index, quizData.correct);
        optDiv.appendChild(btn);
    });
}

function validarResposta(escolha, correta) {
    if(escolha === correta) {
        alert("Correto! Processando dados de afinidade...");
        if(esporteAtual === "Futebol") {
            document.getElementById('content-quiz').classList.add('hidden');
            document.getElementById('content-team').classList.remove('hidden');
        } else {
            alert("Módulo concluído!");
        }
    } else {
        alert("Resposta incorreta. Revise a teoria.");
        document.getElementById('content-quiz').classList.add('hidden');
        document.getElementById('content-theory').classList.remove('hidden');
    }
}

// LÓGICA DE TIMES
function mostrarDetalhesTime() {
    const time = document.getElementById('team-selector').value;
    const details = document.getElementById('team-details');
    if(time && timesFutebol[time]) {
        const t = timesFutebol[time];
        details.innerHTML = `
            <h4>${time.toUpperCase()}</h4>
            <p><b>Fundação:</b> ${t.fundador}</p>
            <p><b>História:</b> ${t.historia}</p>
            <p><b>Títulos:</b> ${t.titulos}</p>
            <p><b>Maior Ídolo:</b> ${t.idolo}</p>
        `;
    } else {
        details.innerHTML = "";
    }
}
