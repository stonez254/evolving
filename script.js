// --- 1. GLOBAL DOM ELEMENT SELECTION ---

const menuToggle = document.getElementById('menu-toggle');
const sidekickMenu = document.getElementById('sidekick-menu');
const mainContent = document.getElementById('main-content');
const codeFab = document.getElementById('code-fab');
const mainDashboardContent = document.getElementById('main-dashboard-content');
const codingRoom = document.getElementById('coding-room');
const closeCodeRoom = document.getElementById('close-code-room');
const codingRoomStatus = document.getElementById('coding-room-status');
const runCodeButton = document.getElementById('run-code');
const livePreviewFrame = document.getElementById('live-preview');
const saveStatus = document.getElementById('save-status');

// Real-Time Widget Elements
const realTimeClock = document.getElementById('real-time-clock');
const weatherDisplay = document.getElementById('weather-display');
const visitCountDisplay = document.getElementById('visit-count');
const analyticsChart = document.getElementById('time-spent-chart');
const allRippleElements = document.querySelectorAll('.ripple-effect');

// Typewriter Elements
const typewriterElement = document.getElementById('welcome-message-typewriter');


// --- 2. CONFIGURATION & STATE ---

let currentVisitors = 300;
let codingStreakDays = 4;
let timeSpentToday = 3.25; // Hours
const initialForexRate = 0.007704;
let currentForexRate = initialForexRate;

// Typewriter Messages
const typewriterMessages = [
    "EDERSTONE TECH: KNOWLEDGE SYNC ACTIVE.",
    "CODE SANDBOX READY FOR INITIATION.",
    "RESEARCH BASE ACCESS GRANTED.",
    "SYSTEM STATUS: ALL CORE MODULES ONLINE.",
];
let messageIndex = 0;

// Code Editor State (Uses localStorage for persistence)
const editorStates = {
    html: localStorage.getItem('code-html') || '\n<h1>Hello Ederstone!</h1>',
    css: localStorage.getItem('code-css') || '/* Start Coding CSS Here */\nbody { font-family: sans-serif; }',
    js: localStorage.getItem('code-js') || '// Start Coding JS Here\nconsole.log("Script Loaded");',
};

// Monaco Editor Instances (will be set up later)
let htmlEditor, cssEditor, jsEditor;


// --- 3. REAL-TIME DATA & WIDGET LOGIC ---

/**
 * Updates the clock, visitor count, and gamified stats.
 */
function updateRealTimeWidgets() {
    // A. Time and Date Update
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    realTimeClock.textContent = now.toLocaleTimeString('en-US', options);

    // B. Visitor Count & Gamification Update
    currentVisitors += Math.floor(Math.random() * 3); 
    visitCountDisplay.textContent = currentVisitors.toLocaleString();
    
    // Simulate slight usage
    if (localStorage.getItem('codedToday') === 'true') {
        timeSpentToday += 0.005;
    }

    // Gamified Study Streak Tracker Update
    const goalPercentage = Math.min(100, Math.round((timeSpentToday / 4) * 100)); 
    analyticsChart.innerHTML = `
        <h3 class="widget-title"><i class="fas fa-chart-line"></i> Analytics</h3>
        <p>Daily Usage: <span style="color: var(--color-primary-accent); font-weight: 700;">${timeSpentToday.toFixed(2)}h</span> (Goal: 4h)</p>
        <div style="height: 5px; background: var(--color-surface); margin: 0.5rem 0; border-radius: 2px;">
            <div style="width: ${goalPercentage}%; height: 100%; background: var(--color-secondary-accent); transition: width 1s ease; border-radius: 2px;"></div>
        </div>
        <p>Coding Streak: <span style="color: #FFEB3B; font-weight: 700;">${codingStreakDays} days</span> 🔥</p>
    `;

    // C. Forex Simulation (Retained for financial literacy feature)
    simulateForexRate();
}

/**
 * Simulates minor fluctuations in the Forex rate.
 */
