const database = {
    "Futebol": {
        how: "Conduzir a bola ao gol adversário em campo de 100m. Foco em transições e quebra de linhas.",
        rules: ["90 min", "Impedimento via sensores", "5 substituições", "VAR em tempo real"],
        tactics: "Uso de Gegenpressing e amplitude lateral (4-3-3).",
        res: "Bolas com chips UWB e coletes GPS 10Hz.",
        quiz: [
            { q: "O que o VAR revisa oficialmente?", a: ["Laterais", "Gols e Pênaltis", "Escanteios"], c: 1 },
            { q: "Qual a duração padrão de uma partida?", a: ["45 min", "90 min", "60 min"], c: 1 }
        ]
    },
    "Ping Pong": {
        how: "Rebater a bola sobre a rede com efeito Magnus (Spin).",
        rules: ["Sets de 11 pontos", "Saque deve subir 16cm", "Mesa não pode ser tocada"],
        tactics: "Estilos Attacker e Chopper.",
        res: "Borrachas tencionadas e sensores de borda.",
        quiz: [{ q: "Quantos pontos ganham um set?", a: ["11", "21", "15"], c: 0 }]
    },
    // Basquete e Vôlei seguem a mesma estrutura de quiz...
};

const timesData = {
    "Flamengo": {
        fund: "1895 (Remo), 1912 (Futebol)",
        hist: "O clube mais popular do Brasil, nascido nas águas do Rio de Janeiro.",
        titulos: "Mundial (1981), 3 Libertadores, 8 Brasileiros.",
        idolo: "Zico (O Galinho de Quintino)."
    },
    "Palmeiras": {
        fund: "1914 (Palestra Italia)",
        hist: "Academia de Futebol, conhecido pela técnica refinada e força institucional.",
        titulos: "3 Libertadores, 12 Brasileiros, 4 Copas do Brasil.",
        idolo: "Ademir da Guia (O Divino)."
    },
    "Santos": {
        fund: "1912",
        hist: "O time que parou guerras e revelou o Rei do Futebol.",
        titulos: "2 Mundiais, 3 Libertadores, 8 Brasileiros.",
        idolo: "Pelé (O Rei)."
    }
};

let roteiro = [];
let esporteAtivo = "";

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user) { document.getElementById('user-display').innerText = user.toUpperCase(); showScreen('screen-selection'); }
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp); el.classList.add('selected');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
        list.innerHTML += `<li>Módulo ${roteiro.length}: ${esp}</li>`;
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
        btn.className = "neon-btn";
        btn.style.width = "100%"; btn.style.margin = "5px 0";
        btn.onclick = () => {
            if(i === qData.c) {
                alert("CONHECIMENTO VALIDADO!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('section-quiz').classList.add('hidden');
                    document.getElementById('section-team').classList.remove('hidden');
                } else { alert("Módulo finalizado."); carregarEstudo(esporteAtivo); }
            } else alert("RESPOSTA INCORRETA. RELEIA A TEORIA.");
        };
        optDiv.appendChild(btn);
    });
}

function exibirDadosTime() {
    const time = document.getElementById('team-selector').value;
    const res = document.getElementById('team-result');
    if(time) {
        const t = timesData[time];
        res.style.display = "block";
        res.innerHTML = `
            <h3>${time.toUpperCase()}</h3>
            <p><b>HISTÓRIA:</b> ${t.hist}</p>
            <p><b>FUNDAÇÃO:</b> ${t.fund}</p>
            <p><b>TÍTULOS:</b> ${t.titulos}</p>
            <p><b>MAIOR ÍDOLO:</b> ${t.idolo}</p>
        `;
    }
}
