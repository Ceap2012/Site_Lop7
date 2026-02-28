let isLoginMode = false;
let userQueue = [];

function alternarTela() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN DE ATLETA" : "NOVO REGISTRO";
    document.getElementById('main-btn').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
}

function executarAcao() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (!user || !pass) return alert("Preencha os campos!");

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            abrirApp(user);
        } else { alert("Usuário ou senha incorretos."); }
    } else {
        localStorage.setItem(user, pass);
        alert("Conta criada! Agora clique em ENTRAR.");
        alternarTela();
    }
}

function abrirApp(nome) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('sports-page').classList.remove('hidden');
    document.getElementById('display-name').innerText = nome.toUpperCase();
}

function selecionarEsporte(nome, elemento) {
    if (!userQueue.includes(nome)) {
        userQueue.push(nome);
        elemento.classList.add('selected');
        renderizarLista();
    }
}

function renderizarLista() {
    const listaUI = document.getElementById('order-list');
    listaUI.innerHTML = "";
    userQueue.forEach((esp, i) => {
        listaUI.innerHTML += `<li>[Fase ${i+1}] → Aprender ${esp}</li>`;
    });
}

function limparLista() {
    userQueue = [];
    document.getElementById('order-list').innerHTML = '<li class="empty-msg">Clique nos cards acima...</li>';
    document.querySelectorAll('.sport-card').forEach(c => c.classList.remove('selected'));
}
