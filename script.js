// ===== ПРЕЛОАДЕР =====
(function() {
    const preloader = document.querySelector('.preloader');
    const countEl = document.querySelector('.preloader__count');
    let progress = 0;
    const duration = 1500; // общее время прелоадера (мс)
    const interval = 30; // обновление каждые 30мс
    const step = 100 / (duration / interval); // прирост за шаг

    // Блокируем скролл пока грузится прелоадер
    document.body.style.overflow = 'hidden';

    const counter = setInterval(() => {
        progress += step;
        if (progress >= 100) {
            progress = 100;
            clearInterval(counter);
            
            // Прелоадер выполнен
            setTimeout(() => {
                // Скрываем прелоадер
                preloader.classList.add('is-hidden');
                
                // Показываем контент и запускаем анимации
                setTimeout(() => {
                    window.scrollTo(0, 0); // всегда в начало при загрузке
                    document.body.style.overflow = ''; // возвращаем скролл
                    startAnimations();
                    
                    // Удаляем прелоадер из DOM после анимации
                    setTimeout(() => {
                        preloader.remove();
                    }, 400);
                }, 100);
            }, 200);
        }
        countEl.textContent = Math.round(progress) + '%';
    }, interval);
})();

// ===== ФУНКЦИЯ АНИМАЦИИ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
function startAnimations() {
    const animationDelay = 100; // задержка между элементами (мс)
    const baseDelay = 200; // начальная задержка перед стартом

    // Разбиваем hero__title на строки (по <br>)
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const html = heroTitle.innerHTML;
        const lines = html.split('<br>');
        heroTitle.innerHTML = lines.map((line, i) => 
            `<span class="title-line" style="animation-delay: ${baseDelay + lines.length * animationDelay + i * animationDelay}ms">${line}</span>${i < lines.length - 1 ? '<br>' : ''}`
        ).join('');
    }

    // Запускаем анимации с задержкой
    setTimeout(() => {
        // 1. Шапка
        const header = document.querySelector('.header');
        if (header) header.classList.add('is-visible');

        // 2. scr_devider в hero__top-bar
        const heroDivider = document.querySelector('.hero__top-bar .scr_devider');
        if (heroDivider) {
            setTimeout(() => heroDivider.classList.add('is-visible'), baseDelay + animationDelay);
        }

        // 3. Элементы hero__top-bar-inner
        const topBarInner = document.querySelector('.hero__top-bar-inner');
        if (topBarInner) {
            const topBarElements = topBarInner.querySelectorAll('.hero-animate');
            topBarElements.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, baseDelay + animationDelay + (i + 1) * animationDelay * 2);
            });
        }

        // 4. hero__title — запускаем анимацию строк
        if (heroTitle) {
            setTimeout(() => heroTitle.classList.add('is-visible'), baseDelay + animationDelay * 5);
        }
        
        // 5. hero__subtitle, кнопки, hero__right
        const heroSubtitle = document.querySelector('.hero__subtitle');
        const heroButtons = document.querySelector('.hero__buttons');
        const heroRight = document.querySelector('.hero__right:not(.hero__right-mobile)');
        
        const contentDelay = baseDelay + (heroTitle ? heroTitle.querySelectorAll('.title-line').length : 4) * animationDelay;
        
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.classList.add('is-visible'), contentDelay);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.classList.add('is-visible'), contentDelay + animationDelay);
        }
        if (heroRight) {
            setTimeout(() => heroRight.classList.add('is-visible'), contentDelay + animationDelay * 2);
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    // ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
    const animationDelay = 100; // задержка между элементами (мс)
    const baseDelay = 200; // начальная задержка перед стартом

    // Разбиваем hero__title на строки (по <br>)
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const html = heroTitle.innerHTML;
        const lines = html.split('<br>');
        heroTitle.innerHTML = lines.map((line, i) => 
            `<span class="title-line" style="animation-delay: ${baseDelay + lines.length * animationDelay + i * animationDelay}ms">${line}</span>${i < lines.length - 1 ? '<br>' : ''}`
        ).join('');
    }

    // Запускаем анимации с задержкой
    setTimeout(() => {
        // 1. Шапка
        const header = document.querySelector('.header');
        if (header) header.classList.add('animate');

        // 2. scr_devider в hero__top-bar
        const heroDivider = document.querySelector('.hero__top-bar .scr_devider');
        if (heroDivider) {
            setTimeout(() => heroDivider.classList.add('animate'), baseDelay + animationDelay);
        }

        // 3. Элементы hero__top-bar-inner
        const topBarInner = document.querySelector('.hero__top-bar-inner');
        if (topBarInner) {
            const topBarElements = topBarInner.children;
            Array.from(topBarElements).forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('animate');
                }, baseDelay + animationDelay + (i + 1) * animationDelay * 2);
            });
        }

        // 4. hero__title (строки уже с задержкой в CSS)
        
        // 5. hero__subtitle, кнопки, hero__right
        const heroSubtitle = document.querySelector('.hero__subtitle');
        const heroButtons = document.querySelector('.hero__buttons');
        const heroRight = document.querySelector('.hero__right:not(.hero__right-mobile)');
        
        const contentDelay = baseDelay + (heroTitle ? heroTitle.querySelectorAll('.title-line').length : 4) * animationDelay;
        
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.classList.add('animate'), contentDelay);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.classList.add('animate'), contentDelay + animationDelay);
        }
        if (heroRight) {
            setTimeout(() => heroRight.classList.add('animate'), contentDelay + animationDelay * 2);
        }
    }, 100);

    const tabs = document.querySelectorAll('.cases-page__tab');
    const tabPanels = document.querySelectorAll('.cases-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            if (tab.classList.contains('cases-page__tab--active')) return;

            tabs.forEach(t => t.classList.remove('cases-page__tab--active'));
            tab.classList.add('cases-page__tab--active');

            tabPanels.forEach(panel => {
                if (panel.dataset.tab === target) {
                    panel.classList.remove('cases-tab--hidden');
                } else {
                    panel.classList.add('cases-tab--hidden');
                }
            });
        });
    });

    // ===== Lenis — плавный скролл =====
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        touchMultiplier: 1,
        autoRaf: true,
        smoothWheel: true,
    });

    // Якорные ссылки через Lenis
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                lenis.scrollTo(top, { offset: -headerHeight });
            }
        });
    });

    // ===== Кнопки вкладок: сброс :active =====
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
            document.body.classList.toggle('menu-open');
        });

        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu || e.target.classList.contains('mobile-menu__inner')) {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            }
        });

        mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            });
        });

        const ctaBtn = mobileMenu.querySelector('.mobile-menu__cta');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            });
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 720) {
                mobileMenu.classList.remove('is-active');
                burger.classList.remove('is-active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ===== Вкладки: touch-обработчики =====
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
        const list = document.querySelector('.cases-list');
        if (list) {
            list.addEventListener('touchstart', () => {
                tabs.forEach(t => {
                    if (!t.classList.contains('cases-page__tab--active')) {
                        t.style.background = '';
                        t.style.borderColor = '';
                        t.style.color = '';
                    }
                });
            }, { passive: true });
        }
    });

    // ===== Анимация номеров карточек подхода =====
    const cardNumbers = document.querySelectorAll('.approach-card__number');
    if (cardNumbers.length > 0) {
        let currentIndex = 0;
        const interval = 1000;

        function activateNumber(index) {
            cardNumbers.forEach((num, i) => {
                num.classList.toggle('approach-card__number--active', i === index);
            });
        }

        activateNumber(0);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cardNumbers.length;
            activateNumber(currentIndex);
        }, interval);
    }

    // ===== Scroll-анимации: scr_devider, page-title__text, approach-card =====
    const scrollAnimElements = [];

    document.querySelectorAll('.page-title .scr_devider').forEach(el => {
        scrollAnimElements.push({ el, type: 'divider' });
    });
    document.querySelectorAll('.page-title__text').forEach(el => {
        scrollAnimElements.push({ el, type: 'title' });
    });
    document.querySelectorAll('.approach-card').forEach(card => {
        scrollAnimElements.push({ el: card, type: 'card' });
    });

    function updateScrollAnimations() {
        const viewH = window.innerHeight;

        scrollAnimElements.forEach(({ el, type }) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const start = viewH * 0.9; // начало анимации
            const end = viewH * 0.7;   // конец анимации
            const progress = 1 - (rect.top - end) / (start - end);
            const p = Math.max(0, Math.min(1, progress));
            const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // ease-in-out

            if (type === 'divider') {
                el.style.width = (eased * 100) + '%';
                el.style.opacity = eased;
            } else if (type === 'title') {
                el.style.opacity = eased;
                el.style.transform = `translateX(${-32 * (1 - eased)}px)`;
            } else if (type === 'card') {
                el.style.opacity = eased;
                el.style.transform = `translateY(${32 * (1 - eased)}px)`;
            }
        });
    }

    // Sync Lenis with scroll-based animations
    lenis.on('scroll', () => {
        // Scroll animations (scr_devider, approach__title-text, approach-card)
        updateScrollAnimations();
    });


    // ===== Scroll-анимация approach__headline: посимвольное затемнение =====
    const headline = document.querySelector('.approach__headline');
    if (headline) {
        const text = headline.textContent;
        headline.innerHTML = '';

        // Разбиваем по словам, буквы внутри слов оборачиваем в .letter
        text.split(' ').forEach((word, wi) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.innerHTML = word.replace(/\S/g, "<span class='letter'>$&</span>");
            headline.appendChild(wordSpan);

            // Добавляем пробел после слова (кроме последнего)
            if (wi < text.split(' ').length - 1) {
                headline.appendChild(document.createTextNode(' '));
            }
        });

        const letters = headline.querySelectorAll('.letter');
        const viewH = window.innerHeight;
        let ticking = false;

        function updateLetters() {
            const rect = headline.getBoundingClientRect();

            // progress: 0 = текст у дна экрана, 1 = текст на 20% от верха (80% высоты экрана)
            const progress = 1 - (rect.top - viewH * 0.2) / (viewH * 0.8);
            const clamped = Math.max(0, Math.min(1, progress));

            letters.forEach((letter, i) => {
                const threshold = (i / letters.length) * 0.85;
                if (clamped > threshold) {
                    letter.classList.add('active');
                } else {
                    letter.classList.remove('active');
                }
            });

            ticking = false;
        }

        lenis.on('scroll', () => {
            const rect = headline.getBoundingClientRect();
            const progress = 1 - (rect.top - viewH * 0.2) / (viewH * 0.8);
            const clamped = Math.max(0, Math.min(1, progress));

            letters.forEach((letter, i) => {
                const threshold = (i / letters.length) * 0.85;
                if (clamped > threshold) {
                    letter.classList.add('active');
                } else {
                    letter.classList.remove('active');
                }
            });
        });
    }

    // ===== Parallax для cases-page =====
    const casesPage = document.querySelector('.cases-page');
    const heroInner = document.querySelector('.hero__inner');
    
    if (casesPage) {
        lenis.on('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            const triggerPoint = heroHeight - window.innerHeight;
            
            // cases-page — поднимается с ограничением
            let offset = scrollY > triggerPoint ? (scrollY - triggerPoint) * 0.3 : 0;
            offset = Math.min(offset, 677);
            casesPage.style.top = `-${offset}px`;
            
            // hero__inner — blur + opacity при скролле
            if (heroInner) {
                const heroProgress = Math.min(scrollY / (heroHeight * 0.5), 1);
                heroInner.style.opacity = 1 - heroProgress * 0.8;
                heroInner.style.filter = `blur(${heroProgress * 8}px)`;
            }
        });
    }
});
