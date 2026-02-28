let isLoginMode = false;

function alternarTela() {
    isLoginMode = !isLoginMode;
    document.getElementById('auth-title').innerText = isLoginMode ? "LOGIN DE ACESSO" : "NOVO REGISTRO";
    document.getElementById('main-btn').innerText = isLoginMode ? "ENTRAR" : "CADASTRAR";
}

function executarAcao() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (!user || !pass) return alert("Dados incompletos!");

    if (isLoginMode) {
        if (localStorage.getItem(user) === pass) {
            abrirArena(user);
        } else {
            alert("Credenciais Inválidas!");
        }
    } else {
        localStorage.setItem(user, pass);
        alert("Usuário Criado! Mude para o Login.");
        alternarTela();
    }
}

function abrirArena(nome) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('sports-page').classList.remove('hidden');
    document.getElementById('display-name').innerText = nome.toUpperCase();
}
