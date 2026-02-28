let isLoginMode = false;
let roteiro = [];
let esporteAtualIndex = 0;
let tempoSegundos = 0;
let cronometroInterval;

// --- 1. LOGIN E CADASTRO ---
function alternarModo() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN DE ATLETA" : "CRIAR CONTA";
    document.getElementById('btn-auth').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
    document.getElementById('toggle-text').innerHTML = isLoginMode ? 
        "NOVO POR AQUI? <span class='neon'>CADASTRAR</span>" : 
        "JÁ TEM CONTA? <span class='neon'>ENTRAR</span>";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value.trim();
    const pass = document.getElementById('pass-input').value.trim();

    if (!user || !pass) return alert("Preencha todos os campos!");

    if (isLoginMode) {
        // Tenta fazer login
        const senhaSalva = localStorage.getItem(user);
        if (senhaSalva === pass) {
            alert("Acesso concedido!");
            irParaSelecao(user);
        } else {
            alert("Usuário ou senha incorretos.");
        }
    } else {
        // Faz cadastro
        if (localStorage.getItem(user)) {
            alert("Este nome já existe!");
        } else {
            localStorage.setItem(user, pass);
            alert("Conta criada! Mude para Entrar.");
            alternarModo();
        }
    }
}

function irParaSelecao(nome) {
    document.getElementById('screen-auth').classList.add('hidden');
    document.getElementById('screen-selection').classList.remove('hidden');
    document.getElementById('user-display').innerText = nome.toUpperCase();
}

// --- 2. MONTAGEM DO ROTEIRO ---
function adicionarAoRoteiro(esporte, elemento) {
    if (!roteiro.includes(esporte)) {
        roteiro.push(esporte);
        elemento.classList.add('selected');
        
        const listaUI = document.getElementById('display-roteiro');
        if (roteiro.length === 1) listaUI.innerHTML = ""; // Limpa o aviso inicial
        
        const li = document.createElement('li');
        li.innerText = `${roteiro.length}º - Módulo: ${esporte}`;
        listaUI.appendChild(li);
        
        document.getElementById('btn-iniciar').classList.remove('hidden');
    }
}

function limparRoteiro() {
    roteiro = [];
    document.getElementById('display-roteiro').innerHTML = '<li>Monte sua lista acima...</li>';
    document.getElementById('btn-iniciar').classList.add('hidden');
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
}

// --- 3. MÓDULO DE TREINO ---
function irParaTreino() {
    document.getElementById('screen-selection').classList.add('hidden');
    document.getElementById('screen-training').classList.remove('hidden');
    carregarEsporteDoRoteiro();
}

function carregarEsporteDoRoteiro() {
    const esporte = roteiro[esporteAtualIndex];
    document.getElementById('training-sport-name').innerText = esporte.toUpperCase();
    
    // Texto exclusivo para Futebol
    if(esporte === "Futebol") {
        document.getElementById('training-desc').innerText = "Analisando táticas avançadas de 2026. Foco em posicionamento biomecânico.";
    } else {
        document.getElementById('training-desc').innerText = `Iniciando fundamentos técnicos para ${esporte}.`;
    }

    tempoSegundos = 0;
    document.getElementById('progress-fill').style.width = "0%";
    iniciarCronometro();
}

function iniciarCronometro() {
    clearInterval(cronometroInterval);
    cronometroInterval = setInterval(() => {
        tempoSegundos++;
        let m = Math.floor(tempoSegundos / 60).toString().padStart(2, '0');
        let s = (tempoSegundos % 60).toString().padStart(2, '0');
        document.getElementById('time-display').innerText = `${m}:${s}`;
        
        // Simular progresso (completa em 5s para demonstração)
        let prog = (tempoSegundos / 5) * 100;
        if(prog <= 100) document.getElementById('progress-fill').style.width = prog + "%";
    }, 1000);
}

function concluirModulo() {
    esporteAtualIndex++;
    if (esporteAtualIndex < roteiro.length) {
        carregarEsporteDoRoteiro();
    } else {
        clearInterval(cronometroInterval);
        alert("PARABÉNS! Você concluiu toda a sua lista de aprendizado!");
        location.reload();
    }
}
