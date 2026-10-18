// ============================================
// BIRTHDAY SURPRISE — SCENE MANAGER (MOM'S EDITION)
// ============================================

const app = document.getElementById("app");


// ============================================
// SCENE TRANSITION
// ============================================

function switchScene(newScene) {
    const currentScene = document.querySelector(".scene.active");

    if (currentScene) {
        currentScene.classList.remove("active");
        setTimeout(() => {
            currentScene.remove();
        }, 800);
    }

    setTimeout(() => {
        newScene.classList.add("active");
    }, 100);
}


// ============================================
// 1. WELCOME SCENE
// ============================================

function createWelcomeScene() {
    const scene = document.createElement("section");
    scene.className = "scene welcome-scene active";
    scene.id = "welcome-scene";

    scene.innerHTML = `
        <div class="welcome-card welcome-card-with-photo">
            <span class="welcome-tag-badge">
                ${CONFIG.welcome.tag || "A Special Gift For You"}
            </span>

            <h1 class="welcome-heading">
                ${CONFIG.welcome.heading || "The Most Special Person in My Life ❤️"}
            </h1>

            <div class="mom-photo-wrapper">
                <span class="mom-photo-sparkle sparkle-tl">🌸</span>
                <span class="mom-photo-sparkle sparkle-tr">✨</span>
                <span class="mom-photo-sparkle sparkle-bl">💖</span>
                <span class="mom-photo-sparkle sparkle-br">🌷</span>

                <div class="mom-photo-frame">
                    <img
                        src="${CONFIG.welcome.photo || 'images/mom-main.jpg'}"
                        alt="${CONFIG.welcome.photoAlt || 'My beautiful mom on her birthday'}"
                        class="mom-main-photo"
                    >
                </div>
            </div>

            <span class="welcome-name">
                ${CONFIG.welcome.subtitle}
            </span>

            <button
                class="welcome-continue"
                id="welcome-continue"
            >
                ${CONFIG.welcome.continueText} →
            </button>
        </div>
    `;

    app.appendChild(scene);

    const continueButton = document.getElementById("welcome-continue");
    continueButton.addEventListener("click", () => {
        if (typeof startBackgroundMusic === "function") {
            startBackgroundMusic();
        }

        const welcomeMessageScene = createWelcomeMessageScene();
        switchScene(welcomeMessageScene);
    });

    return scene;
}


// ============================================
// 2. EMOTIONAL WELCOME MESSAGE SCENE
// ============================================

function createWelcomeMessageScene() {
    const scene = document.createElement("section");
    scene.className = "scene welcome-message-scene";
    scene.id = "welcome-message-scene";

    const paragraphs = (CONFIG.welcomeMessage.text || [])
        .map(p => `<p class="welcome-message-paragraph">${p}</p>`)
        .join("");

    scene.innerHTML = `
        <div class="welcome-card welcome-message-card">
            <span class="welcome-emoji">
                ${CONFIG.welcomeMessage.emoji}
            </span>

            <h1 class="welcome-title welcome-message-title">
                ${CONFIG.welcomeMessage.title}
            </h1>

            <span class="welcome-name welcome-message-subtitle">
                ${CONFIG.welcomeMessage.subtitle}
            </span>

            <div class="welcome-message-body">
                ${paragraphs}
            </div>

            <button
                class="welcome-continue welcome-message-continue"
                id="welcome-message-continue"
            >
                ${CONFIG.welcomeMessage.continueText} →
            </button>
        </div>
    `;

    app.appendChild(scene);

    const continueButton = document.getElementById("welcome-message-continue");
    continueButton.addEventListener("click", () => {
        const questionScene = createQuestionScene();
        switchScene(questionScene);
    });

    return scene;
}


// ============================================
// 3. CUTE QUESTION SCENE
// ============================================

function createQuestionScene() {
    const scene = document.createElement("section");
    scene.className = "scene question-scene";
    scene.id = "question-scene";

    scene.innerHTML = `
        <div class="question-card">
            <span class="question-emoji">
                ${CONFIG.question.emoji}
            </span>

            <h1 class="question-title">
                ${CONFIG.question.title}
                <span>
                    ${CONFIG.question.subtitle}
                </span>
            </h1>

            <div class="question-buttons-area" id="question-buttons-area">
                <div class="question-buttons" id="question-buttons">
                    <div class="yes-button-anchor" id="yes-button-anchor">
                        <button
                            class="question-button yes-button"
                            id="yes-button"
                        >
                            ${CONFIG.question.yesText}
                        </button>
                    </div>

                    <div class="no-button-anchor" id="no-button-anchor">
                        <button
                            class="question-button no-button"
                            id="no-button"
                        >
                            ${CONFIG.question.noText}
                        </button>
                    </div>
                </div>

                <div class="no-teaser-message" id="no-teaser-message" aria-live="polite"></div>
            </div>
        </div>
    `;

    app.appendChild(scene);
    setupQuestionButtons();

    return scene;
}

