const BANCO = {
    "Futebol": {
        how: "Avançar a bola até o gol adversário sem usar as mãos.",
        rules: "90 min, Impedimento, VAR, 11 jogadores por time.",
        tactic: "Formação 4-3-3, marcação pressão e posse de bola.",
        tech: "Bolas com sensores, coletes GPS e análise por IA.",
        quiz: { p: "Qual o limite de substituições padrão hoje?", o: ["3", "5", "7"], c: 1 }
    }
};

const CLUBES = {
    "Flamengo": { f: "1895", h: "Maior torcida do Brasil, começou no Remo.", t: "Mundial 1981, 3 Liberta.", i: "Zico", fund: "Remadores do Rio." },
    "Palmeiras": { f: "1914", h: "Antigo Palestra Itália.", t: "3 Liberta, 12 Brasileiros.", i: "Ademir da Guia", fund: "Imigrantes Italianos." }
};

let selecionados = [];
let atual = "";

function tela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById(id).classList.add('ativa');
}

function cadastrar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(u && p) { localStorage.setItem(u, p); alert("CADASTRADO!"); }
}

function logar() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;
    if(localStorage.getItem(u) === p) tela('tela-selecao');
    else alert("ACESSO NEGADO!");
}

function addEsporte(esp, el) {
    if(!selecionados.includes(esp)) {
        selecionados.push(esp);
        el.classList.add('selecionado');
        document.getElementById('btn-gerar').classList.remove('hidden');
        document.getElementById('lista-escolhidos').innerText = selecionados.join(' | ');
    }
}

function abrirWorkspace() {
    tela('tela-work');
    const menu = document.getElementById('menu-lateral');
    menu.innerHTML = "<h3 class='texto-neon'>MENU_</h3>";
    selecionados.forEach(s => {
        const b = document.createElement('button');
        b.innerText = s;
        b.onclick = () => carregar(s);
        menu.appendChild(b);
    });
    carregar(selecionados[0]);
}

function carregar(s) {
    atual = s;
    const d = BANCO[s];
    document.getElementById('bloco-estudo').classList.remove('hidden');
    document.getElementById('bloco-quiz').classList.add('hidden');
    document.getElementById('bloco-time').classList.add('hidden');
    
    document.getElementById('tit-esporte').innerText = s;
    document.getElementById('txt-how').innerText = d.how;
    document.getElementById('txt-rules').innerText = d.rules;
    document.getElementById('txt-tactic').innerText = d.tactic;
    document.getElementById('txt-tech').innerText = d.tech;
}

function irProQuiz() {
    document.getElementById('bloco-estudo').classList.add('hidden');
    document.getElementById('bloco-quiz').classList.remove('hidden');
    const q = BANCO[atual].quiz;
    document.getElementById('pergunta-quiz').innerText = q.p;
    const opt = document.getElementById('opcoes-quiz');
    opt.innerHTML = "";
    q.o.forEach((o, i) => {
        const b = document.createElement('button');
        b.innerText = o;
        b.style.display = "block"; b.style.width = "100%";
        b.onclick = () => {
            if(i === q.c) {
                alert("ACESSO LIBERADO!");
                if(atual === "Futebol") {
                    document.getElementById('bloco-quiz').classList.add('hidden');
                    document.getElementById('bloco-time').classList.remove('hidden');
                } else carregar(atual);
            } else alert("DADOS INCORRETOS. REVISE.");
        };
        opt.appendChild(b);
    });
}

function verTime() {
    const t = document.getElementById('select-time').value;
    const r = document.getElementById('res-time');
    if(t && CLUBES[t]) {
        const d = CLUBES[t];
        r.innerHTML = `<h3>${t}</h3><p><b>HISTÓRIA:</b> ${d.h}</p><p><b>FUNDADOR:</b> ${d.fund}</p><p><b>TÍTULOS:</b> ${d.t}</p><p><b>ÍDOLO:</b> ${d.i}</p>`;
    }
}
