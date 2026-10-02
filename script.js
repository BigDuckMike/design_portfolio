// ===== ПРЕЛОАДЕР =====
(function() {
    const preloader = document.querySelector('.preloader');
    const countEl = document.querySelector('.preloader__count');
    let progress = 0;
    const duration = 1500; // общее время прелоадера (мс)
    const interval = 30; // обновление каждые 30мс
    const step = 100 / (duration / interval); // прирост за шаг

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

    // ===== Плавный скролл по якорям =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top, behavior: 'smooth' });
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

    // ===== Dot grid animation (desktop only) =====
    if (window.innerWidth > 720) {
        const canvas = document.getElementById('dotGrid');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let mouseX = -1000;
            let mouseY = -1000;

            const dotSize = 2;
            const spacing = 30;
            const radius = 120;
            const maxMove = 15;

            let dots = [];
            let cols, rows;

            function resize() {
                const hero = document.querySelector('.hero');
                if (!hero) return;
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;

                cols = Math.ceil(canvas.width / spacing) + 1;
                rows = Math.ceil(canvas.height / spacing) + 1;

                dots = [];
                for (let x = 0; x < cols; x++) {
                    for (let y = 0; y < rows; y++) {
                        dots.push({
                            baseX: x * spacing,
                            baseY: y * spacing,
                            x: x * spacing,
                            y: y * spacing
                        });
                    }
                }
            }

            function onMouseMove(e) {
                const rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let dot of dots) {
                    const dx = mouseX - dot.baseX;
                    const dy = mouseY - dot.baseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < radius && dist > 0) {
                        const force = (radius - dist) / radius;
                        const moveX = (dx / dist) * force * maxMove;
                        const moveY = (dy / dist) * force * maxMove;
                        dot.x = dot.baseX + moveX;
                        dot.y = dot.baseY + moveY;
                    } else {
                        dot.x += (dot.baseX - dot.x) * 0.1;
                        dot.y += (dot.baseY - dot.y) * 0.1;
                    }

                    ctx.beginPath();
                    ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                    ctx.fillStyle = '#AAAAAA';
                    ctx.fill();
                }

                requestAnimationFrame(animate);
            }

            window.addEventListener('resize', resize);
            canvas.addEventListener('mousemove', onMouseMove);

            resize();
            animate();
        }
    }
});
