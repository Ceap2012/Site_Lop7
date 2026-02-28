const jogadores = [
    { nome: "Vinícius Jr.", vel: 38.5, pass: 92, energia: 85 },
    { nome: "Mbappé", vel: 39.2, pass: 88, energia: 82 },
    { nome: "Haaland", vel: 36.8, pass: 79, energia: 94 }
];

function carregarEstatisticas() {
    const tbody = document.getElementById('stats-body');
    tbody.innerHTML = ""; // Limpa antes de atualizar

    jogadores.forEach(j => {
        // Oscilação leve para parecer "ao vivo"
        const velOscilada = (j.vel + (Math.random() * 0.5)).toFixed(1);
        
        const row = `
            <tr>
                <td><strong>${j.nome}</strong></td>
                <td style="color: var(--accent)">${velOscilada} km/h</td>
                <td>${j.pass}%</td>
                <td>
                    <div style="background: #eee; border-radius: 5px; height: 8px; width: 100px; margin: auto;">
                        <div style="background: var(--accent); width: ${j.energia}%; height: 100%; border-radius: 5px;"></div>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Atualiza os dados a cada 3 segundos
setInterval(carregarEstatisticas, 3000);
window.onload = () => {
    // Mantém a lógica de login anterior e inicia as stats
    const usuarioSalvo = localStorage.getItem('usuarioFutebol');
    if (usuarioSalvo) {
        mostrarInterfaceLogada(usuarioSalvo);
        carregarEstatisticas();
    }
};
