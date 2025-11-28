// --- DOM ELEMENTS ---
const menuToggle = document.getElementById("menu-toggle");
const sidekickMenu = document.getElementById("sidekick-menu");
const codeFab = document.getElementById("code-fab");
const mainDashboard = document.getElementById("main-dashboard-content");

const realTimeClock = document.getElementById("real-time-clock");
const weatherDisplay = document.getElementById("weather-display");
const visitCountDisplay = document.getElementById("visit-count");

const dailyHoursEl = document.getElementById("daily-hours");
const streakDaysEl = document.getElementById("streak-days");
const goalBar = document.getElementById("goal-bar");

const codingRoom = document.getElementById("coding-room");
const closeCodeRoom = document.getElementById("close-code-room");
const codingStatus = document.getElementById("coding-room-status");

const runCodeButton = document.getElementById("run-code");
const saveStatus = document.getElementById("save-status");
const livePreviewFrame = document.getElementById("live-preview");

const typewriterElement = document.getElementById("welcome-message-typewriter");

// --- STATE ---
let visitors = 300;
let timeSpent = 3.2;
let streak = 4;

let currentRate = 0.007704;

// --- TYPEWRITER ---
const messages = [
    "EDERSTONE SYSTEMS - BOOT COMPLETE.",
    "CODE SANDBOX ONLINE.",
    "AI MODULES: READY.",
    "WELCOME BACK, DEVELOPER."
];
let msgIndex = 0;

function typeWriter(text, el, i = 0) {
    if (i < text.length) {
        el.textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriter(text, el, i + 1), 50);
    } else {
        setTimeout(() => eraseWriter(text, el), 2000);
    }
}
function eraseWriter(text, el, i = text.length) {
    if (i > 0) {
        el.textContent = text.substring(0, i - 1);
        setTimeout(() => eraseWriter(text, el, i - 1), 30);
    } else {
        msgIndex = (msgIndex + 1) % messages.length;
        typeWriter(messages[msgIndex], el);
    }
}
typeWriter(messages[0], typewriterElement);

// --- REAL-TIME WIDGETS ---
function updateWidgets() {
    realTimeClock.textContent = new Date().toLocaleTimeString();

    visitors += Math.floor(Math.random() * 3);
    visitCountDisplay.textContent = visitors;

    timeSpent += 0.004;
    dailyHoursEl.textContent = `${timeSpent.toFixed(2)}h`;

    const percent = Math.min(100, (timeSpent / 4) * 100);
    goalBar.style.width = `${percent}%`;

    streakDaysEl.textContent = `${streak} days`;

    updateForex();
}
setInterval(updateWidgets, 1000);

// --- FOREX SIM ---
function updateForex() {
    const change = (Math.random() - 0.5) * 0.000005;
    currentRate = Math.max(0.0075, Math.min(0.0079, currentRate + change));

    const forex = document.getElementById("forex-rate");
    forex.textContent = `1 KES = ${currentRate.toFixed(6)} USD`;
}
weatherDisplay.textContent = "Nairobi - Cloudy, Mild Winds";

// --- RIPPLE EFFECT ---
document.querySelectorAll(".ripple-effect").forEach(el => {
    el.addEventListener("click", e => {
        const circle = document.createElement("span");
        const diameter = Math.max(el.clientWidth, el.clientHeight);
        const radius = diameter / 2;

        const rect = el.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.className = "ripple";

        const existing = el.querySelector(".ripple");
        if (existing) existing.remove();

        el.appendChild(circle);

        circle.addEventListener("animationend", () => circle.remove(), { once: true });
    });
});

// --- MENU ---
menuToggle.addEventListener("click", () => {
    sidekickMenu.classList.toggle("menu-active");
});

// --- CODING SANDBOX ---
let htmlEditor, cssEditor, jsEditor;
function toggleCoding(show) {
    if (show) {
        mainDashboard.classList.add("hidden");
        codingRoom.classList.remove("hidden");
        codingStatus.textContent = "ONLINE";

        if (!htmlEditor) initializeEditors();
    } else {
        mainDashboard.classList.remove("hidden");
        codingRoom.classList.add("hidden");
        codingStatus.textContent = "OFFLINE";
    }
}

codeFab.addEventListener("click", () => toggleCoding(true));
closeCodeRoom.addEventListener("click", () => toggleCoding(false));

// --- MONACO EDITORS ---
function initializeEditors() {
    htmlEditor = monaco.editor.create(document.getElementById("html-editor"), {
        value: "<h1>Hello World</h1>",
        language: "html",
        theme: "vs-dark"
    });

    cssEditor = monaco.editor.create(document.getElementById("css-editor"), {
        value: "body { font-family: Arial; }",
        language: "css",
        theme: "vs-dark"
    });

    jsEditor = monaco.editor.create(document.getElementById("js-editor"), {
        value: "console.log('Hello');",
        language: "javascript",
        theme: "vs-dark"
    });

    // Debounced Auto Save + Auto Run
    let runTimeout;
    [htmlEditor, cssEditor, jsEditor].forEach(ed => {
        ed.onDidChangeModelContent(() => {
            saveStatus.textContent = "Saving...";
            clearTimeout(runTimeout);
            runTimeout = setTimeout(() => {
                saveStatus.textContent = "Saved";
                runPreview();
            }, 600);
        });
    });
}

// --- RUN PREVIEW ---
function runPreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    livePreviewFrame.srcdoc = `
        <html>
            <head><style>${css}</style></head>
            <body>${html}<script>${js}<\/script></body>
        </html>
    `;
}

runCodeButton.addEventListener("click", runPreview);
