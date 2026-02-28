const database = {
    "Futebol": {
        origin: "Origem: Século XIX (Inglaterra) | Regulação: FIFA & IFAB | Evolução: Jogo de Posição Moderno.",
        how: "Disputado em campo de 100-110m. O jogo é dividido em 4 fases críticas: Organização Ofensiva, Transição Defensiva, Organização Defensiva e Transição Ofensiva. O objetivo é a progressão da posse através de 'triangulações' e 'quebra de linhas' para atingir a zona de finalização. Exige coordenação motora de alta precisão nos membros inferiores e visão periférica espacial constante.",
        rules: [
            "Duração: 90min (2 tempos de 45) + Acréscimos precisos baseados em paradas reais (Padrão 2026).",
            "Impedimento: Atacante à frente do penúltimo defensor (incluindo o goleiro) no momento do passe.",
            "VAR e Semi-Automated Offside: Rastreamento de 29 pontos de dados de cada jogador 50 vezes por segundo.",
            "Substituições: 5 janelas permitidas para manter a intensidade física alta (Gegenpressing).",
            "Infrações: Tiro livre direto para contatos físicos ilícitos e indireto para erros técnicos/disciplinares."
        ],
        tactics: "As formações modernas variam entre o 4-3-3 (foco em largura com pontas), o 3-4-3 (foco em alas e superioridade numérica central) e o 4-2-3-1 (uso de 'Shadow Striker'). Conceitos como 'Gegenpressing' (pressão imediata após perda) e 'Overload' (sobrecarga em flancos) são fundamentais para o sucesso tático contemporâneo.",
        res: "Bolas com chips UWB (Ultra-Wideband), coletes de GPS de alta frequência (10Hz+), chuteiras com fibra de carbono para retorno cinético e gramados híbridos com controle térmico subterrâneo."
    },
    "Ping Pong": {
        origin: "Origem: Reino Unido (Mesa Inglesa) | Regulação: ITTF | Foco: Dinâmica de Rotação Magnus.",
        how: "Jogo de altíssima frequência cardíaca e velocidade neural. Baseia-se na física da rotação (Spin). O atleta deve ler o ângulo da raquete adversária em milissegundos para neutralizar o 'Topspin', 'Backspin' ou 'Sidespin'. Exige explosão muscular curta e coordenação óculo-manual de elite.",
        rules: [
            "Pontuação: Jogos de 11 pontos; vitória por margem de 2. Partidas em melhor de 5 ou 7 sets.",
            "Serviço (Saque): A bola deve ser lançada verticalmente a 16cm da palma aberta e batida atrás da linha de fundo.",
            "Obstrução: Tocar na mesa com a mão livre ou mover a superfície resulta em perda de ponto automática.",
            "Expedite System: Ativado se um set durar mais de 10 minutos para acelerar a conclusão da partida.",
            "Equipamento: Borrachas devem ter aprovação ITTF (Selo LARC) para garantir fricção padronizada."
        ],
        tactics: "Estilos: 'Shakehand' (europeu) ou 'Penhold' (caneta). Estratégias de 'Third-ball attack' (finalização rápida após o saque) e uso de pino curto ou longo para inverter a rotação recebida.",
        res: "Borrachas com tecnologia 'Spring Sponge', colas de booster limitadas, e mesas com sensores de pressão piezoelétricos para detecção de 'Edge balls' (bolas de borda)."
    },
    "Basquete": {
        origin: "Origem: 1891 (EUA) | Regulação: FIBA & NBA | Tendência: Era do Espaçamento e 3 Pontos.",
        how: "Dinâmica de transição constante em quadra de 28m. Exige 'Footwork' (trabalho de pés) para criar separação defensiva. O jogo moderno é pautado pela eficiência de arremessos (True Shooting) e controle de rebotes para gerar segundas oportunidades de ataque.",
        rules: [
            "Tempos: 4 quartos de 10min (FIBA) ou 12min (NBA) com cronômetro parado em cada apito.",
            "Relógio de Posse: 24 segundos; reseta para 14 se a bola tocar o aro em rebote ofensivo.",
            "Violações de Tempo: 3 segundos no garrafão, 5 segundos para reposição, 8 segundos para cruzar o meio.",
            "Faltas: Coletivas levam ao 'Bônus' (lances livres automáticos após a 5ª falta da equipe no período).",
            "Goaltending: Interferência ilegal na trajetória descendente da bola acima do aro."
        ],
        tactics: "Estratégia 'Pick and Roll' (bloqueio e continuação), 'Isolation' (isolamento de craques) e 'Zone Defense' (2-3 ou 3-2). O uso do 'Stretch Four' (ala-pivô com chute longo) para abrir a defesa.",
        res: "Sensores de arco (ShotTracker), pisos flutuantes para absorção de impacto cinético, e tecidos de compressão infravermelhos para recuperação muscular intra-jogo."
    },
    "Vôlei": {
        origin: "Origem: 1895 (EUA) | Regulação: FIVB | Estilo: Vôlei de Potência e Especialização.",
        how: "Esporte de interdependência total. O ciclo fundamental é 'Recepção-Levantamento-Ataque'. O objetivo é explorar 'zonas de conflito' entre defensores e utilizar o bloqueio como arma ofensiva para amortecer e contra-atacar.",
        rules: [
            "Pontuação: Rally Point System (toda bola vale ponto) até 25 pontos (exceto Tie-break até 15).",
            "Posicionamento: 6 zonas fixas; jogadores devem respeitar o rodízio no momento do golpe de saque.",
            "Toques: 3 toques permitidos; o toque no bloqueio não conta como toque da equipe (Regra FIVB).",
            "Líbero: Especialista defensivo com trocas ilimitadas; proibido de sacar ou atacar acima da rede.",
            "Challenge System: Revisão eletrônica para toques na rede, bola 'In/Out' e toque no bloqueio."
        ],
        tactics: "Sistemas 5-1 (1 levantador) ou 6-2. O 'Pipe' (ataque de fundo pela posição 6) e o 'Float Serve' (saque flutuante) são as armas principais para quebrar a estratégia defensiva adversária.",
        res: "Antenas de delimitação flexíveis, pisos de polímero responsivo, joelheiras de gel de alta densidade e bolas com micro-alvéolos para estabilidade aerodinâmica."
    }
};

let roteiro = []; let isLoginMode = false;

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
        else alert("Credenciais Incorretas");
    } else {
        localStorage.setItem(u, p); alert("Cadastrado!"); alternarModo();
    }
}

function adicionarAoRoteiro(esp, el) {
    if(!roteiro.includes(esp)) {
        roteiro.push(esp); el.classList.add('selected');
        const list = document.getElementById('display-roteiro');
        if(roteiro.length === 1) list.innerHTML = "";
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
