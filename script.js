document.addEventListener('DOMContentLoaded', () => {
    console.log("🎉🎉🎉 JavaScript Loaded! LET THE MEMES BEGIN! 🎉🎉🎉");

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Wobbly/Bouncy/Animated Text ---
    function applyTextAnimation(selector, animationName, delayBetweenChars = 50) {
        document.querySelectorAll(selector).forEach(element => {
            const originalText = element.getAttribute('data-text') || element.textContent;
            element.innerHTML = ''; // Clear existing content
            originalText.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
                span.style.display = 'inline-block'; // Needed for transform
                span.style.animation = `${animationName} 1s ease-in-out ${index * delayBetweenChars}ms infinite alternate`;
                element.appendChild(span);
            });
        });
    }

    applyTextAnimation('.bouncy-text span', 'bounce', 70); // Re-target span if HTML changes
    applyTextAnimation('.wiggle-text', 'wiggle', 80);
    applyTextAnimation('.spin-text', 'spin', 100); // This will be chaotic on long text, use sparingly
    applyTextAnimation('.shaky-text', 'shaky', 60);


    // --- Confetti Button ---
    const confettiBtn = document.getElementById('confetti-button');
    if (confettiBtn && typeof confetti === 'function') {
        confettiBtn.addEventListener('click', () => {
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.6 }
            });
            showAchievement("Confetti Connoisseur!");
        });
    } else if (!confettiBtn) {
        console.warn("Confetti button not found!");
    } else {
        console.warn("Confetti library not loaded! Download from https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js");
    }


    // --- Random Fun Fact ---
    const facts = [
        "I can totally touch my nose with my tongue. (Not really).",
        "My spirit animal is a caffeinated squirrel.",
        "I once parallel parked. It was a Tuesday.",
        "Pretty sure I was a cat in a past life. 😼",
        "I know the first 151 Pokémon. Deal with it.",
        "I still use 'lol' unironically."
    ];
    const randomFactEl = document.getElementById('random-fact');
    if (randomFactEl) {
        randomFactEl.textContent = facts[Math.floor(Math.random() * facts.length)];
    }

    // --- Skill Bar "Animation" Trigger ---
    // CSS handles animation, JS just sets the variable from data-attribute
    document.querySelectorAll('.skills-list li').forEach(li => {
        const level = li.getAttribute('data-skill-level');
        if (level) {
            li.style.setProperty('--skill-level', level);
        }
    });

    // --- Cursor Sparkles ---
    const sparkleContainer = document.getElementById('cursor-sparkle-container');
    const sparkleColors = ['#FFD700', '#FF69B4', '#00FFFF', '#7FFF00', '#FF4500', '#9400D3'];
    let canSpawnSparkle = true;

    document.addEventListener('mousemove', (e) => {
        if (!canSpawnSparkle || !sparkleContainer) return;

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${e.pageX - 4}px`; // -4 to center 8px sparkle
        sparkle.style.top = `${e.pageY - 4}px`;
        sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        const randomScale = Math.random() * 0.5 + 0.8; // Random size between 0.8 and 1.3
        sparkle.style.transform = `scale(${randomScale}) rotate(${Math.random() * 360}deg)`;
        sparkle.style.opacity = '1'; // Make it appear

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800); // Matches animation duration

        canSpawnSparkle = false;
        setTimeout(() => {
            canSpawnSparkle = true;
        }, 50); // Throttle sparkle creation
    });


    // --- Achievement Unlocked System ---
    const achievementPopup = document.getElementById('achievement-unlocked');
    const achievementTextEl = document.getElementById('achievement-text');
    let achievementTimeout;

    function showAchievement(text) {
        if (!achievementPopup || !achievementTextEl) return;

        achievementTextEl.textContent = text;
        achievementPopup.classList.remove('hidden');
        achievementPopup.classList.add('show');

        clearTimeout(achievementTimeout); // Clear previous timeout if any
        achievementTimeout = setTimeout(() => {
            achievementPopup.classList.remove('show');
            achievementPopup.classList.add('hidden');
        }, 4000); // Show for 4 seconds
    }

    // Trigger some achievements
    let scrollCounter = 0;
    window.addEventListener('scroll', () => {
        scrollCounter++;
        if (scrollCounter === 20) {
            showAchievement("Scroll Master 📜!");
        }
        if (scrollCounter === 100) {
            showAchievement("Epic Scroller Pro Max! 🚀");
        }
    });

    // Initial "You're Here!" achievement
    setTimeout(() => showAchievement("You Made It! Welcome! 🎉"), 1500);


    // --- Silly Click Counter ---
    let totalClicks = 0;
    const clickCountElement = document.getElementById('click-count');
    document.addEventListener('click', (event) => {
        // Don't count clicks on buttons that have their own specific actions already
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'A') {
            totalClicks++;
            if (clickCountElement) {
                clickCountElement.textContent = totalClicks;
            }
            if (totalClicks === 10) showAchievement("Click Enthusiast! 👍");
            if (totalClicks === 50) showAchievement("Certified Clicker! 🖱️");
            if (totalClicks === 100) showAchievement("CLICKMAGEDDON! 💥");
        }
    });


    // --- More Silly Console Logs ---
    console.log("Pssst... you found the secret console club! Shhh! 🤫");
    setTimeout(() => console.log("Looking for bugs? Nah, these are *features* ✨"), 3000);
    setTimeout(() => console.warn("WARNING: Too much fun detected. Proceed with caution. Or don't. IDK."), 6000);

});