let isLoginMode = false;
let order = [];

function alternarModo() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "ENTRAR NO SISTEMA" : "CRIAR CONTA";
    document.getElementById('action-btn').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
    document.getElementById('toggle-text').innerHTML = isLoginMode ? "NÃO TEM CONTA? <span>CADASTRAR</span>" : "JÁ TEM CONTA? <span>ENTRAR</span>";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (!user || !pass) return alert("Erro: Preencha todos os campos.");

    if (isLoginMode) {
        // Lógica de Login
        const storedPass = localStorage.getItem(user);
        if (storedPass === pass) {
            entrarNaArena(user);
        } else {
            alert("Credenciais incorretas.");
        }
    } else {
        // Lógica de Cadastro
        if (localStorage.getItem(user)) {
            alert("Este usuário já existe.");
        } else {
            localStorage.setItem(user, pass);
            alert("Usuário registrado! Clique em ENTRAR agora.");
            alternarModo();
        }
    }
}

function entrarNaArena(nome) {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    document.getElementById('user-welcome').innerText = nome.toUpperCase();
}

function adicionarAolista(esporte, elemento) {
    if (!order.includes(esporte)) {
        order.push(esporte);
        elemento.classList.add('selected');
        atualizarVisualLista();
    }
}

function atualizarVisualLista() {
    const listaUI = document.getElementById('learning-list');
    listaUI.innerHTML = ""; // Limpa o placeholder

    order.forEach((item, index) => {
        listaUI.innerHTML += `<li><strong>FASE ${index + 1}:</strong> Aprender ${item}</li>`;
    });
}

function limparRoteiro() {
    order = [];
    document.getElementById('learning-list').innerHTML = '<li class="placeholder">Clique nos cards acima...</li>';
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
}
