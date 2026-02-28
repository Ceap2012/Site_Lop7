const database = {
    "Futebol": {
        how: "Condução da bola ao gol em campo de 100m. Foco em transição e posse.",
        rules: ["90 min", "VAR Ativo", "Impedimento IA", "5 Trocas"],
        tactics: "Gegenpressing e 4-3-3 ofensivo.",
        res: "Bolas com microchips e GPS corporal.",
        quiz: [{ q: "Qual a duração oficial?", a: ["45min", "90min", "120min"], c: 1 }]
    },
    "Ping Pong": {
        how: "Rebater a bola com efeito Magnus sobre a mesa.",
        rules: ["Sets de 11", "Saque 16cm", "Mão fora da mesa"],
        tactics: "Ataque de terceira bola.",
        res: "Borrachas tencionadas.",
        quiz: [{ q: "Quantos pontos ganham um set?", a: ["11", "21"], c: 0 }]
    }
};

const timesData = {
    "Flamengo": { fund: "1895", hist: "Clube de Regatas que se tornou potência mundial.", titulos: "Mundial 1981, 3 Libertadores.", idolo: "Zico" },
    "Palmeiras": { fund: "1914", hist: "Academia de futebol, multicampeão continental.", titulos: "3 Libertadores, 12 Brasileiros.", idolo: "Ademir da Guia" }
};

let roteiro = [];
let esporteAtivo = "";

// FUNÇÃO DE TROCA DE TELA (CORRIGIDA)
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user !== "") {
        showScreen('screen-selection');
    } else {
        alert("Digite um ID para acessar.");
    }
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-iniciar').classList.remove('hidden');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
        list.innerHTML += `<li>${esp}</li>`;
    }
}

function abrirWorkspace() {
    showScreen('screen-workspace');
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp.toUpperCase();
        btn.style.width = "100%";
        btn.onclick = () => carregarEstudo(esp);
        nav.appendChild(btn);
    });
    carregarEstudo(roteiro[0]);
}

function carregarEstudo(esp) {
    esporteAtivo = esp;
    const d = database[esp];
    document.getElementById('section-theory').classList.remove('hidden');
    document.getElementById('section-quiz').classList.add('hidden');
    document.getElementById('section-team').classList.add('hidden');
    
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-tactics').innerText = d.tactics;
    document.getElementById('text-resources').innerText = d.res;
    
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}

function irParaQuiz() {
    document.getElementById('section-theory').classList.add('hidden');
    document.getElementById('section-quiz').classList.remove('hidden');
    
    const qData = database[esporteAtivo].quiz[0];
    document.getElementById('quiz-question').innerText = qData.q;
    const optDiv = document.getElementById('quiz-options');
    optDiv.innerHTML = "";
    
    qData.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style.width = "100%";
        btn.onclick = () => {
            if(i === qData.c) {
                alert("ACERTOU!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('section-quiz').classList.add('hidden');
                    document.getElementById('section-team').classList.remove('hidden');
                } else {
                    carregarEstudo(esporteAtivo);
                }
            } else {
                alert("ERRADO. VOLTE PARA A TEORIA.");
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
        res.style.display = "block";
        res.innerHTML = `<h3>${time}</h3><p>${t.hist}</p><p>IDOLO: ${t.idolo}</p>`;
    }
}