function setupQuestionButtons() {
    const card = document.querySelector(".question-card");
    const container = document.getElementById("question-buttons");
    const yesButton = document.getElementById("yes-button");
    const noButton = document.getElementById("no-button");
    const noAnchor = document.getElementById("no-button-anchor");
    const teaserEl = document.getElementById("no-teaser-message");

    if (!yesButton || !noButton || !container) return;

    // 1. YES button: always clickable, always moves to the lights scene
    yesButton.addEventListener("click", () => {
        const lightsScene = createLightsScene();
        switchScene(lightsScene);
    });

    // 2. Cute playful Hindi messages for Mom
    const hindiMessages = (CONFIG && CONFIG.question && Array.isArray(CONFIG.question.teaserMessages)) ?
        CONFIG.question.teaserMessages :
        [
            "अरे मम्मी, ये क्या! 😂",
            "नहीं चलेगा, मम्मी जी! 😜",
            "मुझे पकड़कर दिखाओ! 🏃‍♂️",
            "बस Yes दबा दो ना! 🥹❤️",
            "मम्मी, इतना भी क्या सोचना! 😂💕",
            "No का तो option ही नहीं है मम्मी! 🙈🌸"
        ];

    let messageIdx = 0;
    let messageTimer = null;
    let hasMoved = false;
    let isDodging = false;
    let lastDodgeTime = 0;

    function showTeaserMessage() {
        if (!teaserEl) return;
        const msg = hindiMessages[messageIdx % hindiMessages.length];
        messageIdx++;

        teaserEl.textContent = msg;
        teaserEl.classList.remove("visible");
        void teaserEl.offsetWidth; // trigger reflow for smooth pop
        teaserEl.classList.add("visible");

        if (messageTimer) clearTimeout(messageTimer);
        messageTimer = setTimeout(() => {
            if (teaserEl) teaserEl.classList.remove("visible");
        }, 3000);
    }

    // 3. Safe, clamped position calculation strictly inside container
    function getSafePosition() {
        const contRect = container.getBoundingClientRect();
        const yesRect = yesButton.getBoundingClientRect();

        const btnW = noButton.offsetWidth || 110;
        const btnH = noButton.offsetHeight || 44;

        const pad = 6;
        const maxX = Math.max(pad, container.clientWidth - btnW - pad);
        const maxY = Math.max(pad, container.clientHeight - btnH - pad);

        // Coordinates of Yes button relative to container
        const yesRelLeft = yesRect.left - contRect.left;
        const yesRelTop = yesRect.top - contRect.top;
        const yesRelRight = yesRelLeft + yesRect.width;
        const yesRelBottom = yesRelTop + yesRect.height;

        const buffer = 10; // Safety distance around Yes button

        function overlapsYes(x, y) {
            const r1 = { left: x, right: x + btnW, top: y, bottom: y + btnH };
            const r2 = {
                left: yesRelLeft - buffer,
                right: yesRelRight + buffer,
                top: yesRelTop - buffer,
                bottom: yesRelBottom + buffer
            };
            return !(
                r1.right < r2.left ||
                r1.left > r2.right ||
                r1.bottom < r2.top ||
                r1.top > r2.bottom
            );
        }

        const currX = parseFloat(noButton.style.left) || noButton.offsetLeft || 0;
        const currY = parseFloat(noButton.style.top) || noButton.offsetTop || 0;

        // Candidate strategic spots inside the container
        const candidates = [
            { x: pad, y: maxY },
            { x: Math.round((maxX + pad) / 2), y: maxY },
            { x: maxX, y: maxY },
            { x: maxX, y: pad },
            { x: maxX, y: Math.round((maxY + pad) / 2) },
            { x: pad, y: Math.round((maxY + pad) / 2) },
            { x: pad, y: pad }
        ];

        // Add 25 random exploratory positions
        for (let i = 0; i < 25; i++) {
            const rx = pad + Math.random() * (maxX - pad);
            const ry = pad + Math.random() * (maxY - pad);
            candidates.push({ x: rx, y: ry });
        }

        // Keep candidates that never overlap Yes button and stay within bounds
        const valid = candidates.filter(pt => {
            const cx = Math.min(Math.max(pad, pt.x), maxX);
            const cy = Math.min(Math.max(pad, pt.y), maxY);
            return !overlapsYes(cx, cy);
        });

        // Prefer candidates that are noticeably distant from the current spot
        const distant = valid.filter(pt => Math.hypot(pt.x - currX, pt.y - currY) >= 40);
        const pool = distant.length > 0 ? distant : (valid.length > 0 ? valid : null);

        if (pool && pool.length > 0) {
            const chosen = pool[Math.floor(Math.random() * pool.length)];
            return {
                x: Math.min(Math.max(pad, chosen.x), maxX),
                y: Math.min(Math.max(pad, chosen.y), maxY)
            };
        }

        // Absolute safe fallback within bounds below Yes
        return {
            x: Math.min(Math.max(pad, maxX), maxX),
            y: maxY
        };
    }

    function dodgeNoButton(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const now = Date.now();
        if (now - lastDodgeTime < 180) return;
        lastDodgeTime = now;
        isDodging = true;

        if (!hasMoved) {
            // First dodge: lock the anchor slot dimensions so YES button never moves
            const initialW = noButton.offsetWidth;
            const initialH = noButton.offsetHeight;
            const initialOffsetLeft = noButton.offsetLeft;
            const initialOffsetTop = noButton.offsetTop;

            if (noAnchor) {
                noAnchor.style.width = `${initialW}px`;
                noAnchor.style.height = `${initialH}px`;
                noAnchor.style.flexShrink = "0";
            }

            noButton.style.position = "absolute";
            noButton.style.left = `${initialOffsetLeft}px`;
            noButton.style.top = `${initialOffsetTop}px`;
            noButton.style.margin = "0";
            hasMoved = true;
        }

        const nextPos = getSafePosition();
        noButton.style.left = `${nextPos.x}px`;
        noButton.style.top = `${nextPos.y}px`;

        noButton.classList.remove("dodging");
        void noButton.offsetWidth; // trigger reflow for animation
        noButton.classList.add("dodging");

        showTeaserMessage();

        setTimeout(() => {
            isDodging = false;
        }, 280);
    }

    // 4. Register event listeners for desktop and mobile
    noButton.addEventListener("mouseenter", dodgeNoButton);
    noButton.addEventListener("pointerenter", dodgeNoButton);
    noButton.addEventListener("pointerdown", dodgeNoButton);
    noButton.addEventListener("touchstart", dodgeNoButton, { passive: false });
    noButton.addEventListener("click", dodgeNoButton);

    // Proximity approach detection on desktop
    function handlePointerMove(e) {
        if (isDodging) return;
        const rect = noButton.getBoundingClientRect();
        const buffer = 26;
        if (
            e.clientX >= rect.left - buffer &&
            e.clientX <= rect.right + buffer &&
            e.clientY >= rect.top - buffer &&
            e.clientY <= rect.bottom + buffer
        ) {
            dodgeNoButton(e);
        }
    }

    if (card) {
        card.addEventListener("pointermove", handlePointerMove);
    } else {
        container.addEventListener("pointermove", handlePointerMove);
    }

    // Window resize safeguard: keep No button strictly clamped
    window.addEventListener("resize", () => {
        if (hasMoved && noButton.style.position === "absolute") {
            const btnW = noButton.offsetWidth;
            const btnH = noButton.offsetHeight;
            const pad = 6;
            const maxX = Math.max(pad, container.clientWidth - btnW - pad);
            const maxY = Math.max(pad, container.clientHeight - btnH - pad);
            const curX = parseFloat(noButton.style.left) || pad;
            const curY = parseFloat(noButton.style.top) || pad;
            noButton.style.left = `${Math.min(Math.max(pad, curX), maxX)}px`;
            noButton.style.top = `${Math.min(Math.max(pad, curY), maxY)}px`;
        }
    });
}


