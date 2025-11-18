// Função para alternar a visibilidade de um elemento
function toggleContent(id) {
    const element = document.getElementById(id);

    // Verifica se o elemento existe
    if (element) {
        // Se o estilo de exibição for 'none' (escondido), muda para 'block' (mostra)
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            // Se estiver visível, esconde
            element.style.display = 'none';
        }
    }
}

// Exemplo de uso no HTML (você adicionaria isso na sua seção de Verbos)
/*
<button onclick="toggleContent('explicacao-infinitivo')">Mostrar Exemplo</button>
<div id="explicacao-infinitivo" style="display:none;">
    <p>O infinitivo é a forma não conjugada do verbo (ex: amar, vender, partir).</p>
</div>
*/
