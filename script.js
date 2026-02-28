const database = {
    "Futebol": {
        how: "Domínio de campo e progressão em zonas. O objetivo é a finalização técnica no arco adversário.",
        rules: ["Partida: 90min", "VAR: Decisões por IA", "Substituições: 5 janelas", "Linha de Meta: 100% de cruzamento"],
        tactics: "Sistema 4-3-3 com transições agressivas (Gegenpressing).",
        res: "Rastreamento corporal via sensores UWB e bolas inteligentes.",
        quiz: [{ q: "Qual a regra principal para o gol ser validado?", a: ["Cruzamento parcial da linha", "Bola tocar na rede", "Cruzamento de 100% da linha"], c: 2 }]
    },
    "Ping Pong": {
        how: "Troca rápida de bola com aplicação de efeito Magnus (Spin).",
        rules: ["Sets de 11", "Vantagem de 2", "Serviço visível de 16cm"],
        tactics: "Ataque rápido de 3ª bola.",
        res: "Borrachas de alta fricção molecular.",
        quiz: [{ q: "Qual a altura mínima do lançamento do saque?", a: ["10cm", "16cm", "20cm"], c: 1 }]
    }
};

const timesData = {
    "Flamengo": { hist: "Nascido no remo, tornou-se a maior potência do futebol brasileiro.", fund: "1895", tits: "Mundial, 3 Libertadores, 8 Brasileiros", idolo: "Zico" },
    "Palmeiras": { hist: "A Academia de Futebol, sinônimo de técnica e organização.", fund: "1914", tits: "3 Libertadores, 12 Brasileiros", idolo: "Ademir da Guia" },
    "Santos": { hist: "O palco do Rei Pelé e o time que parou guerras pelo mundo.", fund: "1912", tits: "2 Mundiais, 3 Libertadores", idolo: "Pelé" },
    "São Paulo": { hist: "Primeiro brasileiro Tri-Mundial e referência de infraestrutura.", fund: "1930", tits: "3 Mundiais, 3 Libertadores", idolo: "Rogério Ceni" }
};

let roteiro = [];
let esporteAtivo = "";

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    if(user) showScreen('screen-selection');
    else alert("IDENTIFICAÇÃO NECESSÁRIA");
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-iniciar').classList.remove('hidden');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
        list.innerHTML = `MÓDULOS CARREGADOS: ${roteiro.join(' | ')}`;
    }
}

function abrirWorkspace() {
    showScreen('screen-workspace');
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp.toUpperCase();
        btn.className = "main-btn"; btn.style.width = "100%"; btn.style.marginBottom = "10px";
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
        btn.className = "main-btn"; btn.style.width = "100%"; btn.style.margin = "5px 0";
        btn.onclick = () => {
            if(i === qData.c) {
                alert("APTIDÃO CONFIRMADA!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('section-quiz').classList.add('hidden');
                    document.getElementById('section-team').classList.remove('hidden');
                } else carregarEstudo(esporteAtivo);
            } else alert("DADOS INCORRETOS. REVISE A TEORIA.");
        };
        optDiv.appendChild(btn);
    });
}

function exibirDadosTime() {
    const time = document.getElementById('team-selector').value;
    const res = document.getElementById('team-result');
    if(time && timesData[time]) {
        const t = timesData[time];
        res.innerHTML = `<h3>${time}</h3><p>${t.hist}</p><p><b>FUNDAÇÃO:</b> ${t.fund}</p><p><b>TÍTULOS:</b> ${t.tits}</p><p><b>ÍDOLO:</b> ${t.idolo}</p>`;
        res.style.display = "block";
    }
}