// ============================================
// 4. LIGHTS / NIGHT-SKY SCENE
// ============================================

function createLightsScene() {
    const scene = document.createElement("section");
    scene.className = "scene lights-scene";
    scene.id = "lights-scene";

    scene.innerHTML = `
        <div class="midnight-sky">
            <div class="stars">
                <span class="star star-1"></span>
                <span class="star star-2"></span>
                <span class="star star-3"></span>
                <span class="star star-4"></span>
                <span class="star star-5"></span>
                <span class="star star-6"></span>
                <span class="star star-7"></span>
                <span class="star star-8"></span>
                <span class="star star-9"></span>
                <span class="star star-10"></span>
                <span class="star star-11"></span>
                <span class="star star-12"></span>
            </div>

            <div class="moon">
                ${CONFIG.lights.moon}
            </div>

            <div class="lights-content">
                <button
                    class="lights-button"
                    id="lights-button"
                >
                    <span class="lights-button-icon">
                        ${CONFIG.lights.buttonEmoji}
                    </span>
                    <span>
                        ${CONFIG.lights.buttonText}
                    </span>
                </button>
            </div>

            <div class="light-reveal" id="light-reveal"></div>
        </div>
    `;

    app.appendChild(scene);
    setupLightsButton();

    return scene;
}

function setupLightsButton() {
    const lightsButton = document.getElementById("lights-button");
    const lightsScene = document.getElementById("lights-scene");
    const lightReveal = document.getElementById("light-reveal");

    lightsButton.addEventListener("click", () => {
        lightsButton.disabled = true;

        lightsScene.classList.add("lights-on");
        lightReveal.classList.add("reveal-active");

        setTimeout(() => {
            showCelebrationSpace(lightsScene);
        }, 2400);
    });
}


// ============================================
// 5. CELEBRATION & DECORATION SPACE
// ============================================

function showCelebrationSpace(lightsScene) {
    const celebration = document.createElement("div");
    celebration.className = "celebration-space";

    celebration.innerHTML = `
        <div class="ambient-glow"></div>

        <div class="fairy-lights">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="celebration-sparkles">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
        </div>

        <div class="celebration-content">
            <p class="celebration-message">
                ${CONFIG.celebration.afterLightsText}
            </p>

            <button
                class="decorate-button"
                id="decorate-button"
            >
                ${CONFIG.celebration.decorateText}
            </button>
        </div>
    `;

    lightsScene.appendChild(celebration);

    requestAnimationFrame(() => {
        celebration.classList.add("celebration-visible");
    });

    const decorateButton = document.getElementById("decorate-button");
    decorateButton.addEventListener("click", () => {
        startDecorationSequence(celebration);
    });
}

