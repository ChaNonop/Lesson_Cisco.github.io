// Main Application Logic for Cisco Switch & Network Docs
document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark/Light Theme Control
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            themeIcon.innerHTML = `
                <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/>
                </svg>
            `;
        } else {
            document.documentElement.classList.remove("dark");
            themeIcon.innerHTML = `
                <svg class="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
            `;
        }
        localStorage.setItem("theme", theme);
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }

    themeToggleBtn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.contains("dark");
        applyTheme(isDark ? "light" : "dark");
    });

    // 2. Mobile Sidebar Control
    const btnOpenSidebar = document.getElementById("btn-open-sidebar");
    const btnCloseSidebar = document.getElementById("btn-close-sidebar");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebar-overlay");

    function toggleMobileSidebar(show) {
        if (show) {
            sidebar.classList.remove("-translate-x-full");
            sidebarOverlay.classList.remove("hidden");
        } else {
            sidebar.classList.add("-translate-x-full");
            sidebarOverlay.classList.add("hidden");
        }
    }

    btnOpenSidebar.addEventListener("click", () => toggleMobileSidebar(true));
    btnCloseSidebar.addEventListener("click", () => toggleMobileSidebar(false));
    sidebarOverlay.addEventListener("click", () => toggleMobileSidebar(false));

    // 3. Lesson Router & Content Switcher
    let activeLessonId = "lesson-1";

    function loadLesson(lessonId) {
        activeLessonId = lessonId;
        const lesson = lessonsData[lessonId];
        if (!lesson) return;

        // Update active class in sidebar links
        document.querySelectorAll("[data-lesson-target]").forEach(link => {
            const target = link.getAttribute("data-lesson-target");
            if (target === lessonId) {
                link.classList.remove("text-slate-400", "dark:text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800/40");
                link.classList.add("text-violet-600", "dark:text-violet-400", "bg-violet-50", "dark:bg-violet-950/30", "font-medium");
            } else {
                link.classList.remove("text-violet-600", "dark:text-violet-400", "bg-violet-50", "dark:bg-violet-950/30", "font-medium");
                link.classList.add("text-slate-400", "dark:text-slate-500", "hover:bg-slate-100", "dark:hover:bg-slate-800/40");
            }
        });

        // Set title and content
        document.getElementById("lesson-title").innerText = lesson.title;
        document.getElementById("lesson-subtitle").innerText = lesson.subtitle;
        
        const contentBox = document.getElementById("lesson-content");
        contentBox.innerHTML = lesson.content;

        // Render visualization if available
        const visualSection = document.getElementById("visualization-section");
        const visualBox = document.getElementById("visualization-box");
        
        if (lesson.visualizationId) {
            visualSection.classList.remove("hidden");
            visualBox.innerHTML = `<div id="${lesson.visualizationId}-container" class="w-full"></div>`;
            
            // Initialize visualizer
            if (lesson.visualizationId === "osi-explorer") {
                initOSIVisualizer(`${lesson.visualizationId}-container`);
            } else if (lesson.visualizationId === "tcp-handshake") {
                initTCPVisualizer(`${lesson.visualizationId}-container`);
            } else if (lesson.visualizationId === "encap-decap-sim") {
                initEncapDecapVisualizer(`${lesson.visualizationId}-container`);
            } else if (lesson.visualizationId === "cli-terminal") {
                initCLISimulator(`${lesson.visualizationId}-container`);
            }
        } else {
            visualSection.classList.add("hidden");
            visualBox.innerHTML = '';
        }

        // Render Quiz if available
        const quizSection = document.getElementById("quiz-section");
        const quizBox = document.getElementById("quiz-box-container");
        
        if (lesson.quiz && lesson.quiz.length > 0) {
            quizSection.classList.remove("hidden");
            renderQuiz(quizBox, lesson.quiz);
        } else {
            quizSection.classList.add("hidden");
            quizBox.innerHTML = '';
        }

        // Prepare code blocks for copying
        setupCodeBlocks();

        // Close sidebar on mobile after clicking
        toggleMobileSidebar(false);
        
        // Scroll content to top
        document.getElementById("main-content-scroll").scrollTop = 0;
    }

    // Set up sidebar link event listeners
    document.querySelectorAll("[data-lesson-target]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-lesson-target");
            loadLesson(target);
        });
    });

    // Load initial lesson
    loadLesson("lesson-1");

    // 4. Setup Copyable Code Blocks
    function setupCodeBlocks() {
        const codeBlocks = document.querySelectorAll("#lesson-content pre");
        codeBlocks.forEach(pre => {
            // Check if already has copy button
            if (pre.querySelector(".copy-btn")) return;

            // Make pre relative
            pre.classList.add("relative", "group");

            const code = pre.querySelector("code");
            if (!code) return;

            const btn = document.createElement("button");
            btn.className = "copy-btn absolute right-3 top-3 px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1";
            btn.innerHTML = `
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
                <span>คัดลอก</span>
            `;

            btn.addEventListener("click", () => {
                const textToCopy = code.innerText.trim();
                navigator.clipboard.writeText(textToCopy).then(() => {
                    btn.innerHTML = `
                        <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span class="text-emerald-400">คัดลอกแล้ว!</span>
                    `;
                    setTimeout(() => {
                        btn.innerHTML = `
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                            </svg>
                            <span>คัดลอก</span>
                        `;
                    }, 2000);
                });
            });

            pre.appendChild(btn);
        });
    }

    // 5. Quiz Engine
    function renderQuiz(container, questions) {
        let currentIdx = 0;
        let score = 0;

        function showQuestion() {
            container.innerHTML = '';
            const q = questions[currentIdx];

            const qBox = document.createElement("div");
            qBox.className = "bg-slate-900/60 border border-slate-700/40 rounded-xl p-5 shadow-lg space-y-4";

            // Progress
            const progress = document.createElement("div");
            progress.className = "text-xs font-semibold tracking-wider text-slate-400 uppercase";
            progress.innerText = `คำถามข้อที่ ${currentIdx + 1} จากทั้งหมด ${questions.length}`;
            qBox.appendChild(progress);

            // Question Text
            const questionTitle = document.createElement("h4");
            questionTitle.className = "text-base font-bold text-slate-100";
            questionTitle.innerText = q.question;
            qBox.appendChild(questionTitle);

            // Options
            const optionsContainer = document.createElement("div");
            optionsContainer.className = "flex flex-col gap-3 mt-2";
            
            let isAnswered = false;

            q.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.className = "w-full text-left p-3.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300 text-sm transition-all";
                btn.innerText = opt;
                btn.onclick = () => {
                    if (isAnswered) return;
                    isAnswered = true;

                    // Disable hover styles
                    optionsContainer.querySelectorAll("button").forEach(b => {
                        b.classList.remove("hover:bg-slate-800/80", "hover:border-slate-700");
                        b.disabled = true;
                    });

                    // Check answer
                    if (idx === q.answer) {
                        btn.classList.add("border-emerald-500/50", "bg-emerald-950/20", "text-emerald-400", "font-semibold");
                        score++;
                        showFeedback(true, q.explanation);
                    } else {
                        btn.classList.add("border-rose-500/50", "bg-rose-950/20", "text-rose-400");
                        // Highlight correct one
                        const correctBtn = optionsContainer.querySelectorAll("button")[q.answer];
                        correctBtn.classList.add("border-emerald-500/50", "bg-emerald-950/20", "text-emerald-400", "font-semibold");
                        showFeedback(false, q.explanation);
                    }
                };
                optionsContainer.appendChild(btn);
            });

            qBox.appendChild(optionsContainer);

            // Feedback area
            const feedback = document.createElement("div");
            feedback.className = "hidden p-4 rounded-lg text-sm border";
            qBox.appendChild(feedback);

            // Action Button
            const nextBtn = document.createElement("button");
            nextBtn.className = "hidden w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md";
            qBox.appendChild(nextBtn);

            function showFeedback(correct, text) {
                feedback.classList.remove("hidden");
                nextBtn.classList.remove("hidden");

                if (correct) {
                    feedback.className = "p-4 rounded-lg text-sm border border-emerald-500/20 bg-emerald-950/10 text-emerald-400";
                    feedback.innerHTML = `<strong>ถูกต้องครับ! 🎉</strong><br>${text}`;
                } else {
                    feedback.className = "p-4 rounded-lg text-sm border border-rose-500/20 bg-rose-950/10 text-rose-400";
                    feedback.innerHTML = `<strong>ยังไม่ถูกนะคร้าบ ❌</strong><br>${text}`;
                }

                if (currentIdx < questions.length - 1) {
                    nextBtn.innerText = "ทำข้อถัดไป";
                    nextBtn.onclick = () => {
                        currentIdx++;
                        showQuestion();
                    };
                } else {
                    nextBtn.innerText = "ดูคะแนนสอบสรุป";
                    nextBtn.onclick = showResults;
                }
            }

            container.appendChild(qBox);
        }

        function showResults() {
            container.innerHTML = '';
            
            const rBox = document.createElement("div");
            rBox.className = "bg-slate-900/60 border border-slate-700/40 rounded-xl p-5 shadow-lg space-y-4 text-center";

            const title = document.createElement("h4");
            title.className = "text-lg font-bold text-slate-100";
            title.innerText = "สรุปผลการทดสอบ";
            rBox.appendChild(title);

            const scoreDisplay = document.createElement("div");
            scoreDisplay.className = "text-4xl font-extrabold text-violet-400 font-mono my-2";
            scoreDisplay.innerText = `${score} / ${questions.length}`;
            rBox.appendChild(scoreDisplay);

            const rating = document.createElement("p");
            rating.className = "text-sm text-slate-300";
            const percent = (score / questions.length) * 100;
            if (percent === 100) {
                rating.innerText = "สุดยอดมากครับ! คุณตอบถูกทุกข้อเลย 🌟";
            } else if (percent >= 60) {
                rating.innerText = "ทำได้ดีมากครับ! ผ่านเกณฑ์แล้ว 👍";
            } else {
                rating.innerText = "ควรลองกลับไปทบทวนทฤษฎีในบทเรียนนี้อีกนิดนะครับ 📚";
            }
            rBox.appendChild(rating);

            const restartBtn = document.createElement("button");
            restartBtn.className = "w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-semibold transition-all border border-slate-700";
            restartBtn.innerText = "เริ่มทำข้อสอบใหม่";
            restartBtn.onclick = () => {
                currentIdx = 0;
                score = 0;
                showQuestion();
            };
            rBox.appendChild(restartBtn);

            container.appendChild(rBox);
        }

        showQuestion();
    }
});
