let isLoginMode = false;

function alternarTela() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('main-btn');
    const toggleText = document.getElementById('toggle-text');

    if (isLoginMode) {
        title.innerText = "LOGIN DE ATLETA";
        btn.innerText = "ENTRAR";
        toggleText.innerHTML = "Não possui registro? <span>CADASTRAR</span>";
    } else {
        title.innerText = "CRIAR ACESSO";
        btn.innerText = "CADASTRAR";
        toggleText.innerHTML = "Já possui registro? <span>ENTRAR</span>";
    }
}

function executarAcao() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (!user || !pass) {
        alert("Preencha as credenciais!");
        return;
    }

    if (isLoginMode) {
        // Lógica de Login
        const storedPass = localStorage.getItem(user);
        if (storedPass === pass) {
            logar(user);
        } else {
            alert("Erro: Credenciais não encontradas ou incorretas.");
        }
    } else {
        // Lógica de Cadastro
        if (localStorage.getItem(user)) {
            alert("Este usuário já existe no sistema!");
        } else {
            localStorage.setItem(user, pass);
            alert("Registro efetuado com sucesso!");
            alternarTela();
        }
    }
}

function logar(nome) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('display-name').innerText = nome.toUpperCase();
}
