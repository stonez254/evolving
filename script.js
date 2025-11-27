/* ============================================= */
/*  EDERSTONE TECH – Futuristic Student Portal   */
/*  Optimized & Modern JavaScript (2025)         */
/* ============================================= */

(() => {
    'use strict';

    // ==================== DOM ELEMENTS ====================
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const menuToggle = $('#menu-toggle');
    const sidekickMenu = $('#sidekick-menu');
    const mainContent = $('#main-content');
    const codeFab = $('#code-fab');
    const codingRoom = $('#coding-room');
    const closeCodeRoom = $('#close-code-room');
    const codingRoomStatus = $('#coding-room-status');
    const runCodeButton = $('#run-code');
    const livePreview = $('#live-preview');
    const saveStatus = $('#save-status');
    const editorContainer = $('#editor-container');
    const typewriterEl = $('#welcome-message-typewriter');
    const clockEl = $('#real-time-clock');
    const weatherEl = $('#weather-display');
    const visitCountEl = $('#visit-count');

    // ==================== STATE ====================
    let monacoEditor = null;
    let currentLang = 'html';
    let isCodingRoomOpen = false;

    const messages = [
        "EDERSTONE TECH: KNOWLEDGE SYNC ACTIVE.",
        "CODE SANDBOX READY FOR INITIATION.",
        "RESEARCH BASE ACCESS GRANTED.",
        "SYSTEM STATUS: ALL CORE MODULES ONLINE."
    ];
    let msgIndex = 0;

    const editorState = {
        html: localStorage.getItem('ederstone-html') || `<h1>Hello, Future Coder!</h1>\n<p>Welcome to your personal sandbox.</p>`,
        css: localStorage.getItem('ederstone-css') || `body {\n  font-family: 'Exo 2', sans-serif;\n  background: #0D1117;\n  color: #00E5FF;\n  text-align: center;\n  padding: 2rem;\n}`,
        js: localStorage.getItem('ederstone-js') || `// Try something fun!\nconsole.log("EDERSTONE TECH Running!");`
    };

    // ==================== UTILITIES ====================
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const saveCode = () => {
        if (!monacoEditor) return;
        const value = monacoEditor.getValue();
        editorState[currentLang] = value;
        localStorage.setItem(`ederstone-${currentLang}`, value);
        saveStatus.textContent = 'Saved';
        setTimeout(() => saveStatus.textContent = '', 1500);
    };

    const runCode = () => {
        const html = editorState.html;
        const css = `<style>${editorState.css}</style>`;
        const js = `<script>${editorState.js}<\/script>`;

        const output = `
            <!DOCTYPE html>
            <html><head>${css}</head><body>${html}${js}</body></html>
        `;
        livePreview.srcdoc = output;
    };

    const debouncedRun = debounce(runCode, 600);

    // ==================== MONACO LAZY LOAD + INIT ====================
    const initMonaco = async () => {
        if (monacoEditor) return;

        // Show loading state
        codingRoomStatus.textContent = 'LOADING...';
        codingRoomStatus.style.color = '#FFEB3B';

        await window.monacoLoader.load(() => {
            monacoEditor = monaco.editor.create(editorContainer, {
                value: editorState[currentLang],
                language: currentLang,
                theme: 'vs-dark',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 }
            });

            // Language switcher
            $$('.editor-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    if (tab.classList.contains('active')) return;

                    // Save current
                    editorState[currentLang] = monacoEditor.getValue();
                    localStorage.setItem(`ederstone-${currentLang}`, editorState[currentLang]);

                    // Switch
                    currentLang = tab.dataset.lang;
                    $$('.editor-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    monaco.editor.setModelLanguage(monacoEditor.getModel(), currentLang);
                    monacoEditor.setValue(editorState[currentLang]);
                    monacoEditor.focus();
                });
            });

            // Auto-save + live preview
            monacoEditor.onDidChangeModelContent(() => {
                saveCode();
                debouncedRun();
            });

            // Initial run
            runCode();
            codingRoomStatus.textContent = 'ONLINE';
            codingRoomStatus.style.color = '#4CAF50';
        });
    };

    // ==================== CODING ROOM TOGGLE ====================
    const openCodingRoom = async () => {
        if (isCodingRoomOpen) return;
        isCodingRoomOpen = true;

        codingRoom.classList.add('active');
        codeFab.style.opacity = '0';
        codeFab.style.pointerEvents = 'none';

        localStorage.setItem('codedToday', 'true');
        await initMonaco();
    };

    const closeCodingRoomFn = () => {
        if (!isCodingRoomOpen) return;
        isCodingRoomOpen = false;

        codingRoom.classList.remove('active');
        codeFab.style.opacity = '1';
        codeFab.style.pointerEvents = 'auto';

        codingRoomStatus.textContent = 'OFFLINE';
        codingRoomStatus.style.color = '#F44336';
    };

    codeFab.addEventListener('click', openCodingRoom);
    closeCodeRoom.addEventListener('click', closeCodingRoomFn);

    // Close on backdrop click (mobile)
    codingRoom.addEventListener('click', (e) => {
        if (e.target === codingRoom) closeCodingRoomFn();
    });

    // ==================== MENU TOGGLE ====================
    menuToggle.addEventListener('click', () => {
        const isOpen = sidekickMenu.classList.toggle('menu-active');
        mainContent.classList.toggle('menu-open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on nav link click (mobile)
    sidekickMenu.addEventListener('click', (e) => {
        if (e.target.closest('a') && window.innerWidth < 768) {
            sidekickMenu.classList.remove('menu-active');
            mainContent.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    });

    // ==================== RIPPLE EFFECT ====================
    document.addEventListener('click', (e) => {
        const el = e.target.closest('.ripple-effect');
        if (!el) return;

        const ripple = document.createElement('span');
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });

    // ==================== TYPEWRITER EFFECT ====================
    const typeWriter = () => {
        let i = 0;
        const txt = messages[msgIndex];
        typewriterEl.textContent = '';

        const type = () => {
            if (i < txt.length) {
                typewriterEl.textContent += txt.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                setTimeout(() => {
                    msgIndex = (msgIndex + 1) % messages.length;
                    typeWriter();
                }, 3000);
            }
        };
        type();
    };

    typeWriter();

    // ==================== REAL-TIME WIDGETS ====================
    const updateClock = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    let visitors = Math.floor(Math.random() * 500) + 800;
    const updateVisitors = () => {
        if (Math.random() < 0.3) visitors += Math.floor(Math.random() * 3);
        visitCountEl.textContent = visitors.toLocaleString();
    };

    setInterval(() => {
        updateClock();
        updateVisitors();
    }, 1000);

    updateClock();
    weatherEl.textContent = 'Nairobi, Kenya • 24°C • Partly Cloudy';

    // ==================== INIT =================ON LOAD ====================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

})();