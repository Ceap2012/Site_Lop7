const database = {
    "Futebol": {
        origin: "Origem: Inglaterra, Século XIX | Órgão: FIFA",
        how: "Disputado em campo de 100-110m. O objetivo é a progressão da posse de bola através de passes triangulares e infiltrações nas zonas de finalização (Box). Em 2026, o jogo é focado em transições rápidas e pressão alta (Gegenpressing).",
        rules: [
            "Partida: 2 tempos de 45 min (+ acréscimos).",
            "Gols: Bola deve ultrapassar totalmente a linha.",
            "Impedimento: Atacante à frente do último defensor no passe.",
            "VAR: Revisão de gols, pênaltis, vermelhos e erro de identidade."
        ],
        tactics: "As formações variam entre o clássico 4-4-2, o ofensivo 4-3-3 e o equilibrado 3-5-2. Cada jogador possui um 'Heat Map' (mapa de calor) que dita sua zona de atuação primária.",
        res: "Bolas com microchips de 500Hz, coletes de monitoramento cardíaco/GPS, e chuteiras de tração adaptativa ao gramado."
    },
    "Ping Pong": {
        origin: "Origem: Inglaterra (Vitoriana) | Órgão: ITTF",
        how: "Esporte de raquetes de alta velocidade. O foco é gerar 'Spin' (rotação) na bola (Topspin, Backspin e Sidespin) para dificultar a recepção do oponente em uma mesa de 2,74m.",
        rules: [
            "Partida: Melhor de 5 ou 7 sets de 11 pontos.",
            "Saque: A bola deve subir no mínimo 16cm da palma da mão.",
            "Let: Saque que toca a rede e cai no campo adversário (repete)."
        ],
        tactics: "Estilos variam entre 'Attacker' (ataque rápido perto da mesa) e 'Chopper' (defesa com muito efeito cortado longe da mesa).",
        res: "Borrachas tencionadas de 2.1mm, colas à base de água e bolas de plástico ABS não inflamável."
    },
    "Basquete": {
        origin: "Origem: EUA, 1891 (James Naismith) | Órgão: FIBA/NBA",
        how: "Jogo de alta pontuação em quadra de 28m. Exige coordenação motora fina para arremessos e força explosiva para infiltrações e rebotes.",
        rules: [
            "Pontuação: 1 ponto (Lance Livre), 2 pontos (Área), 3 pontos (Fora do Arco).",
            "Violações: 'Walking' (andar sem driblar), 'Double Dribble'.",
            "Faltas: 5 faltas individuais excluem o jogador (FIBA)."
        ],
        tactics: "Sistemas como 'Pick and Roll', Defesa por Zona ou Individual. O pivô controla o garrafão enquanto os armadores ditam o ritmo do perímetro.",
        res: "Aros retráteis (Breakaway rims), sensores de 24 segundos e tecnologia de amortecimento Air/Zoom nos calçados."
    },
    "Vôlei": {
        origin: "Origem: EUA, 1895 (William Morgan) | Órgão: FIVB",
        how: "Esporte de não-contato onde a bola não pode tocar o chão. Baseado no ciclo: Recepção -> Levantamento -> Ataque (Cortada).",
        rules: [
            "Sets: Vence quem ganha 3 sets de 25 pontos.",
            "Toques: Máximo de 3 toques (Bloqueio não conta na maioria das ligas).",
            "Líbero: Especialista defensivo que usa uniforme de cor diferente."
        ],
        tactics: "Sistema 5-1 (um levantador) ou 4-2. Posicionamento em quadra segue uma numeração de 1 a 6 para o rodízio obrigatório de saque.",
        res: "Pisos flutuantes de madeira ou polímero, antenas limitadoras de rede e sistemas de 'Challenge' por câmera de alta velocidade."
    }
};

let roteiro = [];
let isLoginMode = false;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function alternarModo() { isLoginMode = !isLoginMode; document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN" : "CADASTRO"; }

function gerenciarAcesso() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;
    if(isLoginMode) {
        if(localStorage.getItem(u) === p) { document.getElementById('user-display').innerText = u; showScreen('screen-selection'); }
        else alert("Erro");
    } else {
        localStorage.setItem(u, p); alert("Cadastrado!"); alternarModo();
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

function abrirWorkspace() {
    showScreen('screen-workspace');
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = "";
    roteiro.forEach(esp => {
        const btn = document.createElement('button');
        btn.innerText = esp.toUpperCase();
        btn.style = "width:100%; padding:12px; background:#111; color:cyan; border:1px solid #333; margin-top:5px; cursor:pointer;";
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
