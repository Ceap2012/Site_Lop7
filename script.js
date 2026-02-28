const BANCO_DADOS = {
    "Futebol": {
        how: "Condução da bola em campo gramado para finalização no gol.",
        rules: "90 minutos, VAR ativo, 11 jogadores, impedimento.",
        tactic: "Sistema 4-3-3 com foco em infiltração pelas pontas.",
        tech: "Microchips na bola e rastreamento GPS em tempo real.",
        quiz: { p: "Qual tecnologia revisa lances de gol e pênalti?", o: ["Árbitro reserva", "VAR", "Cronômetro"], c: 1 }
    },
    "Basquete": {
        how: "Arremesso da bola em cesta suspensa a 3,05 metros.",
        rules: "24 segundos de posse, 4 quartos, limite de faltas.",
        tactic: "Pick and roll e jogadas ensaiadas de perímetro.",
        tech: "Sensores de pressão no aro e análise biométrica.",
        quiz: { p: "Quanto tempo dura a posse de bola?", o: ["14s", "24s", "30s"], c: 1 }
    }
};

const DADOS_TIMES = {
    "Flamengo": { f: "1895", h: "Maior torcida do país, ícone do Maracanã.", t: "Mundial 1981, 3 Libertadores.", i: "Zico", fund: "Grupo de remadores do Rio." },
    "Palmeiras": { f: "1914", h: "Academia de Futebol, fundado por italianos.", t: "12 Brasileiros, 3 Libertadores.", i: "Ademir da Guia", fund: "Luigi Cervo e Vicenzo Ragognetti." },
    "Santos": { f: "1912", h: "Time que revelou Pelé e parou guerras.", t: "2 Mundiais, 3 Libertadores.", i: "Pelé", fund: "Raimundo Marques e Mário Ferraz." }
};

let selecionados = [];
let esporteAtual = "";

// SISTEMA DE NAVEGAÇÃO (BOTÕES FUNCIONAREM)
function navegarPara(idTela) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(idTela).classList.add('active');
}

function cadastrar() {
    const u = document.getElementById('user-id').value;
    const p = document.getElementById('pass-id').value;
    if(u && p) { localStorage.setItem(u, p); alert("DADOS REGISTRADOS!"); }
}

function logar() {
    const u = document.getElementById('user-id').value;
    const p = document.getElementById('pass-id').value;
    if(localStorage.getItem(u) === p) navegarPara('tela-selecao');
    else alert("ACESSO NEGADO!");
}

function selecionar(esp, elemento) {
    if(!selecionados.includes(esp)) {
        selecionados.push(esp);
        elemento.classList.add('selected');
        document.getElementById('btn-ir-work').classList.remove('hidden');
        document.getElementById('msg-selecao').innerText = "SELECIONADOS: " + selecionados.join(' | ');
    }
}

function montarDashboard() {
    navegarPara('tela-workspace');
    const menu = document.getElementById('lista-esportes-nav');
    menu.innerHTML = "";
    selecionados.forEach(esp => {
        const b = document.createElement('button');
        b.innerText = esp;
        b.style.width = "100%";
        b.onclick = () => carregarModulo(esp);
        menu.appendChild(b);
    });
    carregarModulo(selecionados[0]);
}

function carregarModulo(esp) {
    esporteAtual = esp;
    document.getElementById('view-estudo').classList.remove('hidden');
    document.getElementById('view-quiz').classList.add('hidden');
    document.getElementById('view-times').classList.add('hidden');
    
    const d = BANCO_DADOS[esp];
    document.getElementById('tit-modulo').innerText = esp;
    document.getElementById('d-how').innerText = d.how;
    document.getElementById('d-rules').innerText = d.rules;
    document.getElementById('d-tactic').innerText = d.tactic;
    document.getElementById('d-tech').innerText = d.tech;
}

function irParaQuiz() {
    document.getElementById('view-estudo').classList.add('hidden');
    document.getElementById('view-quiz').classList.remove('hidden');
    const q = BANCO_DADOS[esporteAtual].quiz;
    document.getElementById('pergunta-display').innerText = q.p;
    const container = document.getElementById('opcoes-container');
    container.innerHTML = "";
    q.o.forEach((opt, i) => {
        const b = document.createElement('button');
        b.innerText = opt;
        b.style.display = "block"; b.style.width = "100%";
        b.onclick = () => {
            if(i === q.c) {
                alert("CONHECIMENTO VALIDADO!");
                if(esporteAtual === "Futebol") {
                    document.getElementById('view-quiz').classList.add('hidden');
                    document.getElementById('view-times').classList.remove('hidden');
                } else carregarModulo(esporteAtual);
            } else alert("ERRO NA RESPOSTA. REVISE.");
        };
        container.appendChild(b);
    });
}

function mostrarInfoTime() {
    const t = document.getElementById('select-clube').value;
    const out = document.getElementById('detalhes-time');
    if(t && DADOS_TIMES[t]) {
        const d = DADOS_TIMES[t];
        out.innerHTML = `<h3>${t.toUpperCase()}</h3><p><b>FUNDADORES:</b> ${d.fund}</p><p><b>HISTÓRIA:</b> ${d.h}</p><p><b>TÍTULOS:</b> ${d.t}</p><p><b>ÍDOLO:</b> ${d.i}</p>`;
    }
}
