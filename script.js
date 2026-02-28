const DB = {
    "Futebol": {
        how: "Jogo coletivo em campo gramado. Objetivo: Gol.",
        rules: "90 min, Impedimento, VAR, 11 contra 11.",
        tactic: "4-3-3 ofensivo ou 5-4-1 retranca.",
        tech: "GPS, Sensores de impacto e análise de vídeo.",
        quiz: { q: "Qual a regra revisada pelo vídeo?", o: ["Escanteio", "VAR", "Lateral"], c: 1 }
    }
};

const TIMES = {
    "Flamengo": { f: "1895", h: "Nascido no remo.", t: "Mundial, 3 Liberta.", i: "Zico", fund: "Remadores do Rio" },
    "Palmeiras": { f: "1914", h: "Antigo Palestra Itália.", t: "12 Brasileiros.", i: "Ademir", fund: "Italianos" }
};

let selecionados = [];
let atual = "";

// FUNÇÃO MESTRE DE TROCA DE PÁGINA
function navega(idDaTela) {
    document.querySelectorAll('section').forEach(s => s.classList.replace('area-visivel', 'area-oculta'));
    const destino = document.getElementById(idDaTela);
    destino.classList.remove('area-oculta');
    destino.classList.add('area-visivel');
}

function registrar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u && p) { localStorage.setItem(u, p); alert("CADASTRADO!"); }
}

function logar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(localStorage.getItem(u) === p) navega('tela-selecao');
    else alert("ERRO DE LOGIN!");
}

function selecionar(esp, el) {
    if(!selecionados.includes(esp)) {
        selecionados.push(esp);
        el.classList.add('ativo');
        document.getElementById('btn-gerar').classList.replace('area-oculta', 'area-visivel');
        document.getElementById('txt-selecionados').innerText = selecionados.join(' | ');
    }
}

function irParaWorkspace() {
    navega('tela-workspace');
    const menu = document.getElementById('lista-menu');
    menu.innerHTML = "";
    selecionados.forEach(s => {
        const b = document.createElement('button');
        b.innerText = s;
        b.style.width = "100%";
        b.onclick = () => carregarEstudo(s);
        menu.appendChild(b);
    });
    carregarEstudo(selecionados[0]);
}

function carregarEstudo(s) {
    atual = s;
    const d = DB[s];
    document.getElementById('secao-estudo').classList.remove('area-oculta');
    document.getElementById('secao-quiz').classList.add('area-oculta');
    document.getElementById('secao-time').classList.add('area-oculta');
    
    document.getElementById('tit-esporte').innerText = s;
    document.getElementById('res-how').innerText = d.how;
    document.getElementById('res-rules').innerText = d.rules;
    document.getElementById('res-tactic').innerText = d.tactic;
    document.getElementById('res-tech').innerText = d.tech;
}

function abrirQuiz() {
    document.getElementById('secao-estudo').classList.add('area-oculta');
    document.getElementById('secao-quiz').classList.remove('area-oculta');
    const q = DB[atual].quiz;
    document.getElementById('pergunta-txt').innerText = q.q;
    const box = document.getElementById('opcoes-quiz');
    box.innerHTML = "";
    q.o.forEach((opt, i) => {
        const b = document.createElement('button');
        b.innerText = opt;
        b.style.display = "block"; b.style.width = "100%";
        b.onclick = () => {
            if(i === q.c) {
                alert("ACESSO AO DOSSIÊ!");
                if(atual === "Futebol") {
                    document.getElementById('secao-quiz').classList.add('area-oculta');
                    document.getElementById('secao-time').classList.remove('area-oculta');
                } else carregarEstudo(atual);
            } else alert("ERROU!");
        };
        box.appendChild(b);
    });
}

function mostrarDadosTime() {
    const t = document.getElementById('select-time').value;
    const d = TIMES[t];
    if(d) {
        document.getElementById('dados-time').innerHTML = `<h3>${t}</h3><p><b>FUNDAÇÃO:</b> ${d.f}</p><p><b>HISTÓRIA:</b> ${d.h}</p><p><b>TÍTULOS:</b> ${d.t}</p><p><b>ÍDOLO:</b> ${d.i}</p><p><b>FUNDADOR:</b> ${d.fund}</p>`;
    }
}
