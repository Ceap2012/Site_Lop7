const database = {
    "Futebol": {
        origin: "Origem: Reino Unido | Regulação: FIFA (International Board)",
        how: "Disputado em campo retangular. O objetivo é a progressão coletiva da bola até o gol adversário sem o uso das mãos. O jogo moderno baseia-se em zonas de pressão e controle de posse em 1/3 do campo.",
        rules: [
            "Partida dividida em dois tempos de 45 minutos.",
            "Impedimento: Atacante à frente do penúltimo defensor no momento do passe.",
            "Substituições: Atualmente permitidas até 5 janelas.",
            "Gols: Bola deve cruzar 100% da linha de meta."
        ],
        tactics: "As táticas modernas incluem o 4-3-3 ofensivo, o 4-4-2 em bloco baixo e o 3-4-3 com alas agressivos. O 'Heat Map' (mapa de calor) define a eficácia do posicionamento.",
        res: "VAR (Árbitro de Vídeo), Chuteiras com sensor de tração, Bolas com chips de 500Hz e Coletes de GPS/Monitoramento Cardíaco."
    },
    "Ping Pong": {
        origin: "Origem: Inglaterra (Mesa Inglesa) | Regulação: ITTF",
        how: "Jogo de raquetes sobre mesa dividida por uma rede. Foco total em 'Spin' (rotação) e velocidade de reação em frações de segundo.",
        rules: [
            "Sets disputados até 11 pontos (deve haver 2 de vantagem).",
            "Saque deve quicar uma vez em cada lado da mesa.",
            "Não é permitido tocar na superfície da mesa com a mão livre."
        ],
        tactics: "Uso de 'Looping' (ataque rápido com spin) e 'Chopping' (defesa cortada). O posicionamento lateral é crucial para cobrir os ângulos da mesa.",
        res: "Raquetes de madeira/carbono, Borrachas tencionadas e Mesas de alta densidade com sensores de borda."
    },
    "Basquete": {
        origin: "Origem: EUA (1891) | Regulação: FIBA / NBA",
        how: "Objetivo é introduzir a bola no cesto adversário a 3,05m de altura. Exige coordenação explosiva e drible constante para movimentação.",
        rules: [
            "Posses de bola limitadas a 24 segundos.",
            "Passos: Não se pode dar mais de 2 passos sem quicar a bola.",
            "Faltas: 5 a 6 faltas individuais excluem o atleta."
        ],
        tactics: "Estratégias de 'Pick and Roll', defesa individual ou por zona. Pivôs controlam o garrafão enquanto alas focam no perímetro de 3 pontos.",
        res: "Aros retráteis (Breakaway), Bolas de material sintético de alta aderência e Placar Eletrônico de Precisão."
    },
    "Vôlei": {
        origin: "Origem: EUA (1895) | Regulação: FIVB",
        how: "Jogo de recepção e ataque sobre rede alta. A bola não pode tocar o solo e o contato físico com o adversário é nulo.",
        rules: [
            "Máximo de 3 toques por equipe antes de passar a rede.",
            "Rotação obrigatória de posições a cada saque ganho.",
            "Sets de 25 pontos (Tie-break de 15 pontos)."
        ],
        tactics: "Sistema 5-1 com levantador especializado. Posicionamento tático defensivo baseado em 'diagonal' e 'paralela' no bloqueio.",
        res: "Antenas de delimitação, Piso de polímero de impacto e Sistema de Challenge por câmeras de 120fps."
    }
};

let roteiro = [];
let isLoginMode = false;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function alternarModo() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "ENTRAR NO HUB" : "CRIAR CONTA";
    document.getElementById('btn-auth').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;
    if(!user || !pass) return alert("Preencha os campos!");

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            document.getElementById('user-display').innerText = user.toUpperCase();
            showScreen('screen-selection');
        } else alert("Acesso negado.");
    } else {
        localStorage.setItem(user, pass);
        alert("Cadastrado! Mude para Entrar.");
        alternarModo();
    }
}

function adicionarAoRoteiro(esp, el) {
    if (!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        const list = document.getElementById('display-roteiro');
        if (roteiro.length === 1) list.innerHTML = "";
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
        btn.style = "width:100%; padding:15px; margin-top:5px; background:#111; color:cyan; border:1px solid #333; cursor:pointer;";
        btn.onclick = () => carregarDossie(esp);
        nav.appendChild(btn);
    });
    carregarDossie(roteiro[0]);
}

function carregarDossie(esp) {
    const data = database[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('sport-origin').innerText = data.origin;
    document.getElementById('text-how').innerText = data.how;
    document.getElementById('text-tactics').innerText = data.tactics;
    document.getElementById('text-resources').innerText = data.res;
    const rulesUI = document.getElementById('list-rules');
    rulesUI.innerHTML = "";
    data.rules.forEach(r => rulesUI.innerHTML += `<li>${r}</li>`);
}
