/* ========================================
   ГЛАВНЫЙ ФАЙЛ СКРИПТОВ
   Профессия "Сервисный инженер" — ЭРТХ
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initFadeInAnimations();
    initQuiz();
});

/* ========================================
   1. НАВИГАЦИЯ
   ======================================== */

function initNavigation() {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Эффект навбара при скролле
    const handleScroll = () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Бургер-меню
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isActive = toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                toggle.focus();
            }
        });
    }
}

/* ========================================
   2. ЭФФЕКТЫ ПРИ СКРОЛЛЕ
   ======================================== */

function initScrollEffects() {
    // Плавная прокрутка для якорных ссылок (дополнительно к CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80; // высота навбара
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* ========================================
   3. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ
   ======================================== */

function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    // Проверка поддержки IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Фоллбэк для старых браузеров
        fadeElements.forEach(el => el.classList.add('visible'));
    }
}

/* ========================================
   4. ТЕСТ "ПОДХОДИТ ЛИ ТЕБЕ ПРОФЕССИЯ"
   ======================================== */

function initQuiz() {
    const quizSection = document.getElementById('quiz');
    if (!quizSection) return;

    // Данные теста
    const questions = [
        {
            question: 'Тебе нравится разбираться, как работают вещи, и чинить сломанное?',
            options: [
                { text: 'Да, обожаю копаться в технике', score: 2 },
                { text: 'Иногда бывает интересно', score: 1 },
                { text: 'Нет, предпочитаю не лезть', score: 0 }
            ]
        },
        {
            question: 'Как ты реагируешь, когда что-то идёт не по плану (например, всё зависло)?',
            options: [
                { text: 'Сохраняю спокойствие и ищу решение', score: 2 },
                { text: 'Нервничаю, но справляюсь', score: 1 },
                { text: 'Паникую и бросаю дело', score: 0 }
            ]
        },
        {
            question: 'Ты любишь решать логические задачки и головоломки?',
            options: [
                { text: 'Да, это мой конёк', score: 2 },
                { text: 'Не против поразмять мозги', score: 1 },
                { text: 'Предпочитаю задачи покреативнее', score: 0 }
            ]
        },
        {
            question: 'Как ты относишься к общению с незнакомыми людьми?',
            options: [
                { text: 'Легко нахожу общий язык с кем угодно', score: 2 },
                { text: 'Могу поговорить, если есть повод', score: 1 },
                { text: 'Стараюсь избегать лишних контактов', score: 0 }
            ]
        },
        {
            question: 'Готов ли ты постоянно учиться новому?',
            options: [
                { text: 'Конечно, технологии не стоят на месте', score: 2 },
                { text: 'Готов, но в меру', score: 1 },
                { text: 'Хочу выучить одно и работать спокойно', score: 0 }
            ]
        }
    ];

    // Результаты в зависимости от баллов
    const results = [
        {
            min: 8,
            icon: '🚀',
            title: 'Отличный кандидат!',
            text: 'У тебя все задатки сервисного инженера: любовь к технике, стрессоустойчивость, аналитический склад ума и готовность учиться. Добро пожаловать в ЭРТХ — мы ждём именно таких!'
        },
        {
            min: 5,
            icon: '💡',
            title: 'Есть потенциал!',
            text: 'У тебя хорошие задатки, но некоторые навыки стоит подтянуть. Начни с основ сетей, попробуй себя в Packet Tracer и подавайся на стажировку — опыт всё изменит!'
        },
        {
            min: 0,
            icon: '🤔',
            title: 'Пока не совсем твоё',
            text: 'Профессия сервисного инженера требует специфического набора качеств. Но не расстраивайся — в ЭРТХ есть много других интересных ролей. Посмотри раздел "Карьера" на нашем сайте!'
        }
    ];

    // Состояние теста
    let currentQuestion = 0;
    let answers = new Array(questions.length).fill(null);

    // DOM-элементы
    const questionsContainer = document.getElementById('quizQuestions');
    const progressBar = document.getElementById('quizProgressBar');
    const currentLabel = document.getElementById('quizCurrent');
    const totalLabel = document.getElementById('quizTotal');
    const prevBtn = document.getElementById('quizPrev');
    const nextBtn = document.getElementById('quizNext');
    const resultBlock = document.getElementById('quizResult');
    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const restartBtn = document.getElementById('quizRestart');

    if (!questionsContainer || !progressBar) return;

    totalLabel.textContent = questions.length;

    // Рендер вопросов
    questions.forEach((q, idx) => {
        const questionEl = document.createElement('div');
        questionEl.className = 'quiz-question' + (idx === 0 ? ' active' : '');
        questionEl.dataset.index = idx;

        const title = document.createElement('h3');
        title.textContent = q.question;
        questionEl.appendChild(title);

        const optionsWrap = document.createElement('div');
        optionsWrap.className = 'quiz-options';

        q.options.forEach((opt, optIdx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.type = 'button';
            btn.textContent = opt.text;
            btn.dataset.score = opt.score;
            btn.dataset.question = idx;
            btn.dataset.option = optIdx;

            btn.addEventListener('click', () => selectOption(idx, optIdx, opt.score));
            optionsWrap.appendChild(btn);
        });

        questionEl.appendChild(optionsWrap);
        questionsContainer.appendChild(questionEl);
    });

    // Выбор варианта ответа
    function selectOption(questionIdx, optionIdx, score) {
        answers[questionIdx] = { optionIdx, score };

        // Визуальное выделение
        const questionEl = questionsContainer.querySelector(`.quiz-question[data-index="${questionIdx}"]`);
        questionEl.querySelectorAll('.quiz-option').forEach((btn, i) => {
            btn.classList.toggle('selected', i === optionIdx);
        });

        updateNavigation();
    }

    // Обновление состояния кнопок навигации
    function updateNavigation() {
        prevBtn.disabled = currentQuestion === 0;

        const isLast = currentQuestion === questions.length - 1;
        const hasAnswer = answers[currentQuestion] !== null;

        nextBtn.disabled = !hasAnswer;
        nextBtn.textContent = isLast ? 'Показать результат →' : 'Далее →';
    }

    // Обновление прогресс-бара и счётчика
    function updateProgress() {
        const percent = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = percent + '%';
        currentLabel.textContent = currentQuestion + 1;
    }

    // Переход к следующему вопросу
    function goToQuestion(idx) {
        const questionsEls = questionsContainer.querySelectorAll('.quiz-question');
        questionsEls.forEach(el => el.classList.remove('active'));
        questionsEls[idx].classList.add('active');
        currentQuestion = idx;
        updateProgress();
        updateNavigation();
    }

    // Показать результат
    function showResult() {
        const totalScore = answers.reduce((sum, a) => sum + (a ? a.score : 0), 0);
        const result = results.find(r => totalScore >= r.min) || results[results.length - 1];

        resultIcon.textContent = result.icon;
        resultTitle.textContent = result.title;
        resultText.textContent = result.text;

        // Скрываем вопросы и навигацию
        questionsContainer.style.display = 'none';
        document.querySelector('.quiz-navigation').style.display = 'none';
        document.querySelector('.quiz-info').style.display = 'none';
        progressBar.style.width = '100%';

        resultBlock.classList.add('show');
    }

    // Перезапуск теста
    function restartQuiz() {
        answers = new Array(questions.length).fill(null);
        currentQuestion = 0;

        // Сброс выделения
        questionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Показываем всё обратно
        questionsContainer.style.display = '';
        document.querySelector('.quiz-navigation').style.display = '';
        document.querySelector('.quiz-info').style.display = '';
        resultBlock.classList.remove('show');

        goToQuestion(0);
    }

    // Обработчики кнопок
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) goToQuestion(currentQuestion - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            goToQuestion(currentQuestion + 1);
        } else {
            showResult();
        }
    });

    restartBtn.addEventListener('click', restartQuiz);

    // Клавиатурная навигация (стрелки)
    document.addEventListener('keydown', (e) => {
        if (!quizSection.getBoundingClientRect().top < window.innerHeight) return;
        if (resultBlock.classList.contains('show')) return;

        if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        }
    });

    // Инициализация
    updateProgress();
    updateNavigation();
}