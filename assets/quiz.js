// Reusable Quiz Widget for Cisco Lessons
function createQuiz(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentQuestionIndex = 0;
    let score = 0;

    function renderQuestion() {
        container.innerHTML = '';
        const q = questions[currentQuestionIndex];

        // Quiz Box
        const quizBox = document.createElement('div');
        quizBox.className = 'quiz-box';

        // Progress
        const progress = document.createElement('div');
        progress.className = 'quiz-progress';
        progress.innerText = `คำถามข้อที่ ${currentQuestionIndex + 1} จากทั้งหมด ${questions.length}`;
        quizBox.appendChild(progress);

        // Question text
        const qText = document.createElement('div');
        qText.className = 'quiz-question';
        qText.innerText = q.question;
        quizBox.appendChild(qText);

        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'quiz-options';

        let answered = false;

        q.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.innerText = optText;
            btn.addEventListener('click', () => {
                if (answered) return;
                answered = true;

                // Highlight correct and incorrect
                const allButtons = optionsContainer.querySelectorAll('.quiz-option');
                if (idx === q.answer) {
                    btn.classList.add('correct');
                    score++;
                    showFeedback(true, q.explanation);
                } else {
                    btn.classList.add('incorrect');
                    allButtons[q.answer].classList.add('correct');
                    showFeedback(false, q.explanation);
                }
            });
            optionsContainer.appendChild(btn);
        });

        quizBox.appendChild(optionsContainer);

        // Feedback container
        const feedback = document.createElement('div');
        feedback.className = 'quiz-feedback';
        quizBox.appendChild(feedback);

        // Action button (Next or Restart)
        const actionBtn = document.createElement('button');
        actionBtn.className = 'quiz-next-btn';
        actionBtn.style.display = 'none';
        quizBox.appendChild(actionBtn);

        function showFeedback(isCorrect, explanationText) {
            feedback.className = 'quiz-feedback show ' + (isCorrect ? 'correct-feedback' : 'incorrect-feedback');
            feedback.innerHTML = `<strong>${isCorrect ? 'ถูกต้องแล้ว! 🎉' : 'ยังไม่ถูกนะ ❌'}</strong><br>${explanationText}`;
            
            actionBtn.style.display = 'block';
            if (currentQuestionIndex < questions.length - 1) {
                actionBtn.innerText = 'ข้อถัดไป';
                actionBtn.onclick = () => {
                    currentQuestionIndex++;
                    renderQuestion();
                };
            } else {
                actionBtn.innerText = 'ดูผลคะแนน';
                actionBtn.onclick = () => {
                    showFinalResult();
                };
            }
        }

        container.appendChild(quizBox);
    }

    function showFinalResult() {
        container.innerHTML = '';
        const quizBox = document.createElement('div');
        quizBox.className = 'quiz-box';

        const title = document.createElement('div');
        title.className = 'quiz-question';
        title.innerText = 'ผลการประเมินตนเอง';
        quizBox.appendChild(title);

        const scoreText = document.createElement('p');
        scoreText.innerHTML = `คุณได้คะแนน <strong>${score}</strong> จากทั้งหมด <strong>${questions.length}</strong> คะแนน`;
        quizBox.appendChild(scoreText);

        const progressPercent = (score / questions.length) * 100;
        let rating = '';
        if (progressPercent === 100) {
            rating = 'ยอดเยี่ยมมาก! คุณมีความเข้าใจพื้นฐานอย่างครบถ้วนแล้ว 🌟';
        } else if (progressPercent >= 70) {
            rating = 'ทำได้ดีมาก! ลองทบทวนจุดที่ผิดพลาดอีกเล็กน้อยนะ 👍';
        } else {
            rating = 'ควรทบทวนเนื้อหาใหม่อีกรอบเพื่อความแม่นยำนะ 📚';
        }

        const ratingText = document.createElement('p');
        ratingText.innerText = rating;
        quizBox.appendChild(ratingText);

        const restartBtn = document.createElement('button');
        restartBtn.className = 'quiz-next-btn';
        restartBtn.innerText = 'ทำแบบทดสอบอีกครั้ง';
        restartBtn.onclick = () => {
            currentQuestionIndex = 0;
            score = 0;
            renderQuestion();
        };
        quizBox.appendChild(restartBtn);

        container.appendChild(quizBox);
    }

    renderQuestion();
}
