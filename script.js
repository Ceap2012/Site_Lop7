const DB = {
    "Futebol": {
        how: "Disputado em campo retangular. O objetivo é a progressão da bola até o gol adversário usando táticas de triangulação e ocupação de espaços.",
        rules: ["Partida de 90min", "Regra do Impedimento (VAR)", "Máximo 5 substituições", "Cartões Amarelo/Vermelho"],
        tactics: "Formações como 4-3-3 e 4-2-3-1. Uso de marcação alta (pressing).",
        tech: "Bolas com chips, GPS de alta performance e análise de vídeo em tempo real.",
        quiz: { p: "O que acontece se um jogador receber o segundo cartão amarelo?", o: ["Continua no jogo", "É expulso (Vermelho)", "Fica 10 min fora"], c: 1 }
    },
    "Basquete": {
        how: "Jogo de alta velocidade onde 5 atletas tentam converter a bola na cesta a 3,05m de altura.",
        rules: ["Relógio de 24s", "4 quartos de 10 ou 12min", "Limite de 5 faltas individuais"],
        tactics: "Pick and Roll, defesa em zona e transições rápidas.",
        tech: "Sensores de arco e análise biométrica.",
        quiz: { p: "Quanto tempo uma equipe tem para arremessar?", o: ["14 segundos", "24 segundos", "30 segundos"], c: 1 }
    }
};

const TIMES = {
    "Flamengo": { fund: "1895", hist: "Nasceu no remo e se tornou o 'Mais Querido'.", tits: "Mundial (1981), 3 Libertadores, 8 Brasileiros.", idolo: "Zico", fundadores: "Grupo de remadores do bairro do Flamengo." },
    "Palmeiras": { fund: "1914", hist: "Fundado por imigrantes italianos como Palestra Italia.", tits: "3 Libertadores, 12 Brasileiros.", idolo: "Ademir da Guia", fundadores: "Luigi Cervo, Vicenzo Ragognetti e outros." },
    "Santos": { fund: "1912", hist: "O time de Pelé que encantou o mundo nos anos 60.", tits: "2 Mundiais, 3 Libertadores.", idolo: "Pelé", fundadores: "Raimundo Marques, Mário Ferraz e Argemiro de Souza." }
};

let selecionados = [];
let atual = "";

// AUTH
function cadastrar() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;
    if(!u || !p) return alert("Preencha tudo!");
    localStorage.setItem(u, p);
    alert("Usuário Cadastrado!");
}

function login() {
    const u = document.getElementById('user-input').value;
    const p = document.getElementById('pass-input').value;
    if(localStorage.getItem(u) === p) {
        document.getElementById('screen-auth').classList.remove('active');
        document.getElementById('screen-selection').classList.add('active');
    } else alert("Erro no Login!");
}

// SELEÇÃO
function selecionar(esp, el) {
    if(!selecionados.includes(esp)) {
        selecionados.push(esp);
        el.classList.add('selected');
        document.getElementById('btn-gerar').classList.remove('hidden');
        document.getElementById('txt-fila').innerText = selecionados.join(' | ');
    }
}

// WORKSPACE
function montarWorkspace() {
    document.getElementById('screen-selection').classList.remove('active');
    document.getElementById('screen-workspace').classList.add('active');
    const nav = document.getElementById('nav-links');
    nav.innerHTML = "";
    selecionados.forEach(s => {
        const b = document.createElement('button');
        b.innerText = s;
        b.onclick = () => carregar(s);
        b.style = "width:100%; margin:5px 0; background:#495057; color:white; border:none; padding:10px; cursor:pointer;";
        nav.appendChild(b);
    });
    carregar(selecionados[0]);
}

function carregar(esp) {
    atual = esp;
    const d = DB[esp];
    document.getElementById('bloco-teoria').classList.remove('hidden');
    document.getElementById('bloco-quiz').classList.add('hidden');
    document.getElementById('bloco-time').classList.add('hidden');
    
    document.getElementById('titulo-esporte').innerText = esp;
    document.getElementById('info-how').innerText = d.how;
    document.getElementById('info-tactics').innerText = d.tactics;
    document.getElementById('info-tech').innerText = d.tech;
    
    const list = document.getElementById('info-rules');
    list.innerHTML = "";
    d.rules.forEach(r => list.innerHTML += `<li>${r}</li>`);
}

// QUIZ
function abrirQuiz() {
    document.getElementById('bloco-teoria').classList.add('hidden');
    document.getElementById('bloco-quiz').classList.remove('hidden');
    const q = DB[atual].quiz;
    document.getElementById('pergunta-txt').innerText = q.p;
    const opts = document.getElementById('opcoes-quiz');
    opts.innerHTML = "";
    q.o.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.style = "display:block; width:100%; margin:10px 0; padding:10px;";
        btn.onclick = () => {
            if(i === q.c) {
                alert("CORRETO!");
                if(atual === "Futebol") {
                    document.getElementById('bloco-quiz').classList.add('hidden');
                    document.getElementById('bloco-time').classList.remove('hidden');
                } else carregar(atual);
            } else alert("ERROU! VOLTE E ESTUDE.");
        };
        opts.appendChild(btn);
    });
}

// TIME
function detalharTime() {
    const t = document.getElementById('select-time').value;
    const res = document.getElementById('resultado-time');
    if(t && TIMES[t]) {
        const d = TIMES[t];
        res.innerHTML = `<h3>${t}</h3>
            <p><b>Fundadores:</b> ${d.fundadores}</p>
            <p><b>História:</b> ${d.hist}</p>
            <p><b>Títulos:</b> ${d.tits}</p>
            <p><b>Ídolo:</b> ${d.idolo}</p>`;
    }
}
