const database = {
    "Futebol": {
        how: "Atingir o gol adversário através de posse e transição rápida.",
        rules: ["90 Minutos", "VAR Ativo", "5 Trocas", "IA de Impedimento"],
        tactics: "Pressão alta (Gegenpressing) e sistema 4-3-3.",
        res: "Bolas com sensores UWB e coletes de telemetria.",
        quiz: [{ q: "Qual a duração padrão?", a: ["45 min", "90 min", "120 min"], c: 1 }]
    },
    "Ping Pong": {
        how: "Rebater a bola com spin sobre a rede.",
        rules: ["Sets de 11", "Saque 16cm", "Sem toque na mesa"],
        tactics: "Loop de Forehand e bloqueio passivo.",
        res: "Borrachas de alta fricção.",
        quiz: [{ q: "Quantos pontos ganham um set?", a: ["11", "21"], c: 0 }]
    }
};

const timesData = {
    "Flamengo": { hist: "Clube de Regatas fundado em 1895.", tits: "3 Libertadores, Mundial 1981.", idolo: "Zico" },
    "Palmeiras": { hist: "Fundado como Palestra Italia em 1914.", tits: "3 Libertadores, 12 Brasileiros.", idolo: "Ademir da Guia" }
};

let roteiro = [];
let esporteAtivo = "";

// FUNÇÃO DE TROCA DE TELA
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// BOTÃO LOGIN
function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user.trim() !== "") {
        showScreen('screen-selection');
    } else {
        alert("POR FAVOR, INSIRA SEU ID.");
    }
}

// BOTÕES DE ESPORTE
function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-iniciar').classList.remove('hidden-force');
        document.getElementById('display-roteiro').innerText = `Módulos: ${roteiro.join(', ')}`;
    }
}

// BOTÃO GERAR WORKSPACE
function abrirWorkspace() {
    showScreen('screen-workspace');
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp.toUpperCase();
        btn.className = "cyber-btn";
        btn.style.width = "100%";
        btn.onclick = () => carregarEstudo(esp);
        nav.appendChild(btn);
    });
    carregarEstudo(roteiro[0]);
}

function carregarEstudo(esp) {
    esporteAtivo = esp;
    document.getElementById('section-theory').classList.remove('hidden-force');
    document.getElementById('section-quiz').classList.add('hidden-force');
    document.getElementById('section-team').classList.add('hidden-force');
    
    const d = database[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-tactics').innerText = d.tactics;
    document.getElementById('text-resources').innerText = d.res;
    
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}

// BOTÃO QUIZ
function irParaQuiz() {
    document.getElementById('section-theory').classList.add('hidden-force');
    document.getElementById('section-quiz').classList.remove('hidden-force');
    
    const qData = database[esporteAtivo].quiz[0];
    document.getElementById('quiz-question').innerText = qData.q;
    const optDiv = document.getElementById('quiz-options');
    optDiv.innerHTML = "";
    
    qData.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = "cyber-btn";
        btn.style.width = "100%";
        btn.onclick = () => {
            if(i === qData.c) {
                alert("SUCESSO!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('section-quiz').classList.add('hidden-force');
                    document.getElementById('section-team').classList.remove('hidden-force');
                } else carregarEstudo(esporteAtivo);
            } else {
                alert("ERRO NA ANÁLISE.");
                carregarEstudo(esporteAtivo);
            }
        };
        optDiv.appendChild(btn);
    });
}

function exibirDadosTime() {
    const time = document.getElementById('team-selector').value;
    const res = document.getElementById('team-result');
    if(time && timesData[time]) {
        const t = timesData[time];
        res.innerHTML = `<h3>${time}</h3><p>${t.hist}</p><p><b>Títulos:</b> ${t.tits}</p><p><b>Ídolo:</b> ${t.idolo}</p>`;
        res.style.display = "block";
    }
}
