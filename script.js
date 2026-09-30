document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.cases-page__tab');
    const tabPanels = document.querySelectorAll('.cases-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            // Если кликнули по уже активной вкладке — выходим
            if (tab.classList.contains('cases-page__tab--active')) return;

            // Переключаем активную кнопку
            tabs.forEach(t => t.classList.remove('cases-page__tab--active'));
            tab.classList.add('cases-page__tab--active');

            // Переключаем контент
            tabPanels.forEach(panel => {
                if (panel.dataset.tab === target) {
                    panel.classList.remove('cases-tab--hidden');
                } else {
                    panel.classList.add('cases-tab--hidden');
                }
            });
        });
    });

    // ===== Мобильное меню =====
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            burger.classList.toggle('is-active');
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu || e.target.classList.contains('mobile-menu__inner')) {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
            }
        });

        // Закрытие меню при клике на ссылку
        mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
            });
        });

        // Закрытие меню при клике на кнопку CTA
        const ctaBtn = mobileMenu.querySelector('.mobile-menu__cta');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
            });
        }

        // Закрытие меню при расширении экрана
        window.addEventListener('resize', () => {
            if (window.innerWidth > 720) {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
            }
        });
    }
});
