// Função para alternar a visibilidade de um elemento pelo ID
function toggleContent(id) {
    const element = document.getElementById(id);

    // Verifica se o elemento existe
    if (element) {
        // Alterna a propriedade 'display' entre 'none' e 'block'
        if (element.style.display === 'none' || element.style.display === '') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}
