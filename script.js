let modoLogin = false;

function alternarTela() {
    modoLogin = !modoLogin;
    const titulo = document.getElementById('auth-title');
    const btn = document.getElementById('btn-main');
    const toggle = document.getElementById('toggle-text');

    if (modoLogin) {
        titulo.innerText = "Login de Jogador";
        btn.innerText = "Entrar";
        toggle.innerText = "Não tem conta? Criar agora";
    } else {
        titulo.innerText = "Criar Conta Futurista";
        btn.innerText = "Cadastrar";
        toggle.innerText = "Já tem conta? Entrar";
    }
}

function registrar() {
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (!user || !pass) return alert("Preencha todos os campos!");

    if (modoLogin) {
        // Lógica de LOGIN
        const senhaSalva = localStorage.getItem(user);
        if (senhaSalva && senhaSalva === pass) {
            entrar(user);
        } else {
            alert("Usuário ou senha incorretos!");
        }
    } else {
        // Lógica de CADASTRO
        if (localStorage.getItem(user)) {
            alert("Este nome já está em uso!");
        } else {
            localStorage.setItem(user, pass);
            alert("Conta criada com sucesso! Agora faça login.");
            alternarTela();
        }
    }
}

function entrar(nome) {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('display-name').innerText = nome;
}

function logout() {
    location.reload(); // Reinicia a página para voltar ao login
}
