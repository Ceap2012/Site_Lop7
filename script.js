const database = {
    "Futebol": {
        how: "Conduzir a bola ao gol em campo de 100m. Foco em transição e posse estratégica.",
        rules: ["90 min", "VAR Ativo", "Impedimento via IA", "5 Substituições"],
        tactics: "Gegenpressing e 4-3-3 ofensivo com amplitude.",
        res: "Bolas com microchips e GPS corporal de alta frequência.",
        quiz: [{ q: "Qual a duração oficial de uma partida?", a: ["45min", "90min", "120min"], c: 1 }]
    },
    "Ping Pong": {
        how: "Rebater a bola com efeito Magnus sobre a mesa de 2,74m.",
        rules: ["Sets de 11 pontos", "Saque sobe 16cm", "Mão fora da mesa"],
        tactics: "Ataque de terceira bola e controle de spin.",
        res: "Borrachas tencionadas e sensores de borda.",
        quiz: [{ q: "Quantos pontos ganham um set?", a: ["11", "21"], c: 0 }]
    }
};

const timesData = {
    "Flamengo": { fund: "1895", hist: "Clube de Regatas que se tornou potência mundial.", titulos: "Mundial 1981, 3 Libertadores.", idolo: "Zico" },
    "Palmeiras": { fund: "1914", hist: "Academia de futebol, multicampeão nacional e continental.", titulos: "3 Libertadores, 12 Brasileiros.", idolo: "Ademir da Guia" },
    "Santos": { fund: "1912", hist: "O time que parou guerras e revelou o Rei do Futebol.", titulos: "2 Mundiais, 3 Libertadores.", idolo: "Pelé" },
    "São Paulo": { fund: "1930", hist: "O Clube da Fé, primeiro tri-mundial do Brasil.", titulos: "3 Mundiais, 3 Libertadores.", idolo: "Rogério Ceni" }
};

let roteiro = [];
let esporteAtivo = "";

// NAVEGAÇÃO PRINCIPAL
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user !== "") {
        showScreen('screen-selection');
    } else {
        alert("Digite um ID para acessar.");
    }
}

function alternarModo() {
    alert("Modo alterado. Tente logar agora.");
}

// SELEÇÃO DE ESPORTES
function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-iniciar').classList.remove('hidden');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
        list.innerHTML += `<li>Módulo: ${esp}</li>`;
    }
}

// WORKSPACE
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
    document.getElementById('section-theory').classList.remove('hidden');
    document.getElementById('section-quiz').classList.add('hidden');
    document.getElementById('section-team').classList.add('hidden');
    
    const d = database[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-tactics').innerText = d.tactics;
    document.getElementById('text-resources').innerText = d.res;
    
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}

// QUIZ E TIMES
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
                alert("CONHECIMENTO VALIDADO!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('section-quiz').classList.add('hidden');
                    document.getElementById('section-team').classList.remove('hidden');
                } else {
                    carregarEstudo(esporteAtivo);
                }
            } else {
                alert("ERRADO. REVISE A TEORIA.");
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
        res.innerHTML = `
            <h3>${time.toUpperCase()}</h3>
            <p><b>História:</b> ${t.hist}</p>
            <p><b>Fundação:</b> ${t.fund}</p>
            <p><b>Títulos:</b> ${t.titulos}</p>
            <p><b>Ídolo:</b> ${t.idolo}</p>
        `;
    }
}
