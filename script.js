document.addEventListener('DOMContentLoaded', () => {
    // Implementação de Scroll Suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignora links vazios

            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Você pode adicionar mais funcionalidades aqui, como:
    // 1. Alternância de temas (Claro/Escuro)
    // 2. Lógica para um Quiz de Gêneros Textuais
    // 3. Validação de formulários de redação
});
