const database = {
    "Futebol": {
        origin: "Origem: Reino Unido (1863) | Regulação: FIFA & IFAB",
        how: "Disputado em campo de 100x75m. O jogo é dividido em 4 fases críticas: Organização Ofensiva, Transição Defensiva, Organização Defensiva e Transição Ofensiva. O objetivo é a progressão através de 'triangulações' e 'quebra de linhas' para atingir a zona de finalização (Box). Exige coordenação motora de alta precisão e visão espacial constante.",
        rules: [
            "Duração: 90min (2 tempos de 45) + Acréscimos precisos (Padrão 2026).",
            "Impedimento: Atacante à frente do penúltimo defensor no momento do passe.",
            "VAR: Rastreamento de 29 pontos de dados de cada jogador 50 vezes por segundo.",
            "Gols: A bola deve cruzar 100% da linha de meta sob o travessão."
        ],
        tactics: "As formações variam entre o 4-3-3 (largura com pontas), 3-4-3 (superioridade central) e o 4-2-3-1. Conceitos como 'Gegenpressing' e 'Overload' são fundamentais.",
        res: "Bolas com chips UWB, coletes de GPS 10Hz, chuteiras de fibra de carbono e gramados híbridos inteligentes."
    },
    "Ping Pong": {
        origin: "Origem: Inglaterra (Vitoriana) | Regulação: ITTF",
        how: "Jogo de altíssima frequência cardíaca. Baseia-se na física da rotação (Magnus Effect). O atleta deve ler o ângulo da raquete adversária em milissegundos para neutralizar o 'Topspin' ou 'Backspin'.",
        rules: [
            "Sets de 11 pontos (vence por 2 de vantagem).",
            "Saque: Lançado verticalmente a 16cm da palma aberta.",
            "Expedite System: Ativado se um set durar mais de 10 minutos."
        ],
        tactics: "Estilos Shakehand e Penhold. Foco em 'Third-ball attack' e transições de forehand/backhand.",
        res: "Borrachas de Spring Sponge, colas booster e mesas com sensores piezoelétricos de borda."
    },
    "Basquete": {
        origin: "Origem: EUA (1891) | Regulação: FIBA / NBA",
        how: "Dinâmica de transição constante. Exige 'Footwork' para criar separação defensiva. O jogo é pautado pela eficiência de arremessos (True Shooting) e controle de rebotes.",
        rules: [
            "Relógio de Posse: 24 segundos (reseta para 14 em rebote ofensivo).",
            "Violações de Tempo: 3s no garrafão, 5s para repor, 8s para cruzar o meio.",
            "Pontuação: 1 (Lance Livre), 2 (Área), 3 (Fora do Arco)."
        ],
        tactics: "Pick and Roll, Isolation e Zone Defense. O uso do 'Stretch Four' para abrir a defesa.",
        res: "Sensores ShotTracker, pisos flutuantes cinéticos e tecidos de compressão infravermelhos."
    },
    "Vôlei": {
        origin: "Origem: EUA (1895) | Regulação: FIVB",
        how: "Esporte de interdependência total. O ciclo é 'Recepção-Levantamento-Ataque'. O objetivo é explorar 'zonas de conflito' entre defensores adversários.",
        rules: [
            "Sets de 25 pontos (Tie-break 15). Rally Point System.",
            "Líbero: Especialista defensivo proibido de sacar ou atacar acima da rede.",
            "Toques: 3 permitidos (bloqueio não conta na regra FIVB)."
        ],
        tactics: "Sistema 5-1 com levantador especializado. Uso de 'Pipe' e 'Float Serve' para quebrar a recepção.",
        res: "Video Check de alta velocidade (120fps), sensores de rede e bolas com micro-alvéolos aerodinâmicos."
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
    document.getElementById('auth-title').innerText = isLoginMode ? "ENTRAR" : "CRIAR CONTA";
    document.getElementById('btn-auth').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
    document.getElementById('toggle-text').innerHTML = isLoginMode ? "VOLTAR PARA <span class='neon'>CADASTRO</span>" : "JÁ POSSUI ACESSO? <span class='neon'>ENTRAR</span>";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value.trim();
    const pass = document.getElementById('pass-input').value.trim();
    if(!user || !pass) return alert("Preencha todos os campos!");

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            document.getElementById('user-display').innerText = user.toUpperCase();
            showScreen('screen-selection');
        } else alert("Credenciais Incorretas!");
    } else {
        localStorage.setItem(user, pass);
        alert("Conta Criada! Mude para Entrar.");
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
        btn.style = "width:100%; padding:15px; background:#111; color:cyan; border:1px solid #333; margin-top:5px; cursor:pointer;";
        btn.onclick = () => carregarEstudo(esp);
        nav.appendChild(btn);
    });
    carregarEstudo(roteiro[0]);
}

function carregarEstudo(esp) {
    const d = database[esp];
    document.getElementById('study-title').innerText = esp.toUpperCase();
    document.getElementById('sport-origin').innerText = d.origin;
    document.getElementById('text-how').innerText = d.how;
    document.getElementById('text-tactics').innerText = d.tactics;
    document.getElementById('text-resources').innerText = d.res;
    const list = document.getElementById('list-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}
