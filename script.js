/* 🌌 GLOBAL STYLES */
:root {
    --color-primary: #00eaff;
    --color-secondary: #ff00c3;
    --glass-bg: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.15);
}

body {
    margin: 0;
    padding: 0;
    font-family: "Inter", sans-serif;
    background-image: url('https://wallpapercg.com/media/ts_1x/6588.webp');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    color: white;
}

/* DARK OVERLAY */
body::after {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    pointer-events: none;
}

/* SIDEBAR */
#sidekick-menu {
    position: fixed;
    top: 0;
    left: -260px;
    width: 240px;
    height: 100%;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    padding: 1rem;
    transition: 0.3s ease;
    border-right: 1px solid var(--glass-border);
}
#sidekick-menu.menu-active { left: 0; }

/* MENU BUTTON */
#menu-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem;
    padding: 15px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    font-size: 24px;
}

/* GLASS PANELS */
.glass {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 12px;
}

/* GRID */
.widgets-grid {
    display: grid;
    gap: 1rem;
    padding: 1rem;
}
@media (min-width: 768px) {
    .widgets-grid { grid-template-columns: repeat(4, 1fr); }
}

/* CARDS */
.card-list {
    display: grid;
    gap: 0.7rem;
}
.card-list a {
    padding: 1rem;
    border-radius: 10px;
    display: block;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    transition: 0.25s;
}
.card-list a:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 12px var(--color-primary);
}

/* FAB BUTTON */
.code-button {
    position: fixed;
    bottom: 2.5rem;
    right: 1.5rem;
    padding: 17px 24px;
    border-radius: 50px;
    background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
    border: none;
    font-weight: bold;
}

/* RIPPLE EFFECT */
.ripple-effect {
    position: relative;
    overflow: hidden;
}
.ripple {
    position: absolute;
    background: white;
    opacity: 0.4;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.5s linear;
}
@keyframes ripple {
    to { transform: scale(4); opacity: 0; }
}

/* SANDBOX */
#coding-room {
    padding: 1rem;
}
.hidden { display: none; }

.code-editor {
    height: 270px;
    margin-top: 1rem;
    border-radius: 8px;
}

#live-preview {
    width: 100%;
    height: 250px;
    margin-top: 1rem;
    background: white;
    border: none;
}

/* PROGRESS BAR */
.progress-bar {
    width: 100%;
    height: 5px;
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
}
#goal-bar {
    height: 100%;
    width: 0%;
    background: var(--color-secondary);
    transition: 0.7s;
}