function startDecorationSequence(celebration) {
    const decorateButton = document.getElementById("decorate-button");
    decorateButton.disabled = true;
    decorateButton.style.pointerEvents = "none";

    const content = celebration.querySelector(".celebration-content");
    content.classList.add("decoration-started");

    setTimeout(() => {
        activateFairyLights(celebration);
    }, 400);

    setTimeout(() => {
        createFloatingDecorations(celebration);
    }, 1300);

    setTimeout(() => {
        createConfettiBurst(celebration);
    }, 2400);

    setTimeout(() => {
        showDecorationComplete(celebration);
    }, 3600);
}

function activateFairyLights(celebration) {
    const lights = celebration.querySelectorAll(".fairy-lights span");
    lights.forEach((light, index) => {
        setTimeout(() => {
            light.classList.add("light-active");
        }, index * 90);
    });
}

function createFloatingDecorations(celebration) {
    const container = document.createElement("div");
    container.className = "floating-decorations";

    const decorations = [
        "🌸", "💖", "✨", "🌷", "⭐", "💗", "✦", "🌹", "✨", "🌸"
    ];

    decorations.forEach((symbol, index) => {
        const element = document.createElement("span");
        element.className = "floating-decoration";
        element.textContent = symbol;
        element.style.left = `${8 + Math.random() * 84}%`;
        element.style.top = `${20 + Math.random() * 60}%`;
        element.style.animationDelay = `${index * 0.15}s`;
        container.appendChild(element);
    });

    celebration.appendChild(container);

    requestAnimationFrame(() => {
        container.classList.add("decorations-visible");
    });
}