function simulateForexRate() {
    const volatility = 0.000005;
    const change = (Math.random() - 0.5) * volatility;
    const newRate = currentForexRate + change;
    
    currentForexRate = Math.max(initialForexRate - 0.0001, Math.min(initialForexRate + 0.0001, newRate));

    let forexRateElement = document.getElementById('forex-rate');
    if (!forexRateElement) {
        // Create the element dynamically if not present in the HTML (e.g., in a widget)
        forexRateElement = document.createElement('span');
        forexRateElement.id = 'forex-rate';
        forexRateElement.style.fontFamily = 'JetBrains Mono, monospace';
        weatherDisplay.insertAdjacentElement('afterend', forexRateElement); // Insert after weather
    }

    forexRateElement.textContent = `1 KES = ${currentForexRate.toFixed(6)} USD`;

    // Apply color for market movement (Sleek enticing move)
    if (currentForexRate > initialForexRate) {
        forexRateElement.style.color = '#4CAF50';
    } else if (currentForexRate < initialForexRate) {
        forexRateElement.style.color = '#F44336';
    } else {
        forexRateElement.style.color = '#FFEB3B';
    }
}

// Initial static data
weatherDisplay.innerHTML = `Nairobi Area, Kenya - Forecast: Cloudy, Low Wind`;

// Set intervals
setInterval(updateRealTimeWidgets, 1000);


// --- 4. TYPEWRITER EFFECT LOGIC (Sleek Animation) ---

/**
 * Creates the character-by-character typewriter effect.
 */
function typeWriter(text, element, delay = 60) {
    let charIndex = 0;
    element.innerHTML = '';
    element.style.animation = 'none'; // Temporarily stop CSS blink
    element.offsetHeight; 

    function typingLoop() {
        if (charIndex < text.length) {
            element.innerHTML += text.charAt(charIndex);
            charIndex++;
            setTimeout(typingLoop, delay);
        } else {
            // Typing complete, enable cursor blink and wait
            element.style.animation = 'blink 0.7s infinite step-end';
            setTimeout(eraseText, 4000); 
        }
    }

    function eraseText() {
        // Fast erase, then start next message
        if (element.innerHTML.length > 0) {
            element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1);
            setTimeout(eraseText, delay / 3); 
        } else {
            messageIndex = (messageIndex + 1) % typewriterMessages.length;
            element.style.animation = 'none'; 
            setTimeout(startTypewriterSequence, 500);
        }
    }
    typingLoop();
}

/**
 * Starts the continuous typewriter sequence.
 */
function startTypewriterSequence() {
    const nextMessage = typewriterMessages[messageIndex];
    typeWriter(nextMessage, typewriterElement);
}

// Start the Typewriter on page load
startTypewriterSequence();


// --- 5. UI/UX: NAVIGATION & RIPPLE EFFECT LOGIC ---

/**
 * Toggles the sidekick menu visibility (no push required).
 */
function toggleSidekickMenu() {
    const isActive = sidekickMenu.classList.toggle('menu-active');
    
    // Toggle body overflow only on mobile
    if (window.innerWidth < 768) { 
        document.body.style.overflowY = isActive ? 'hidden' : 'auto'; 
    }
    
    // Rotate the menu icon for a sleek move
    menuToggle.style.transform = isActive ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)';
}

menuToggle.addEventListener('click', toggleSidekickMenu);
sidekickMenu.addEventListener('click', (event) => {
    // Close menu when a navigation link is clicked (mobile-friendly)
    if (event.target.tagName === 'A' && window.innerWidth < 768) {
        setTimeout(toggleSidekickMenu, 400); 
    }
});


/**
 * Creates and animates the ripple effect on click.
 */
function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    
    circle.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(circle);

    circle.addEventListener('animationend', () => {
        circle.remove();
    }, { once: true });
}

allRippleElements.forEach(element => {
    element.addEventListener('click', createRipple);
});


// --- 6. CODING SANDBOX LOGIC (CORE FEATURE) ---

/**
 * Toggles the visibility of the Coding Sandbox.
 */
function toggleCodingRoom(show) {
    if (show) {
        codingRoom.classList.remove('hidden');
        mainDashboardContent.classList.add('hidden');
        codeFab.classList.add('hidden');
        codingRoomStatus.textContent = 'ONLINE';
        codingRoomStatus.style.color = '#4CAF50'; // Green
        
        // Ensure Monaco Editors are initialized when shown
        if (!htmlEditor) {
            initializeMonacoEditors();
        }
        
    } else {
        codingRoom.classList.add('hidden');
        mainDashboardContent.classList.remove('hidden');
        codeFab.classList.remove('hidden');
        codingRoomStatus.textContent = 'OFFLINE';
        codingRoomStatus.style.color = '#F44336'; // Red
    }
}

