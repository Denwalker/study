window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    const dialog = document.querySelector('.contact-dialog');
    const setMenu = (open) => {
        menu.classList.toggle('menu_active', open);
        hamburger.classList.toggle('hamburger_active', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        document.body.classList.toggle('menu-open', open);
    };
    hamburger.addEventListener('click', () => setMenu(hamburger.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
    document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !hamburger.contains(event.target)) setMenu(false);
    });
    window.matchMedia('(min-width: 768px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
    document.querySelectorAll('[data-contact]').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            setMenu(false);
            dialog.showModal();
        });
    });
    dialog.querySelector('.contact-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
});
