// --- 1. GLOBAL DOM ELEMENT SELECTION ---

const menuToggle = document.getElementById('menu-toggle');
const sidekickMenu = document.getElementById('sidekick-menu');
const mainContent = document.getElementById('main-content');
const codeFab = document.getElementById('code-fab');
const realTimeClock = document.getElementById('real-time-clock');
const weatherDisplay = document.getElementById('weather-display');
const visitCountDisplay = document.getElementById('visit-count');
const allRippleElements = document.querySelectorAll('.ripple-effect');

// New Elements for expanded features
const analyticsChart = document.getElementById('time-spent-chart');
const recreationLinks = document.querySelectorAll('[data-category="entertainment"], [data-category="games"], [data-category="risk-manage"]');

// --- 2. CONFIGURATION & STATE ---

let currentVisitors = 300;
let codingStreakDays = 4;
let timeSpentToday = 3.25; // Hours
const initialForexRate = 0.007704;
let currentForexRate = initialForexRate;

// --- 3. REAL-TIME DATA & WIDGET LOGIC ---

/**
 * Updates the clock, simulated visitor count, and gamified stats.
 */
function updateRealTimeWidgets() {
    const now = new Date();
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    realTimeClock.textContent = now.toLocaleTimeString('en-US', options);

    // Simulated Real-Time Visitor Count 
    currentVisitors += Math.floor(Math.random() * 3); // +0 to +2 visitors
    visitCountDisplay.textContent = currentVisitors.toLocaleString();

    // Gamified Study Streak Tracker Update
    const goalPercentage = Math.min(100, Math.round((timeSpentToday / 4) * 100)); // Assume 4 hours is the daily goal
    analyticsChart.innerHTML = `
        <p>Daily Usage: 
            <span style="color: var(--color-primary-accent); font-weight: 700;">${timeSpentToday.toFixed(2)}h</span> (Goal: 4h)
        </p>
        <div style="height: 5px; background: var(--color-surface); margin: 0.5rem 0;">
            <div style="width: ${goalPercentage}%; height: 100%; background: var(--color-secondary-accent); transition: width 1s ease;"></div>
        </div>
        <p>Coding Streak: 
            <span style="color: #FFEB3B; font-weight: 700;">${codingStreakDays} days</span> 🔥
        </p>
    `;
    
    // Check if the student hit the coding FAB today (Simulated)
    if (localStorage.getItem('codedToday') === 'true') {
        timeSpentToday += 0.005; // Simulate small usage increment
    }
}

// Set initial static data (Weather, as this is usually slow-changing)
weatherDisplay.innerHTML = `17°C, 92% Humidity (Juja), Low Wind`;

// Update every second
updateRealTimeWidgets();
setInterval(updateRealTimeWidgets, 1000);

// --- 4. DYNAMIC FOREX SIMULATION ---

/**
 * Simulates minor fluctuations in the Forex rate and applies color indicators.
 */
function simulateForexRate() {
    const volatility = 0.000005; // Very small fluctuation
    const change = (Math.random() - 0.5) * volatility;
    const newRate = currentForexRate + change;
    
    // Limit rate between a range for realism
    currentForexRate = Math.max(initialForexRate - 0.0001, Math.min(initialForexRate + 0.0001, newRate));

    const rateElement = document.getElementById('forex-rate');
    
    if (!rateElement) return; // Exit if element is not in HTML yet

    rateElement.textContent = currentForexRate.toFixed(6);

    // Apply color for visual market movement (Sleek enticing move)
    if (currentForexRate > initialForexRate) {
        rateElement.style.color = '#4CAF50'; // Green (Up)
        rateElement.innerHTML += ' <i class="fas fa-arrow-up"></i>';
    } else if (currentForexRate < initialForexRate) {
        rateElement.style.color = '#F44336'; // Red (Down)
        rateElement.innerHTML += ' <i class="fas fa-arrow-down"></i>';
    } else {
        rateElement.style.color = '#FFEB3B'; // Yellow (Neutral)
    }
}
// Run every 5 seconds for simulated real-time market action
setInterval(simulateForexRate, 5000);


