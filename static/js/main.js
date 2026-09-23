document.addEventListener('DOMContentLoaded', () => {
    const logTexts = document.querySelectorAll('.log-text');
    
    logTexts.forEach(log => {
        const originalText = log.textContent;
        log.textContent = ''; // Очищаем текст для запуска анимации
        
        let index = 0;
        // Запускаем печать с небольшой задержкой, чтобы дождаться появления карточки
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (index < originalText.length) {
                    log.textContent += originalText.charAt(index);
                    index++;
                } else {
                    clearInterval(typingInterval);
                    log.innerHTML += '<span class="terminal-cursor">|</span>';
                }
            }, 30);
        }, 1200);
    });

    // ИНТЕРАКТИВНЫЙ НЕОНОВЫЙ ФОКУС
    const mainCard = document.querySelector('.main-card');
    const cardGlow = document.querySelector('.card-glow');

    if (mainCard && cardGlow) {
        cardGlow.style.position = 'absolute';
        cardGlow.style.width = '300px';
        cardGlow.style.height = '300px';
        cardGlow.style.background = 'radial-gradient(circle, rgba(191,64,191,0.2) 0%, rgba(0,0,0,0) 70%)';
        cardGlow.style.borderRadius = '50%';
        cardGlow.style.pointerEvents = 'none';
        cardGlow.style.opacity = '0';
        cardGlow.style.transition = 'opacity 0.3s ease';
        cardGlow.style.zIndex = '0';
        
        const cardContent = document.querySelector('.card-content');
        if (cardContent) cardContent.style.position = 'relative';

        mainCard.style.position = 'relative';
        mainCard.style.overflow = 'hidden';

        mainCard.addEventListener('mousemove', (e) => {
            const rect = mainCard.getBoundingClientRect();
            const x = e.clientX - rect.left - 150;
            const y = e.clientY - rect.top - 150;

            cardGlow.style.opacity = '1';
            cardGlow.style.left = `${x}px`;
            cardGlow.style.top = `${y}px`;
        });

        mainCard.addEventListener('mouseleave', () => {
            cardGlow.style.opacity = '0';
        });
    }
});

// Добавляем стили для мигающего курсора терминала прямо в документ
const style = document.createElement('style');
style.textContent = `
    .terminal-cursor {
        animation: blink 0.8s infinite;
        color: var(--status-green);
        margin-left: 2px;
        font-weight: bold;
    }
    @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