function createConfettiBurst(celebration) {
    const container = document.createElement("div");
    container.className = "confetti-container";
    celebration.appendChild(container);

    const pieces = ["🌸", "✦", "💖", "✧", "•", "◆", "✨"];

    for (let i = 0; i < 48; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animationDelay = `${Math.random() * 0.8}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(piece);
    }

    setTimeout(() => {
        container.remove();
    }, 5000);
}

function showDecorationComplete(celebration) {
    const content = celebration.querySelector(".celebration-content");

    content.innerHTML = `
        <div class="decoration-complete">
            <div class="complete-sparkle">🌸 ✨ 🌸</div>

            <h2>
                ${CONFIG.decorations.completeMessage}
            </h2>

            <p>
                ${CONFIG.decorations.nextMessage}
            </p>

            <button
                class="balloon-button"
                id="balloon-button"
            >
                ${CONFIG.decorations.balloonButtonText}
            </button>
        </div>
    `;

    content.classList.remove("decoration-started");
    content.classList.add("decoration-complete-visible");

    const balloonButton = document.getElementById("balloon-button");
    balloonButton.addEventListener("click", () => {
        startBalloonScene(celebration);
    });
}

function startBalloonScene(celebration) {
    celebration.classList.add("balloon-transition");

    setTimeout(() => {
        celebration.innerHTML = `
            <div class="balloon-scene">
                <div class="balloon-container" id="balloon-container"></div>

                <div class="birthday-final-text" id="birthday-final-text">
                    <div class="birthday-title">
                        ${CONFIG.balloons.title}
                    </div>

                    <div class="birthday-subtitle">
                        ${CONFIG.balloons.subtitle}
                    </div>
                </div>
            </div>
        `;

        celebration.classList.remove("balloon-transition");
        celebration.classList.add("balloon-scene-active");

        createBalloons();
    }, 700);
}

function createBalloons() {
    const container = document.getElementById("balloon-container");
    const balloonColors = [
        "#ff6f91", "#ff8fab", "#c77dff", "#9d8cff",
        "#ffb4a2", "#ffd166", "#fbcfe8", "#e9d5ff"
    ];

    const count = (CONFIG.balloons && CONFIG.balloons.count) || 26;

    for (let i = 0; i < count; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${Math.random() * 100}%`;

        const size = 44 + Math.random() * 24;
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.22}px`;

        balloon.style.setProperty(
            "--balloon-color",
            balloonColors[Math.floor(Math.random() * balloonColors.length)]
        );

        const duration = 6 + Math.random() * 5;
        balloon.style.animationDuration = `${duration}s`;

        const delay = Math.random() * 3;
        balloon.style.animationDelay = `${delay}s`;

        balloon.style.setProperty(
            "--rotation",
            `${-8 + Math.random() * 16}deg`
        );

        balloon.innerHTML = `
            <div class="balloon-body"></div>
            <div class="balloon-string"></div>
        `;

        container.appendChild(balloon);
    }

    setTimeout(() => {
        const message = document.getElementById("birthday-final-text");
        if (message) {
            message.classList.add("birthday-text-visible");
        }
        createCelebrationConfetti();

        setTimeout(() => {
            showCakeButton();
        }, 3200);
    }, 4800);
}

function showCakeButton() {
    const birthdayText = document.getElementById("birthday-final-text");
    if (!birthdayText) return;

    const button = document.createElement("button");
    button.className = "cake-next-button";
    button.textContent = (CONFIG.balloons && CONFIG.balloons.cakeButtonText) || "🎂 Let's celebrate";

    birthdayText.appendChild(button);

    requestAnimationFrame(() => {
        button.classList.add("cake-button-visible");
    });

    button.addEventListener("click", () => {
        startCakeScene();
    });
}


// ============================================
// 6. CAKE SCENE
// ============================================

function startCakeScene() {
    const celebration = document.querySelector(".celebration-space");
    celebration.classList.add("cake-transition");

    setTimeout(() => {
        celebration.innerHTML = `
            <div class="cake-scene">
                <div class="cake-stars">
                    <span>✦</span>
                    <span>✧</span>
                    <span>✦</span>
                    <span>✧</span>
                    <span>✦</span>
                </div>

                <div class="cake-content">
                    <div class="cake-illustration" id="cake-illustration">
                        <div class="cake-glow"></div>

                        <div class="cake">
                            <div class="cake-top">
                                <div class="candle">
                                    <div class="flame"></div>
                                </div>
                                <div class="candle">
                                    <div class="flame"></div>
                                </div>
                                <div class="candle">
                                    <div class="flame"></div>
                                </div>
                            </div>

                            <div class="cake-middle">
                                <div class="cake-cream"></div>
                            </div>

                            <div class="cake-bottom">
                                <div class="cake-cream"></div>
                            </div>

                            <div class="cake-plate"></div>
                        </div>
                    </div>

                    <div class="cake-message" id="cake-message">
                        ${CONFIG.cake.title}
                    </div>

                    <button
                        class="cut-cake-button"
                        id="cut-cake-button"
                    >
                        ${CONFIG.cake.buttonText}
                    </button>
                </div>
            </div>
        `;

        celebration.classList.remove("cake-transition");
        celebration.classList.add("cake-scene-active");

        setupCakeScene();
    }, 700);
}

function setupCakeScene() {
    const cake = document.getElementById("cake-illustration");
    const candles = document.querySelectorAll(".candle");
    const cutButton = document.getElementById("cut-cake-button");

    setTimeout(() => {
        cake.classList.add("cake-visible");
    }, 300);

    candles.forEach((candle, index) => {
        setTimeout(() => {
            candle.classList.add("candle-lit");
        }, 1100 + index * 450);
    });

    cutButton.addEventListener("click", () => {
        cutCake();
    });
}

function cutCake() {
    const cake = document.getElementById("cake-illustration");
    const button = document.getElementById("cut-cake-button");

    button.disabled = true;
    button.classList.add("button-hidden");
    cake.classList.add("cake-cutting");

    setTimeout(() => {
        createCakeCelebration();
    }, 850);

    setTimeout(() => {
        showCakeComplete();
    }, 1800);
}

function createCakeCelebration() {
    const scene = document.querySelector(".cake-scene");
    if (!scene) return;

    const container = document.createElement("div");
    container.className = "falling-stars";
    scene.appendChild(container);

    const stars = ["✦", "✧", "⋆", "🌸", "✦", "💖"];

    for (let i = 0; i < 45; i++) {
        const star = document.createElement("span");
        star.className = "falling-star";
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${-10 - Math.random() * 30}%`;

        const size = 11 + Math.random() * 18;
        star.style.fontSize = `${size}px`;

        const duration = 2.5 + Math.random() * 3;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 1.5}s`;

        const drift = -60 + Math.random() * 120;
        star.style.setProperty("--star-drift", `${drift}px`);

        const rotation = 180 + Math.random() * 360;
        star.style.setProperty("--star-rotation", `${rotation}deg`);

        container.appendChild(star);
    }
}

function showCakeComplete() {
    const message = document.getElementById("cake-message");
    if (!message) return;

    message.innerHTML = `
        <div class="cake-complete-icon">🎂 🌸</div>

        <div>
            ${CONFIG.cake.afterCutMessage}
        </div>

        <p>
            ${CONFIG.cake.nextMessage}
        </p>

        <button
            class="gift-next-button"
            id="gift-next-button"
        >
            ${CONFIG.cake.giftButtonText || "🎁 One More Surprise"}
        </button>
    `;

    message.classList.add("cake-complete-visible");

    const giftButton = document.getElementById("gift-next-button");
    giftButton.addEventListener("click", () => {
        startGiftScene();
    });
}


// ============================================
// 7. GIFT SCENE
// ============================================

function startGiftScene() {
    const celebration = document.querySelector(".celebration-space");
    celebration.classList.add("gift-transition");

    setTimeout(() => {
        celebration.innerHTML = `
            <div class="gift-scene">
                <div class="gift-stars">
                    <span>✦</span>
                    <span>✧</span>
                    <span>⋆</span>
                    <span>✦</span>
                    <span>✧</span>
                </div>

                <div class="gift-content">
                    <div class="gift-illustration" id="gift-illustration">
                        <div class="gift-glow"></div>

                        <div class="gift-box">
                            <div class="gift-lid">
                                <div class="gift-ribbon-horizontal"></div>
                            </div>

                            <div class="gift-body">
                                <div class="gift-inside-glow"></div>
                                <div class="gift-ribbon-vertical"></div>
                                <div class="gift-ribbon-horizontal"></div>
                            </div>
                        </div>
                    </div>

                    <div class="gift-message" id="gift-message">
                        <p class="gift-intro">
                            ${CONFIG.gift.intro}
                        </p>
                    </div>

                    <button
                        class="open-gift-button"
                        id="open-gift-button"
                    >
                        ${CONFIG.gift.buttonText}
                    </button>
                </div>
            </div>
        `;

        celebration.classList.remove("gift-transition");
        celebration.classList.add("gift-scene-active");

        setupGiftScene();
    }, 700);
}

function setupGiftScene() {
    const gift = document.getElementById("gift-illustration");
    const button = document.getElementById("open-gift-button");

    setTimeout(() => {
        gift.classList.add("gift-visible");
    }, 300);

    button.addEventListener("click", () => {
        openGift();
    });
}

function openGift() {
    const gift = document.getElementById("gift-illustration");
    const button = document.getElementById("open-gift-button");

    button.disabled = true;
    button.classList.add("gift-button-hidden");
    gift.classList.add("gift-shaking");

    setTimeout(() => {
        gift.classList.remove("gift-shaking");
        gift.classList.add("gift-opening");

        setTimeout(() => {
            createGiftStars();
        }, 300);

        setTimeout(() => {
            showGiftMessage();
        }, 3600);
    }, 900);
}

function createGiftStars() {
    const scene = document.querySelector(".gift-scene");
    if (!scene) return;

    const container = document.createElement("div");
    container.className = "gift-rising-stars";
    scene.appendChild(container);

    const symbols = ["✦", "✧", "⋆", "🌸", "💖"];

    for (let i = 0; i < 26; i++) {
        const star = document.createElement("span");
        star.className = "gift-rising-star";
        star.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        star.style.left = `${44 + Math.random() * 12}%`;
        star.style.top = `${55 + Math.random() * 10}%`;

        const size = 9 + Math.random() * 14;
        star.style.fontSize = `${size}px`;

        const duration = 1.8 + Math.random() * 1.7;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${Math.random() * 1.2}s`;

        const drift = -70 + Math.random() * 140;
        star.style.setProperty("--gift-star-drift", `${drift}px`);

        const rotation = -180 + Math.random() * 360;
        star.style.setProperty("--gift-star-rotation", `${rotation}deg`);

        container.appendChild(star);
    }
}

