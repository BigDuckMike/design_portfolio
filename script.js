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

    // ===== Кнопки вкладок: убираем :active стиль при клике в другое место =====
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.cases-page__tab')) {
            tabs.forEach(tab => {
                tab.style.background = '';
                tab.style.borderColor = '';
                tab.style.color = '';
            });
        }
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

    // ===== Вкладки: touch-обработчики для сброса :active на мобильных =====
    tabs.forEach(tab => {
        tab.addEventListener('touchstart', () => {
            if (!tab.classList.contains('cases-page__tab--active')) {
                tab.style.background = '#007AFF';
                tab.style.borderColor = '#007AFF';
                tab.style.color = '#F5F5F7';
            }
        }, { passive: true });
        tab.addEventListener('touchend', (e) => {
            const target = e.target.closest('.cases-page__tab');
            if (!target.classList.contains('cases-page__tab--active')) {
                target.style.background = '';
                target.style.borderColor = '';
                target.style.color = '';
            }
        });
        // Сброс при скролле карточек
        document.querySelector('.cases-list').addEventListener('touchstart', () => {
            tabs.forEach(t => {
                if (!t.classList.contains('cases-page__tab--active')) {
                    t.style.background = '';
                    t.style.borderColor = '';
                    t.style.color = '';
                }
            });
        }, { passive: true });
    });
});
