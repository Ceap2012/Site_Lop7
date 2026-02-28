const DB = {
    "Futebol": {
        how: "Objetivo: Colocar a bola no gol adversário sem usar mãos/braços.",
        rules: "90 min, Impedimento, VAR, 5 trocas.",
        tactic: "4-3-3 ofensivo, posse de bola e transição rápida.",
        tech: "Análise de calor, GPS 10Hz e bola com sensor de toque.",
        quiz: { q: "Qual a regra que revisa gols duvidosos?", o: ["Juiz de Linha", "VAR", "Quarto Árbitro"], c: 1 }
    },
    "Basquete": {
        how: "Converter a bola na cesta adversária a 3,05m de altura.",
        rules: "4 quartos, 24 segundos de posse, 5 faltas limite.",
        tactic: "Pick and Roll e marcação pressão.",
        tech: "Sensores de aro e monitoramento de fadiga.",
        quiz: { q: "Quantos segundos de posse de bola?", o: ["14", "24", "30"], c: 1 }
    }
};

const TIMES = {
    "Flamengo": { f: "1895", h: "Maior torcida do Brasil.", t: "Mundial, 3 Liberta.", i: "Zico", fund: "Remadores do Rio" },
    "Palmeiras": { f: "1914", h: "Antigo Palestra Itália.", t: "12 Brasileiros, 3 Liberta.", i: "Ademir da Guia", fund: "Imigrantes Italianos" },
    "Santos": { f: "1912", h: "O time do Rei Pelé.", t: "2 Mundiais, 3 Liberta.", i: "Pelé", fund: "Três esportistas locais" }
};

let selecionados = [];
let atual = "";

// NAVEGAÇÃO
function irPara(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function registrar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u && p) { localStorage.setItem(u, p); alert("CADASTRADO COM SUCESSO!"); }
    else alert("PREENCHA OS CAMPOS!");
}

function logar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(localStorage.getItem(u) === p) irPara('tela-selecao');
    else alert("ACESSO NEGADO!");
}

function selecionar(esp, el) {
    if(!selecionados.includes(esp)) {
        selecionados.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-gerar').classList.remove('hidden');
        document.getElementById('status-txt').innerText = "SELECIONADOS: " + selecionados.join(' | ');
    }
}

function gerarWorkspace() {
    irPara('tela-work');
    const menu = document.getElementById('menu-lateral');
    menu.innerHTML = "<h3 class='neon-text'>MÓDULOS_</h3>";
    selecionados.forEach(s => {
        const btn = document.createElement('button');
        btn.innerText = s;
        btn.onclick = () => carregarConteudo(s);
        menu.appendChild(btn);
    });
    carregarConteudo(selecionados[0]);
}

function carregarConteudo(s) {
    atual = s;
    const d = DB[s];
    document.getElementById('content-estudo').classList.remove('hidden');
    document.getElementById('content-quiz').classList.add('hidden');
    document.getElementById('content-time').classList.add('hidden');
    
    document.getElementById('tit-esp').innerText = s;
    document.getElementById('p-how').innerText = d.how;
    document.getElementById('p-rules').innerText = d.rules;
    document.getElementById('p-tactic').innerText = d.tactic;
    document.getElementById('p-tech').innerText = d.tech;
}

function abrirQuiz() {
    document.getElementById('content-estudo').classList.add('hidden');
    document.getElementById('content-quiz').classList.remove('hidden');
    const q = DB[atual].quiz;
    document.getElementById('pergunta-txt').innerText = q.q;
    const optDiv = document.getElementById('quiz-options');
    optDiv.innerHTML = "";
    q.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style.display = "block"; btn.style.width = "100%";
        btn.onclick = () => {
            if(i === q.c) {
                alert("ACESSO AO DOSSIÊ LIBERADO!");
                if(atual === "Futebol") {
                    document.getElementById('content-quiz').classList.add('hidden');
                    document.getElementById('content-time').classList.remove('hidden');
                } else carregarConteudo(atual);
            } else alert("DADOS INCORRETOS. REVISE O CONTEÚDO.");
        };
        optDiv.appendChild(btn);
    });
}

function exibirTime() {
    const t = document.getElementById('select-time').value;
    const box = document.getElementById('time-data');
    if(t && TIMES[t]) {
        const d = TIMES[t];
        box.innerHTML = `<h3>${t.toUpperCase()}</h3><p><b>FUNDAÇÃO:</b> ${d.f}</p><p><b>HISTÓRIA:</b> ${d.h}</p><p><b>TÍTULOS:</b> ${d.t}</p><p><b>ÍDOLO:</b> ${d.i}</p><p><b>FUNDADOR:</b> ${d.fund}</p>`;
    }
}