function showGiftMessage() {
    const message = document.getElementById("gift-message");
    if (!message) return;

    message.innerHTML = `
        <p class="gift-final-message">
            ${CONFIG.gift.finalMessage}
        </p>

        <button
            class="gift-continue-button"
            id="gift-continue-button"
        >
            ${CONFIG.gift.continueText} →
        </button>
    `;

    message.classList.add("gift-message-visible");

    const continueButton = document.getElementById("gift-continue-button");
    continueButton.addEventListener("click", () => {
        startLetterScene();
    });
}


// ============================================
// 8. HEARTFELT LETTER SCENE (TYPEWRITER)
// ============================================

function startLetterScene() {
    const celebration = document.querySelector(".celebration-space");
    celebration.classList.add("letter-transition");

    setTimeout(() => {
        celebration.innerHTML = `
            <div class="letter-scene">
                <div class="letter-background-stars">
                    <span>✦</span>
                    <span>✧</span>
                    <span>⋆</span>
                    <span>🌸</span>
                    <span>✧</span>
                </div>

                <div class="letter-content">
                    <div class="letter-paper" id="letter-paper">
                        <div class="letter-paper-decoration">
                            🌸 ✦ 🌸
                        </div>

                        <div class="letter-text" id="letter-text"></div>

                        <div class="letter-cursor" id="letter-cursor">
                            |
                        </div>

                        <div class="letter-paper-decoration letter-decoration-bottom">
                            🌸 ✦ 🌸
                        </div>
                    </div>
                </div>
            </div>
        `;

        celebration.classList.remove("letter-transition");
        celebration.classList.add("letter-scene-active");

        setupLetterScene();
    }, 700);
}

function setupLetterScene() {
    const paper = document.getElementById("letter-paper");

    setTimeout(() => {
        paper.classList.add("letter-paper-visible");

        setTimeout(() => {
            typeBirthdayLetter();
        }, 800);
    }, 250);
}