// --- 5. FUTURISTIC SIDEKICK MENU & NAVIGATION LOGIC ---

/**
 * Toggles the sidekick menu visibility and applies the cinematic 'push' effect.
 */
function toggleSidekickMenu() {
    const isActive = sidekickMenu.classList.toggle('menu-active');
    mainContent.classList.toggle('pushed', isActive);
    document.body.style.overflowY = isActive ? 'hidden' : 'auto'; 
    menuToggle.style.transform = isActive ? 'rotate(90deg) scale(0.9)' : 'rotate(0deg) scale(1)';
    menuToggle.style.color = isActive ? 'var(--color-secondary-accent)' : 'var(--color-text-primary)';
}

menuToggle.addEventListener('click', toggleSidekickMenu);
sidekickMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        setTimeout(toggleSidekickMenu, 400); 
    }
});
mainContent.addEventListener('click', () => {
    if (sidekickMenu.classList.contains('menu-active')) {
        toggleSidekickMenu();
    }
});


// --- 6. SMART FOCUS MODE TOGGLE ---

/**
 * Toggles a 'Focus Mode' that visually de-emphasizes non-academic content.
 * This function simulates the logic for the "Focus Mode" suggested earlier.
 */
function toggleFocusMode() {
    const isFocusing = document.body.classList.toggle('focus-mode-active');
    
    recreationLinks.forEach(link => {
        if (isFocusing) {
            link.style.opacity = '0.3';
            link.style.pointerEvents = 'none'; // Prevents clicking when focused
        } else {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
        }
    });

    const focusMessage = isFocusing ? 'Focus Mode activated. Entertainment links muted!' : 'Focus Mode deactivated. Time for a break!';
    console.log(focusMessage);

    // Show a temporary overlay notification (simulated)
    alert(focusMessage);
}

// Add a simulated Focus Mode button click listener (Needs an element in HTML)
// const focusButton = document.getElementById('focus-mode-button');
// if (focusButton) focusButton.addEventListener('click', toggleFocusMode);


// --- 7. ANIME BACKGROUND ROTATION (Aesthetic Functionality) ---

const animeBackgrounds = [
    'assets/bg-anime-1.jpg',
    'assets/bg-anime-2.jpg',
    'assets/bg-anime-3.jpg'
];

let currentBgIndex = 0;

/**
 * Changes the body background image for a dynamic aesthetic.
 */
function rotateAnimeBackground() {
    currentBgIndex = (currentBgIndex + 1) % animeBackgrounds.length;
    // Apply a smooth transition effect via JS and CSS
    document.body.style.backgroundImage = `url('${animeBackgrounds[currentBgIndex]}')`;
    document.body.style.transition = 'background-image 2s ease-in-out';
}

// Run rotation every 15 minutes (or set to 60000 * 15)
// setInterval(rotateAnimeBackground, 60000 * 15); 
// For demonstration, let's run it every 30 seconds
setInterval(rotateAnimeBackground, 30000); 


// --- 8. RIPPLE EFFECT IMPLEMENTATION (Sleek Interactivity) ---

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

// --- 9. CODE SANDBOX & UTILITY LOGIC ---

codeFab.addEventListener('click', () => {
    // Record that the user hit the code button today
    localStorage.setItem('codedToday', 'true');
    codingStreakDays = Math.min(codingStreakDays + 1, 365); // Increment streak up to 365
    
    codeFab.classList.add('fab-clicked'); 
    
    console.log('--- Opening Futuristic Coding Sandbox IDE... ---');
    alert('Launching in-browser Monaco IDE with auto-correction enabled!');
    
    // Remove class after animation
    setTimeout(() => codeFab.classList.remove('fab-clicked'), 500);
});

// Final check: If it's a new day, reset the 'codedToday' flag (simulated startup logic)
const today = new Date().toDateString();
if (localStorage.getItem('lastVisitDate') !== today) {
    localStorage.setItem('codedToday', 'false');
    localStorage.setItem('lastVisitDate', today);
}