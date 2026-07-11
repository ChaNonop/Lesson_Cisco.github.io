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

        // Remove any existing subtopic lists
        document.querySelectorAll(".subtopic-list").forEach(el => el.remove());

        // Update active class in sidebar links
        document.querySelectorAll("[data-lesson-target]").forEach(link => {
            const target = link.getAttribute("data-lesson-target");
            if (target === lessonId) {
                link.classList.remove("text-slate-700", "dark:text-slate-300", "hover:bg-slate-50", "dark:hover:bg-slate-900/40");
                link.classList.add("text-violet-600", "dark:text-violet-400", "bg-violet-50", "dark:bg-violet-950/30", "font-medium");

                // Inject subtopic links if available
                if (lesson.subtopics && lesson.subtopics.length > 0) {
                    const ul = document.createElement("ul");
                    ul.className = "subtopic-list pl-6 pr-2 py-1.5 space-y-1.5 border-l-2 border-violet-200 dark:border-violet-850/50 ml-9 mt-1";
                    
                    lesson.subtopics.forEach(sub => {
                        const li = document.createElement("li");
                        const subLink = document.createElement("a");
                        subLink.href = "#" + sub.id;
                        subLink.className = "block py-1 text-xs text-slate-700 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 font-medium transition-all truncate";
                        subLink.innerText = sub.title;
                        subLink.addEventListener("click", (e) => {
                            e.preventDefault();
                            const section = document.getElementById(sub.id);
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                        });
                        li.appendChild(subLink);
                        ul.appendChild(li);
                    });
                    
                    // Insert ul right after the link element
                    link.parentNode.insertBefore(ul, link.nextSibling);
                }
            } else {
                link.classList.remove("text-violet-600", "dark:text-violet-400", "bg-violet-50", "dark:bg-violet-950/30", "font-medium");
                link.classList.add("text-slate-700", "dark:text-slate-300", "hover:bg-slate-50", "dark:hover:bg-slate-900/40");
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
            
            // Initialize visualizer with safety check
            const visualizerMap = {
                "osi-explorer": typeof initOSIVisualizer === "function" ? initOSIVisualizer : null,
                "tcp-handshake": typeof initTCPVisualizer === "function" ? initTCPVisualizer : null,
                "encap-decap-sim": typeof initEncapDecapVisualizer === "function" ? initEncapDecapVisualizer : null,
                "cli-terminal": typeof initCLISimulator === "function" ? initCLISimulator : null
            };
            const initFunc = visualizerMap[lesson.visualizationId];
            if (initFunc) {
                initFunc(`${lesson.visualizationId}-container`);
            } else {
                console.warn(`Visualizer function for ${lesson.visualizationId} is not loaded.`);
                visualBox.innerHTML = `<div class="p-4 text-center text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">⚠️ ไม่สามารถโหลดระบบจำลองการทำงานได้</div>`;
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

        // Render References if available
        const refSection = document.getElementById("references-section");
        if (refSection) {
            if (lesson.references && lesson.references.length > 0) {
                refSection.classList.remove("hidden");
                refSection.innerHTML = `
                    <div class="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
                        <h4 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>📚</span> แหล่งข้อมูลอ้างอิงและศึกษาเพิ่มเติม (Reliable References)
                        </h4>
                        <ul class="list-disc list-inside space-y-1.5 text-xs text-indigo-600 dark:text-indigo-400">
                            ${lesson.references.map(ref => `
                                <li>
                                    <a href="${ref.url}" target="_blank" class="hover:underline font-medium">${ref.title}</a>
                                    <span class="text-slate-500 dark:text-slate-400 font-mono text-[10px]">(${ref.source})</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            } else {
                refSection.classList.add("hidden");
                refSection.innerHTML = '';
            }
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
            qBox.className = "bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/40 rounded-xl p-5 shadow-sm dark:shadow-lg space-y-4";

            // Progress
            const progress = document.createElement("div");
            progress.className = "text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase";
            progress.innerText = `คำถามข้อที่ ${currentIdx + 1} จากทั้งหมด ${questions.length}`;
            qBox.appendChild(progress);

            // Question Text
            const questionTitle = document.createElement("h4");
            questionTitle.className = "text-base font-bold text-slate-900 dark:text-slate-100";
            questionTitle.innerText = q.question;
            qBox.appendChild(questionTitle);

            // Options
            const optionsContainer = document.createElement("div");
            optionsContainer.className = "flex flex-col gap-3 mt-2";
            
            let isAnswered = false;

            q.options.forEach((opt, idx) => {
                const btn = document.createElement("button");
                btn.className = "w-full text-left p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 text-sm transition-all";
                btn.innerText = opt;
                btn.onclick = () => {
                    if (isAnswered) return;
                    isAnswered = true;

                    // Disable hover styles
                    optionsContainer.querySelectorAll("button").forEach(b => {
                        b.classList.remove("hover:bg-slate-100", "dark:hover:bg-slate-800/80", "hover:border-slate-300", "dark:hover:border-slate-700");
                        b.disabled = true;
                    });

                    // Check answer
                    if (idx === q.answer) {
                        btn.className = "w-full text-left p-3.5 rounded-lg border border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold transition-all";
                        score++;
                        showFeedback(true, q.explanation);
                    } else {
                        btn.className = "w-full text-left p-3.5 rounded-lg border border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 transition-all";
                        // Highlight correct one
                        const correctBtn = optionsContainer.querySelectorAll("button")[q.answer];
                        correctBtn.className = "w-full text-left p-3.5 rounded-lg border border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold transition-all";
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
            nextBtn.className = "hidden w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg text-sm font-semibold transition-all shadow-md mt-2";
            qBox.appendChild(nextBtn);

            function showFeedback(correct, text) {
                feedback.classList.remove("hidden");
                nextBtn.classList.remove("hidden");

                if (correct) {
                    feedback.className = "p-4 rounded-lg text-sm border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/10 text-emerald-600 dark:text-emerald-400";
                    feedback.innerHTML = `<strong>ถูกต้องครับ! 🎉</strong><br>${text}`;
                } else {
                    feedback.className = "p-4 rounded-lg text-sm border border-rose-500/20 bg-rose-50/30 dark:bg-rose-950/10 text-rose-600 dark:text-rose-400";
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
            rBox.className = "bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/40 rounded-xl p-5 shadow-sm dark:shadow-lg space-y-4 text-center";

            const title = document.createElement("h4");
            title.className = "text-lg font-bold text-slate-900 dark:text-slate-100";
            title.innerText = "สรุปผลการทดสอบ";
            rBox.appendChild(title);

            const scoreDisplay = document.createElement("div");
            scoreDisplay.className = "text-4xl font-extrabold text-violet-600 dark:text-violet-400 font-mono my-2";
            scoreDisplay.innerText = `${score} / ${questions.length}`;
            rBox.appendChild(scoreDisplay);

            const rating = document.createElement("p");
            rating.className = "text-sm text-slate-600 dark:text-slate-300";
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
            restartBtn.className = "w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700";
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

    // 6. Search Bar Engine
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    if (searchInput && searchResults) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                searchResults.classList.add("hidden");
                searchResults.innerHTML = "";
                return;
            }

            const matches = [];

            // Loop through lessonsData
            for (const [key, lesson] of Object.entries(lessonsData)) {
                // Check lesson title/subtitle
                const titleMatch = lesson.title.toLowerCase().includes(query);
                const subtitleMatch = lesson.subtitle && lesson.subtitle.toLowerCase().includes(query);

                if (titleMatch || subtitleMatch) {
                    matches.push({
                        type: "lesson",
                        lessonId: key,
                        title: lesson.title,
                        subtitle: lesson.subtitle,
                        targetId: null
                    });
                }

                // Check subtopics
                if (lesson.subtopics) {
                    lesson.subtopics.forEach(sub => {
                        if (sub.title.toLowerCase().includes(query)) {
                            matches.push({
                                type: "subtopic",
                                lessonId: key,
                                title: sub.title,
                                subtitle: lesson.title,
                                targetId: sub.id
                            });
                        }
                    });
                }
            }

            // Render results
            if (matches.length > 0) {
                searchResults.classList.remove("hidden");
                searchResults.innerHTML = matches.map(m => {
                    const icon = m.type === "lesson" ? "📖" : "🔗";
                    const badge = m.type === "lesson" ? "บทเรียน" : "หัวข้อย่อย";
                    return `
                        <button data-search-lesson="${m.lessonId}" data-search-target="${m.targetId || ''}" class="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all flex flex-col gap-0.5 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                            <div class="flex items-center justify-between gap-2">
                                <span class="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                    <span>${icon}</span> ${m.title}
                                </span>
                                <span class="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700 font-semibold shrink-0">${badge}</span>
                            </div>
                            <span class="text-[10px] text-slate-500 dark:text-slate-400 truncate pl-5">${m.subtitle}</span>
                        </button>
                    `;
                }).join('<div class="h-px bg-slate-100 dark:bg-slate-850 my-1"></div>');

                // Attach click listeners to search results
                searchResults.querySelectorAll("button").forEach(btn => {
                    btn.addEventListener("click", () => {
                        const lessonId = btn.getAttribute("data-search-lesson");
                        const targetId = btn.getAttribute("data-search-target");

                        loadLesson(lessonId);

                        if (targetId) {
                            setTimeout(() => {
                                const element = document.getElementById(targetId);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                            }, 300);
                        }

                        // Clear and hide search
                        searchInput.value = "";
                        searchResults.classList.add("hidden");
                        searchResults.innerHTML = "";
                    });
                });
            } else {
                searchResults.classList.remove("hidden");
                searchResults.innerHTML = `
                    <div class="p-4 text-center text-slate-500 dark:text-slate-400 flex flex-col items-center gap-1">
                        <span>🔍</span>
                        <span>ไม่พบหัวข้อที่ค้นหา</span>
                    </div>
                `;
            }
        });

        // Hide search results dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add("hidden");
            }
        });
    }
});