async function typeBirthdayLetter() {
    const letterText = document.getElementById("letter-text");
    const cursor = document.getElementById("letter-cursor");
    const paper = document.getElementById("letter-paper");
    if (!letterText) return;

    letterText.innerHTML = "";

    const letterContent = (CONFIG && CONFIG.letter) ? CONFIG.letter : [];

    // Grapheme cluster segmenter ensures Hindi matras and conjuncts render cleanly during typing
    const getGraphemes = (text) => {
        if (typeof Intl !== "undefined" && Intl.Segmenter) {
            try {
                const segmenter = new Intl.Segmenter("hi", { granularity: "grapheme" });
                return Array.from(segmenter.segment(text), s => s.segment);
            } catch (e) {
                return [...text];
            }
        }
        return [...text];
    };

    for (const section of letterContent) {
        const element = document.createElement("div");
        element.className = `letter-${section.type}`;
        letterText.appendChild(element);

        const characters = getGraphemes(section.text);

        for (const character of characters) {
            element.textContent += character;
            if (paper) {
                paper.scrollTop = paper.scrollHeight;
            }
            await sleep(getTypingSpeed(character));
        }

        // Gentle pause between sections
        await sleep(section.type === "heading" ? 500 : 320);
    }

    if (cursor) {
        cursor.classList.add("letter-cursor-hidden");
    }

    showLetterContinue();
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function getTypingSpeed(character) {
    if (character === "." || character === "," || character === "!" || character === "?" || character === "।" || character === "—" || character === "…") {
        return 75;
    }
    if (character === "\n") {
        return 120;
    }
    return 22;
}

function showLetterContinue() {
    const letterText = document.getElementById("letter-text");
    const paper = document.getElementById("letter-paper");
    if (!letterText) return;

    const continueContainer = document.createElement("div");
    continueContainer.className = "letter-continue-container";

    const buttonLabel = (CONFIG && CONFIG.letterContinueText) ? CONFIG.letterContinueText : "चलो, यादों की गलियों में चलते हैं 🌸 →";

    continueContainer.innerHTML = `
        <button
            class="letter-continue-button"
            id="letter-continue-button"
        >
            ${buttonLabel}
        </button>
    `;

    letterText.appendChild(continueContainer);

    setTimeout(() => {
        continueContainer.classList.add("letter-continue-visible");
        if (paper) {
            paper.scrollTo({ top: paper.scrollHeight, behavior: "smooth" });
        }
    }, 600);

    const button = document.getElementById("letter-continue-button");
    button.addEventListener("click", () => {
        startGalleryScene();
    });
}

function createCelebrationConfetti() {
    const balloonScene = document.querySelector(".balloon-scene");
    if (!balloonScene) return;

    const container = document.createElement("div");
    container.className = "celebration-confetti";
    balloonScene.appendChild(container);

    const symbols = ["✦", "✧", "◆", "●", "♥", "🌸", "💖"];

    for (let i = 0; i < 70; i++) {
        const piece = document.createElement("span");
        piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.animationDelay = `${Math.random() * 2}s`;
        piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
        container.appendChild(piece);
    }
}


// ============================================
// PHOTO MEMORIES GALLERY SCENE (SECTION A)
// ============================================

let currentGalleryIndex = 0;
let galleryAutoplayInterval = null;

function startGalleryScene() {
    const celebration = document.querySelector(".celebration-space");
    celebration.classList.add("photo-transition");

    setTimeout(() => {
        const galleryConfig = (CONFIG && CONFIG.gallery) || {};
        const photos = galleryConfig.photos || [];
        currentGalleryIndex = 0;

        celebration.innerHTML = `
            <div class="gallery-scene">
                <div class="photo-background-stars">
                    <span>✦</span>
                    <span>✧</span>
                    <span>⋆</span>
                    <span>🌸</span>
                    <span>💖</span>
                </div>

                <div class="gallery-card">
                    <div class="gallery-header">
                        <span class="gallery-tag">
                            ${galleryConfig.tag || "🌸 A Walk Down Memory Lane"}
                        </span>
                        <h2 class="gallery-title">
                            ${galleryConfig.title || "Cherished Memories With You ❤️"}
                        </h2>
                        <span class="gallery-counter-badge" id="gallery-counter">
                            Photo 1 of ${photos.length}
                        </span>
                    </div>

                    <div class="gallery-photo-wrapper">
                        <span class="mom-photo-sparkle sparkle-tl">✨</span>
                        <span class="mom-photo-sparkle sparkle-tr">💖</span>
                        <span class="mom-photo-sparkle sparkle-bl">🌸</span>
                        <span class="mom-photo-sparkle sparkle-br">🌷</span>

                        <div class="gallery-photo-frame">
                            <img
                                id="gallery-photo"
                                class="gallery-photo fade-in"
                                src="${photos[0] ? photos[0].src : ''}"
                                alt="${photos[0] ? photos[0].alt : 'Mom memory photo'}"
                            >
                        </div>
                    </div>

                    <div class="gallery-caption-box">
                        <p id="gallery-caption" class="gallery-caption">
                            ${photos[0] ? photos[0].caption : ''}
                        </p>
                    </div>

                    <div class="gallery-controls">
                        <button class="gallery-nav-btn" id="gallery-prev" aria-label="Previous photo">
                            ← Previous
                        </button>
                        <button class="gallery-autoplay-btn" id="gallery-autoplay" aria-label="Toggle slideshow">
                            ▶ Play Slideshow
                        </button>
                        <button class="gallery-nav-btn" id="gallery-next" aria-label="Next photo">
                            Next →
                        </button>
                    </div>

                    <div class="gallery-dots" id="gallery-dots">
                        ${photos.map((_, i) => `<button class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Go to photo ${i + 1}"></button>`).join('')}
                    </div>

                    <button class="gallery-continue-btn" id="gallery-continue">
                        ${galleryConfig.continueText || "Continue to Final Surprise ✨"} →
                    </button>
                </div>
            </div>
        `;

        celebration.classList.remove("photo-transition");
        celebration.classList.add("photo-scene-active");

        setupGalleryScene(photos);
    }, 700);
}

function setupGalleryScene(photos) {
    if (!photos || photos.length === 0) return;

    const photoImg = document.getElementById("gallery-photo");
    const captionEl = document.getElementById("gallery-caption");
    const counterEl = document.getElementById("gallery-counter");
    const prevBtn = document.getElementById("gallery-prev");
    const nextBtn = document.getElementById("gallery-next");
    const autoplayBtn = document.getElementById("gallery-autoplay");
    const continueBtn = document.getElementById("gallery-continue");
    const dotsContainer = document.getElementById("gallery-dots");

    function renderPhoto(index) {
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentGalleryIndex = index;

        photoImg.classList.remove("fade-in");
        photoImg.classList.add("fade-out");
        captionEl.style.opacity = "0";

        setTimeout(() => {
            const currentItem = photos[currentGalleryIndex];
            photoImg.src = currentItem.src;
            photoImg.alt = currentItem.alt || "Mom memory photo";
            captionEl.textContent = currentItem.caption || "";
            counterEl.textContent = `Photo ${currentGalleryIndex + 1} of ${photos.length}`;

            // Update dots
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll(".gallery-dot");
                dots.forEach((dot, idx) => {
                    dot.classList.toggle("active", idx === currentGalleryIndex);
                });
            }

            photoImg.classList.remove("fade-out");
            photoImg.classList.add("fade-in");
            captionEl.style.opacity = "1";
        }, 220);
    }

    prevBtn.addEventListener("click", () => {
        stopAutoplay();
        renderPhoto(currentGalleryIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        stopAutoplay();
        renderPhoto(currentGalleryIndex + 1);
    });

    // Dot navigation
    if (dotsContainer) {
        dotsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("gallery-dot")) {
                stopAutoplay();
                const targetIdx = parseInt(e.target.getAttribute("data-index"), 10);
                renderPhoto(targetIdx);
            }
        });
    }

    // Slideshow autoplay
    let isPlaying = false;
    function startAutoplay() {
        isPlaying = true;
        autoplayBtn.textContent = "⏸ Pause";
        autoplayBtn.style.background = "rgba(255, 143, 171, 0.45)";
        galleryAutoplayInterval = setInterval(() => {
            renderPhoto(currentGalleryIndex + 1);
        }, 3800);
    }

    function stopAutoplay() {
        if (galleryAutoplayInterval) {
            clearInterval(galleryAutoplayInterval);
            galleryAutoplayInterval = null;
        }
        isPlaying = false;
        if (autoplayBtn) {
            autoplayBtn.textContent = "▶ Play Slideshow";
            autoplayBtn.style.background = "";
        }
    }

    autoplayBtn.addEventListener("click", () => {
        if (isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    continueBtn.addEventListener("click", () => {
        stopAutoplay();
        startFinalScene();
    });
}


// ============================================
// 9. FINAL BIRTHDAY PHOTO SCENE (SECTION B)
// ============================================

function startFinalScene() {
    const celebration = document.querySelector(".celebration-space");
    celebration.classList.add("final-transition");

    setTimeout(() => {
        const finalConfig = (CONFIG && CONFIG.final) || {};
        const messages = finalConfig.messages || [
            "Thank you for your love, care, and everything you do for me.",
            "I love you more than words can say."
        ];

        celebration.innerHTML = `
            <div class="final-scene">
                <div class="final-stars">
                    <span>✦</span>
                    <span>✧</span>
                    <span>⋆</span>
                    <span>🌸</span>
                    <span>💖</span>
                    <span>⋆</span>
                </div>

                <div class="final-card-with-photo" id="final-content">
                    <span class="welcome-tag-badge">
                        🌸 Forever Loved & Celebrated
                    </span>

                    <div class="final-photo-wrapper">
                        <span class="mom-photo-sparkle sparkle-tl">🌸</span>
                        <span class="mom-photo-sparkle sparkle-tr">✨</span>
                        <span class="mom-photo-sparkle sparkle-bl">💖</span>
                        <span class="mom-photo-sparkle sparkle-br">🌷</span>

                        <div class="final-photo-frame">
                            <img
                                src="${finalConfig.photo || 'images/mom-final.jpg'}"
                                alt="${finalConfig.photoAlt || 'Happy Birthday Mom'}"
                                class="final-mom-photo"
                            >
                        </div>
                    </div>

                    <h1 class="final-birthday-heading">
                        ${finalConfig.heading || "Happy Birthday, Mom ❤️"}
                    </h1>

                    <div class="final-messages-container">
                        ${messages.map(m => `<p class="final-message-line">${m}</p>`).join('')}
                    </div>

                    <div class="final-signature-text">
                        ${(finalConfig.signature || "With all my love,\nAbhishek Kumar ❤️").replace(/\n/g, '<br>')}
                    </div>

                    <button
                        class="final-replay-btn"
                        id="replay-button"
                    >
                        ${finalConfig.replayText || "↻ Replay the Surprise"}
                    </button>
                </div>
            </div>
        `;

        celebration.classList.remove("final-transition");
        celebration.classList.add("final-scene-active");

        setupFinalScene();
    }, 700);
}

function setupFinalScene() {
    const replay = document.getElementById("replay-button");

    if (replay) {
        replay.addEventListener("click", () => {
            // Clean, graceful reset from the beginning without broken state
            if (typeof backgroundMusic !== "undefined" && backgroundMusic) {
                backgroundMusic.currentTime = 0;
                backgroundMusic.play().catch(() => {});
            }

            const app = document.getElementById("app");
            if (app) {
                app.innerHTML = "";
            }

            initializeScenes();
        });
    }
}


// ============================================
// INITIALIZE
// ============================================

function initializeScenes() {
    createWelcomeScene();
}