codeFab.addEventListener('click', () => {
    localStorage.setItem('codedToday', 'true');
    codingStreakDays = Math.min(codingStreakDays + 1, 365); 
    toggleCodingRoom(true);
});

closeCodeRoom.addEventListener('click', () => {
    // Save state before closing
    saveCodeState(); 
    toggleCodingRoom(false);
});


/**
 * Saves the current content of the editors to localStorage.
 */
function saveCodeState() {
    if (htmlEditor && cssEditor && jsEditor) {
        editorStates.html = htmlEditor.getValue();
        editorStates.css = cssEditor.getValue();
        editorStates.js = jsEditor.getValue();
        
        localStorage.setItem('code-html', editorStates.html);
        localStorage.setItem('code-css', editorStates.css);
        localStorage.setItem('code-js', editorStates.js);
        
        saveStatus.textContent = 'Status: Saved';
        setTimeout(() => saveStatus.textContent = '', 2000);
    }
}


/**
 * Executes the combined HTML, CSS, and JS code in the iframe.
 */
function runCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const fullCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Preview</title>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
        </body>
        </html>
    `;
    
    // Write the compiled code to the iframe
    livePreviewFrame.srcdoc = fullCode;
    console.log('Code execution successful.');
}

runCodeButton.addEventListener('click', runCode);

// Editor Tabs Logic
document.querySelectorAll('.editor-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Deactivate all tabs and hide all editors
        document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.code-editor').forEach(e => e.classList.add('hidden'));

        // Activate the clicked tab and show the corresponding editor
        this.classList.add('active');
        document.getElementById(`${this.dataset.lang}-editor`).classList.remove('hidden');
        
        // Force the active editor to resize/refresh its layout
        // This is necessary for Monaco to display correctly after hiding/showing
        if (this.dataset.lang === 'html' && htmlEditor) htmlEditor.layout();
        if (this.dataset.lang === 'css' && cssEditor) cssEditor.layout();
        if (this.dataset.lang === 'js' && jsEditor) jsEditor.layout();
    });
});


/**
 * Initializes the Monaco Editors (External Dependency).
 * NOTE: This requires loading the Monaco Editor library via a script tag in HTML.
 */
function initializeMonacoEditors() {
    if (typeof monaco === 'undefined') {
        console.error("Monaco Editor not loaded. Please ensure you include the library script in index.html.");
        return;
    }
    
    // Initialize HTML Editor
    htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
        value: editorStates.html,
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false }
    });
    
    // Initialize CSS Editor (starts hidden)
    cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
        value: editorStates.css,
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false }
    });
    
    // Initialize JS Editor (starts hidden)
    jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
        value: editorStates.js,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false }
    });
    
    // Ensure only HTML editor is visible initially
    document.getElementById('css-editor').classList.add('hidden');
    document.getElementById('js-editor').classList.add('hidden');

    // Add listeners to auto-save and run code on key up (performance intensive)
    const editors = [htmlEditor, cssEditor, jsEditor];
    editors.forEach(editor => {
        editor.onDidChangeModelContent(() => {
            saveCodeState(); // Auto-save on change
            // Debounced run is better for performance, but we'll use immediate run here:
            // runCode(); 
        });
    });
    
    console.log("Monaco Editors Initialized.");
}

// Ensure the code execution environment (Monaco) is set up when the window loads.
window.addEventListener('load', () => {
    // Weather display is static now, but this is where a fetch call would go.
    weatherDisplay.innerHTML = `Nairobi Area, Kenya - Forecast: Cloudy, Low Wind`;
    
    // Check if it's a new day to reset the 'codedToday' flag
    const today = new Date().toDateString();
    if (localStorage.getItem('lastVisitDate') !== today) {
        localStorage.setItem('codedToday', 'false');
        localStorage.setItem('lastVisitDate', today);
        codingStreakDays = 0; // Reset streak if user missed a day
    }
});