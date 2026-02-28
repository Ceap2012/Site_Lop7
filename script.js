let modoLogin = false;
let roteiro = [];

function alternarModo() {
    modoLogin = !modoLogin;
    document.getElementById('auth-title').innerText = modoLogin ? "ENTRAR" : "CRIAR CONTA";
    document.getElementById('action-btn').innerText = modoLogin ? "ENTRAR" : "CADASTRAR";
    document.getElementById('toggle-text').innerHTML = modoLogin ? "NOVO AQUI? <span>CADASTRAR</span>" : "JÁ TEM CONTA? <span>ENTRAR</span>";
}

function gerenciarAcesso() {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    if (!user || !pass) {
        alert("Preencha os campos!");
        return;
    }

    if (modoLogin) {
        // Lógica de Entrar
        if (localStorage.getItem(user) === pass) {
            entrarNaArena(user);
        } else {
            alert("Usuário ou senha incorretos!");
        }
    } else {
        // Lógica de Cadastro
        localStorage.setItem(user, pass);
        alert("Conta criada! Agora clique em ENTRAR.");
        alternarModo();
    }
}

function entrarNaArena(nome) {
    // ESSA PARTE FAZ A TROCA DE PÁGINA
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    document.getElementById('user-welcome').innerText = nome.toUpperCase();
}

function adicionarAoRoteiro(esporte, elemento) {
    if (!roteiro.includes(esporte)) {
        roteiro.push(esporte);
        elemento.classList.add('selected');
        
        const lista = document.getElementById('learning-list');
        if (roteiro.length === 1) lista.innerHTML = ""; // Remove o placeholder no primeiro clique
        
        const item = document.createElement('li');
        item.innerHTML = `<strong>${roteiro.length}º</strong> - Aprender ${esporte}`;
        lista.appendChild(item);
    }
}

function limparRoteiro() {
    roteiro = [];
    document.getElementById('learning-list').innerHTML = '<li>Selecione a ordem acima...</li>';
    document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
}
