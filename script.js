const db = {
    "Futebol": {
        how: "Disputado em campo retangular, o objetivo é conduzir a bola ao gol adversário apenas com os pés e tronco.",
        rules: ["11 jogadores por lado", "Duração: 90 min", "Impedimento assistido por IA", "Cartões Amarelo/Vermelho"],
        res: "Bola com sensor inercial, chuteiras inteligentes e VAR automático."
    },
    "Ping Pong": {
        how: "Tênis de mesa onde se rebate a bola sobre uma rede central em uma mesa rígida.",
        rules: ["Sets de 11 pontos", "Serviço alterna a cada 2 pontos", "A bola deve quicar uma vez de cada lado"],
        res: "Raquete de carbono, bolas de polímero e mesa com sensores de pressão."
    },
    "Basquete": {
        how: "O foco é encestar a bola no aro adversário a 3 metros de altura usando as mãos.",
        rules: ["5 jogadores ativos", "Limite de 24 segundos de posse", "Pontuações de 1, 2 e 3 pontos"],
        res: "Bola de alta aderência, tênis de propulsão e tabelas digitais."
    },
    "Vôlei": {
        how: "Enviar a bola por cima da rede para tocar o chão do oponente com no máximo 3 toques.",
        rules: ["6 jogadores por time", "Rodízio obrigatório", "Sets de 25 pontos (Tie-break 15)"],
        res: "Rede com sensores infravermelhos e bolas micro-texturizadas."
    }
};

let roteiro = []; let loginMode = false;

function alternarModo() {
    loginMode = !loginMode;
    document.getElementById('auth-title').innerText = loginMode ? "LOGIN" : "CRIAR CONTA";
    document.getElementById('btn-auth').innerText = loginMode ? "ENTRAR" : "CADASTRAR";
}

function gerenciarAcesso() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;
    if(!u || !p) return alert("Dados incompletos");

    if(loginMode) {
        if(localStorage.getItem(u) === p) {
            document.getElementById('screen-auth').classList.add('hidden');
            document.getElementById('screen-selection').classList.remove('hidden');
            document.getElementById('user-display').innerText = u.toUpperCase();
        } else alert("Acesso negado");
    } else {
        localStorage.setItem(u, p); alert("Cadastrado! Mude para entrar."); alternarModo();
    }
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp); el.classList.add('selected');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
        list.innerHTML += `<li>${roteiro.length}º - ${esp}</li>`;
        document.getElementById('btn-iniciar').classList.remove('hidden');
    }
}

function iniciarEstudo() {
    document.getElementById('screen-selection').classList.add('hidden');
    document.getElementById('screen-workspace').classList.remove('hidden');
    const nav = document.getElementById('side-menu');
    roteiro.forEach(esp => {
        nav.innerHTML += `<button onclick="carregarConteudo('${esp}')">${esp}</button>`;
    });
    carregarConteudo(roteiro[0]);
}

function carregarConteudo(esp) {
    const data = db[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = data.how;
    document.getElementById('text-resources').innerText = data.res;
    const rulesUI = document.getElementById('list-rules');
    rulesUI.innerHTML = "";
    data.rules.forEach(r => rulesUI.innerHTML += `<li>${r}</li>`);
}

function limparRoteiro() { location.reload(); }
