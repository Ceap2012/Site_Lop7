const database = {
    "Futebol": {
        how: "Conduza a bola ao gol adversário usando os pés em um campo gramado.",
        rules: ["11 jogadores", "90 minutos", "Impedimento tecnológico", "Faltas e Cartões"],
        res: "Bolas com sensores, Chuteiras Biométricas e VAR 2026."
    },
    "Ping Pong": {
        how: "Rebata a bola na mesa para o lado adversário.",
        rules: ["11 pontos para ganhar", "Saque alterna a cada 2", "Mesa não pode ser tocada"],
        res: "Raquetes de Carbono e Sensores de Borda."
    },
    "Basquete": {
        how: "Arremesse a bola no aro adversário.",
        rules: ["5 jogadores", "Drible obrigatório", "Posse de 24s"],
        res: "Aro Digital e Tênis de Performance."
    },
    "Vôlei": {
        how: "Jogue a bola por cima da rede para o chão adversário.",
        rules: ["3 toques por time", "Rotação de jogadores", "Set de 25 pontos"],
        res: "Redes de fibra ótica e bolas texturizadas."
    }
};

let roteiro = [];
let isLoginMode = false;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function alternarModo() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN" : "CRIAR CONTA";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            document.getElementById('user-display').innerText = user;
            showScreen('screen-selection'); // TROCA PARA SELEÇÃO
        } else alert("Erro de Login");
    } else {
        localStorage.setItem(user, pass);
        alert("Cadastrado! Mude para Login.");
        alternarModo();
    }
}

function adicionarAoRoteiro(esp, el) {
    if (!roteiro.includes(esp)) {
        roteiro.push(esp);
        el.classList.add('selected');
        const list = document.getElementById('display-roteiro');
        if (roteiro.length === 1) list.innerHTML = "";
        list.innerHTML += `<li>${roteiro.length}º - ${esp}</li>`;
        document.getElementById('btn-iniciar').classList.remove('hidden');
    }
}

function abrirWorkspace() {
    showScreen('screen-workspace'); // TROCA PARA AREA DE TRABALHO
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp;
        btn.style.cssText = "width:100%; padding:10px; margin-top:10px; background:#222; color:cyan; border:1px solid #444; cursor:pointer;";
        btn.onclick = () => carregarConteudo(esp);
        nav.appendChild(btn);
    });
    carregarConteudo(roteiro[0]);
}

function carregarConteudo(esp) {
    const d = database[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-resources').innerText = d.res;
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}
