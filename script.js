let isLoginMode = false;
let roteiro = [];
let indiceAtual = 0;
let tempoSegundos = 0;
let intervalId;

// 1. GESTÃO DE ACESSO
function alternarModo() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN" : "CRIAR CONTA";
    document.getElementById('btn-auth').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (!user || !pass) return alert("Preencha os campos!");

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            abrirSelecao(user);
        } else { alert("Usuário ou senha incorretos."); }
    } else {
        localStorage.setItem(user, pass);
        alert("Conta criada! Mude para Entrar.");
        alternarModo();
    }
}

function abrirSelecao(nome) {
    document.getElementById('screen-auth').classList.add('hidden');
    document.getElementById('screen-selection').classList.remove('hidden');
    document.getElementById('user-display').innerText = nome.toUpperCase();
}

// 2. MONTAGEM DA LISTA
function adicionarAoRoteiro(esporte, elemento) {
    if (!roteiro.includes(esporte)) {
        roteiro.push(esporte);
        elemento.classList.add('selected');
        
        const listaUI = document.getElementById('display-roteiro');
        if (roteiro.length === 1) listaUI.innerHTML = "";
        
        const item = document.createElement('li');
        item.innerText = `${roteiro.length}º - Aprender ${esporte}`;
        listaUI.appendChild(item);
        
        document.getElementById('btn-iniciar').classList.remove('hidden');
    }
}

function limparRoteiro() {
    roteiro = [];
    document.getElementById('display-roteiro').innerHTML = '<li>Selecione a ordem acima...</li>';
    document.getElementById('btn-iniciar').classList.add('hidden');
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
}

// 3. CICLO DE APRENDIZADO
function irParaTreino() {
    document.getElementById('screen-selection').classList.add('hidden');
    document.getElementById('screen-training').classList.remove('hidden');
    carregarModulo();
}

function carregarModulo() {
    const esporte = roteiro[indiceAtual];
    document.getElementById('training-sport-name').innerText = esporte.toUpperCase();
    
    // Descrição especial para Futebol
    const desc = esporte === "Futebol" 
        ? "Módulo Avançado: Táticas biomecânicas e análise de campo 2026." 
        : `Módulo Básico: Iniciando fundamentos técnicos de ${esporte}.`;
    
    document.getElementById('training-desc').innerText = desc;
    
    // Reset de Interface
    tempoSegundos = 0;
    document.getElementById('progress-fill').style.width = "0%";
    iniciarCronometro();
}

function iniciarCronometro() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        tempoSegundos++;
        let m = Math.floor(tempoSegundos / 60).toString().padStart(2, '0');
        let s = (tempoSegundos % 60).toString().padStart(2, '0');
        document.getElementById('time-display').innerText = `${m}:${s}`;
        
        // Simular progresso (completa em 5 seg para demonstração)
        let prog = (tempoSegundos / 5) * 100;
        if(prog <= 100) document.getElementById('progress-fill').style.width = prog + "%";
    }, 1000);
}

function concluirModulo() {
    indiceAtual++;
    if (indiceAtual < roteiro.length) {
        carregarModulo();
    } else {
        clearInterval(intervalId);
        alert("SISTEMA: Todos os módulos concluídos com sucesso!");
        location.reload();
    }
}
