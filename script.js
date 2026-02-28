const ESPORTES = {
    "Futebol": {
        how: "Jogo de invasão em campo gramado. Objetivo: Marcar gols.",
        rules: "90 min, Impedimento, VAR, 11 vs 11.",
        tactic: "4-3-3 Ofensivo, Gegenpressing, Linhas altas.",
        tech: "GPS, Telemetria, Análise de vídeo em tempo real.",
        quiz: { q: "Quantos jogadores cada time tem em campo?", a: ["7", "11", "15"], c: 1 }
    }
};

const TIMES = {
    "Flamengo": { f: "1895", h: "Nascido no remo, virou a maior torcida do mundo.", t: "Mundial 1981, 3 Libertadores.", i: "Zico", fund: "Grupo de remadores do bairro do Flamengo." },
    "Palmeiras": { f: "1914", h: "Fundado por imigrantes italianos como Palestra Itália.", t: "12 Brasileiros, 3 Libertadores.", i: "Ademir da Guia", fund: "Luigi Cervo e Vincenzo Ragognetti." }
};

let selecionados = [];
let esporteAtivo = "";

// NAVEGAÇÃO DE PÁGINAS
function mudarPagina(idPagina) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(idPagina).classList.add('active');
}

function salvarCadastro() {
    const u = document.getElementById('reg-user').value;
    const p = document.getElementById('reg-pass').value;
    if(u && p) { localStorage.setItem(u, p); alert("CADASTRO REALIZADO!"); }
}

function autenticar() {
    const u = document.getElementById('reg-user').value;
    const p = document.getElementById('reg-pass').value;
    if(localStorage.getItem(u) === p) mudarPagina('page-select');
    else alert("ACESSO NEGADO!");
}

function toggleSport(nome, el) {
    if(!selecionados.includes(nome)) {
        selecionados.push(nome);
        el.classList.add('selected');
        document.getElementById('btn-work').classList.remove('hidden');
        document.getElementById('txt-selecao').innerText = "SELECIONADOS: " + selecionados.join(', ');
    }
}

function irParaWorkspace() {
    mudarPagina('page-work');
    const nav = document.getElementById('nav-esportes');
    nav.innerHTML = "";
    selecionados.forEach(esp => {
        const b = document.createElement('button');
        b.innerText = esp.toUpperCase();
        b.style.width = "100%";
        b.onclick = () => carregarDados(esp);
        nav.appendChild(b);
    });
    carregarDados(selecionados[0]);
}

function carregarDados(esp) {
    esporteAtivo = esp;
    document.getElementById('sec-teoria').classList.remove('hidden');
    document.getElementById('sec-quiz').classList.add('hidden');
    document.getElementById('sec-time').classList.add('hidden');
    
    const d = ESPORTES[esp];
    document.getElementById('view-titulo').innerText = esp;
    document.getElementById('view-how').innerText = d.how;
    document.getElementById('view-rules').innerText = d.rules;
    document.getElementById('view-tactic').innerText = d.tactic;
    document.getElementById('view-tech').innerText = d.tech;
}

function abrirQuiz() {
    document.getElementById('sec-teoria').classList.add('hidden');
    document.getElementById('sec-quiz').classList.remove('hidden');
    const q = ESPORTES[esporteAtivo].quiz;
    document.getElementById('pergunta-txt').innerText = q.q;
    const box = document.getElementById('opcoes-quiz');
    box.innerHTML = "";
    q.a.forEach((opt, i) => {
        const b = document.createElement('button');
        b.innerText = opt;
        b.style.display = "block"; b.style.width = "100%";
        b.onclick = () => {
            if(i === q.c) {
                alert("SUCESSO!");
                if(esporteAtivo === "Futebol") {
                    document.getElementById('sec-quiz').classList.add('hidden');
                    document.getElementById('sec-time').classList.remove('hidden');
                } else carregarDados(esporteAtivo);
            } else alert("ERRO!");
        };
        box.appendChild(b);
    });
}

function exibirDossie() {
    const t = document.getElementById('select-time').value;
    const res = document.getElementById('dossie-resultado');
    if(t && TIMES[t]) {
        const d = TIMES[t];
        res.innerHTML = `<h3>${t}</h3><p><b>FUNDAÇÃO:</b> ${d.f}</p><p><b>HISTÓRIA:</b> ${d.h}</p><p><b>TÍTULOS:</b> ${d.t}</p><p><b>ÍDOLO:</b> ${d.i}</p><p><b>FUNDADORES:</b> ${d.fund}</p>`;
    }
}
