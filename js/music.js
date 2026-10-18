// ============================================
// BACKGROUND MUSIC CONTROLLER
// ============================================

let backgroundMusic = null;
let musicToggle = null;
let musicStarted = false;

document.addEventListener("DOMContentLoaded", () => {
    initMusicController();
});

function initMusicController() {
    backgroundMusic = document.getElementById("background-music");
    musicToggle = document.getElementById("music-toggle");

    if (!backgroundMusic) {
        console.warn("Background music audio element not found.");
        return;
    }

    // Set preferred default volume
    backgroundMusic.volume = 0.45;

    // Ensure audio source points to the configured song file
    const targetPath = (typeof CONFIG !== "undefined" && CONFIG.musicPath) 
        ? CONFIG.musicPath 
        : "music/birthday-special.mp3";

    if (!backgroundMusic.src || !backgroundMusic.src.includes("birthday-special")) {
        // If audio doesn't have an active source yet
        const existingSources = backgroundMusic.querySelectorAll("source");
        if (existingSources.length === 0) {
            backgroundMusic.src = targetPath;
        }
    }

    // Prevent any playback from trailing into the cut section and ensure seamless looping
    backgroundMusic.addEventListener("timeupdate", () => {
        if (backgroundMusic.duration && Number.isFinite(backgroundMusic.duration)) {
            // Loop cleanly 0.3s before end to prevent any decoder lag or clicks
            if (backgroundMusic.currentTime >= backgroundMusic.duration - 0.3) {
                backgroundMusic.currentTime = 0;
                backgroundMusic.play().catch(() => {});
            }
        }
    });

    if (musicToggle) {
        musicToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }
}

function startBackgroundMusic() {
    if (!backgroundMusic) {
        backgroundMusic = document.getElementById("background-music");
        if (!backgroundMusic) return;
    }

    if (musicStarted && !backgroundMusic.paused) {
        return;
    }

    backgroundMusic.volume = 0.45;

    const playPromise = backgroundMusic.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                musicStarted = true;
                updateToggleUI(true);
            })
            .catch((error) => {
                // Autoplay blocked by browser policy until direct user gesture
                console.log("Audio waiting for user gesture:", error.message);
            });
    }
}

function toggleMusic() {
    if (!backgroundMusic) {
        backgroundMusic = document.getElementById("background-music");
        if (!backgroundMusic) return;
    }

    if (backgroundMusic.paused) {
        backgroundMusic.volume = 0.45;
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    musicStarted = true;
                    updateToggleUI(true);
                })
                .catch((error) => {
                    console.error("Music could not resume:", error);
                });
        }
    } else {
        backgroundMusic.pause();
        updateToggleUI(false);
    }
}

function updateToggleUI(isPlaying) {
    if (!musicToggle) {
        musicToggle = document.getElementById("music-toggle");
    }
    if (!musicToggle) return;

    if (isPlaying) {
        musicToggle.textContent = "🔊";
        musicToggle.setAttribute("aria-label", "Pause music");
        musicToggle.classList.add("music-playing");
    } else {
        musicToggle.textContent = "🔇";
        musicToggle.setAttribute("aria-label", "Play music");
        musicToggle.classList.remove("music-playing");
    }
}