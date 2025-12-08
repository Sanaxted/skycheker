// Основной скрипт для сайта SkyCheker

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    initApp();
});

function initApp() {
    // Убрать лоадер
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1500);

    // Инициализация навигации
    initNavigation();

    // Инициализация анимаций
    initAnimations();

    // Инициализация частиц
    initParticles();

    // Инициализация демо
    initDemo();

    // Инициализация скролла
    initScroll();
}

// Навигация по разделам
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Убрать активный класс со всех элементов
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Добавить активный класс текущему элементу
            this.classList.add('active');
            
            // Показать целевую секцию
            document.getElementById(targetSection).classList.add('active');
            
            // Прокрутить к верху секции
            document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Анимации
function initAnimations() {
    // Тайпинг текст в hero секции
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Интеллектуальный мониторинг фасадов",
        "Искусственный интеллект в действии",
        "Автопилот для дронов",
        "Безопасность школ превыше всего"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Пауза перед удалением
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Пауза перед новым текстом
        }

        setTimeout(type, typingSpeed);
    }

    // Запустить анимацию через 2 секунды после загрузки
    setTimeout(type, 2000);

    // Анимация прогресс-баров
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });

    // Анимация счетчиков
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });

    // Анимация обнаружения повреждений
    const detectionBox = document.querySelector('.detection-box');
    if (detectionBox) {
        setInterval(() => {
            detectionBox.style.transform = 'scale(1.1)';
            setTimeout(() => {
                detectionBox.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

// Частицы в фоне
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
}

// Демо функционал
function initDemo() {
    // Симуляция полета
    const simulateBtn = document.getElementById('simulateFlight');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            const waypoints = document.querySelectorAll('.waypoint');
            let current = 0;
            
            waypoints.forEach(wp => wp.classList.remove('active'));
            waypoints[0].classList.add('active');
            
            const flightInterval = setInterval(() => {
                waypoints[current].classList.remove('active');
                current = (current + 1) % waypoints.length;
                waypoints[current].classList.add('active');
                
                if (current === waypoints.length - 1) {
                    clearInterval(flightInterval);
                    setTimeout(() => {
                        simulateBtn.innerHTML = '<i class="fas fa-check"></i> Полет завершен';
                        simulateBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    }, 500);
                }
            }, 1000);
            
            simulateBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> В полете...';
            simulateBtn.disabled = true;
        });
    }

    // Управление демо
    const demoButtons = document.querySelectorAll('.btn-control');
    demoButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            demoButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const action = this.querySelector('i').className;
            if (action.includes('play')) {
                startDemo();
            } else if (action.includes('pause')) {
                pauseDemo();
            } else if (action.includes('redo')) {
                restartDemo();
            }
        });
    });
}

function startDemo() {
    console.log('Демо запущено');
    // Здесь будет логика запуска демо
}

function pauseDemo() {
    console.log('Демо на паузе');
    // Здесь будет логика паузы демо
}

function restartDemo() {
    console.log('Демо перезапущено');
    // Здесь будет логика перезапуска демо
    location.reload();
}

// Управление скроллом
function initScroll() {
    // Кнопка скролла вверх
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Плавный скролл для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Эффект параллакса для hero секции
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-overlay');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold
