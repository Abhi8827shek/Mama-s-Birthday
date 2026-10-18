// ============================================
// BIRTHDAY SURPRISE — APPLICATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");

    // Start background music seamlessly on first interaction anywhere
    const tryStartMusic = () => {
        if (typeof startBackgroundMusic === "function") {
            startBackgroundMusic();
        }
        const audio = document.getElementById("background-music");
        if (audio && !audio.paused) {
            ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
                window.removeEventListener(evt, tryStartMusic);
                document.removeEventListener(evt, tryStartMusic);
            });
        }
    };

    ["click", "touchstart", "pointerdown", "keydown"].forEach((evt) => {
        window.addEventListener(evt, tryStartMusic, { passive: true });
        document.addEventListener(evt, tryStartMusic, { passive: true });
    });

    // Check whether PIN gate is enabled in CONFIG
    if (CONFIG && CONFIG.enablePinGate) {
        app.innerHTML = `
            <section class="pin-gate" aria-labelledby="pin-gate-title">
                <form class="pin-gate-form" id="pin-gate-form">
                    <h1 id="pin-gate-title">A special surprise awaits ❤️</h1>
                    <label for="access-pin">Enter Secret Code</label>
                    <input
                        id="access-pin"
                        name="pin"
                        type="password"
                        inputmode="text"
                        autocomplete="off"
                        autocapitalize="characters"
                        spellcheck="false"
                        required
                        autofocus
                        aria-describedby="pin-error"
                        placeholder="••••"
                    >
                    <p class="pin-error" id="pin-error" aria-live="polite"></p>
                    <button class="pin-submit" type="submit">Unlock Surprise 🌸</button>
                </form>
            </section>
        `;

        const form = document.getElementById("pin-gate-form");
        const pinInput = document.getElementById("access-pin");
        const pinError = document.getElementById("pin-error");
        const pinGate = document.querySelector(".pin-gate");
        let unlocked = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (unlocked) return;

            const expectedPin = (CONFIG.accessPin || "").toUpperCase();
            if (pinInput.value.trim().toUpperCase() !== expectedPin) {
                pinInput.setAttribute("aria-invalid", "true");
                pinError.textContent = "That code doesn't look right. Please try again! ❤️";
                pinInput.select();
                return;
            }

            unlocked = true;
            document.body.classList.add("app-unlocked");
            pinGate.remove();
            initializeScenes();
            handleFirstInteraction();

            console.log("Birthday Surprise initialized for Mom ❤️");
        });

        pinInput.addEventListener("input", () => {
            pinInput.removeAttribute("aria-invalid");
            pinError.textContent = "";
        });

        pinInput.focus();
    } else {
        // Direct seamless access for Mom
        document.body.classList.add("app-unlocked");
        initializeScenes();
        console.log("Birthday Surprise initialized for Mom ❤️");
    }
});