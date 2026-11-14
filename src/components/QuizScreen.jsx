import React, { useState } from 'react';
import { translations } from '../data/translations';
import { quizQuestions } from '../data/quizData';
import { sounds } from '../utils/soundEffects';

export default function QuizScreen({
  lang,
  onFinishQuiz,
  onBackToMap,
  quizAnswers,
  setQuizAnswers
}) {
  const t = translations[lang];
  const [currentIdx, setCurrentIdx] = useState(0);

  const question = quizQuestions[currentIdx];
  const totalQuestions = quizQuestions.length;

  const currentSelection = quizAnswers[currentIdx];
  const hasAnsweredCurrent = currentSelection !== undefined;

  const handleSelectOption = (optionIdx) => {
    // If already answered this question in the current attempt, prevent changing to score cheat
    if (hasAnsweredCurrent) return;

    sounds.playClick();
    const isCorrect = optionIdx === question.correctIndex;
    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }

    const updated = { ...quizAnswers, [currentIdx]: optionIdx };
    setQuizAnswers(updated);
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final score
      let score = 0;
      quizQuestions.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correctIndex) {
          score += 1;
        }
      });
      onFinishQuiz(score);
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Calculate live score
  let currentScore = 0;
  quizQuestions.forEach((q, idx) => {
    if (quizAnswers[idx] === q.correctIndex) {
      currentScore += 1;
    }
  });

  return (
    <div className="screen quiz-screen">
      <div className="quiz-container-card">
        {/* Header with Progress Bar */}
        <div className="quiz-header">
          <div className="quiz-header-top">
            <span className="quiz-badge">🧠 {t.quizTitle}</span>
            <span className="quiz-score-badge">
              {t.score}: <strong>{currentScore}/{totalQuestions}</strong>
            </span>
          </div>

          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="quiz-step-label">
            {t.question} {currentIdx + 1} {t.of} {totalQuestions}
          </div>
        </div>

        {/* Question Text */}
        <div className="quiz-question-box">
          <h3 className="question-text">{question.question[lang]}</h3>
        </div>

        {/* 4 Options Grid */}
        <div className="options-grid">
          {question.options[lang].map((optText, optIdx) => {
            const isSelected = currentSelection === optIdx;
            const isCorrect = optIdx === question.correctIndex;
            let statusClass = '';

            if (hasAnsweredCurrent) {
              if (isCorrect) {
                statusClass = 'correct-opt';
              } else if (isSelected) {
                statusClass = 'wrong-opt';
              } else {
                statusClass = 'dimmed-opt';
              }
            }

            return (
              <button
                key={optIdx}
                className={`option-btn ${statusClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectOption(optIdx)}
                disabled={hasAnsweredCurrent}
              >
                <span className="opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                <span className="opt-text">{optText}</span>
                {hasAnsweredCurrent && isCorrect && <span className="opt-mark">✓</span>}
                {hasAnsweredCurrent && isSelected && !isCorrect && <span className="opt-mark">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback and Scientific Explanation */}
        {hasAnsweredCurrent && (
          <div className={`explanation-card ${currentSelection === question.correctIndex ? 'exp-correct' : 'exp-wrong'}`}>
            <div className="exp-header">
              <span className="exp-icon">
                {currentSelection === question.correctIndex ? '🎉 ' + t.correct : '💡 ' + t.incorrect}
              </span>
            </div>
            <p className="exp-body">{question.explanation[lang]}</p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="quiz-nav-row">
          <button
            className="btn-secondary"
            onClick={handlePrev}
            disabled={currentIdx === 0}
          >
            ◀ {lang === 'vi' ? 'Câu trước' : 'Previous'}
          </button>

          <button
            className="btn-secondary back-map-btn"
            onClick={() => { sounds.playClick(); onBackToMap(); }}
          >
            🗺️ {t.backToMap}
          </button>

          <button
            className="btn-primary next-q-btn glow-effect"
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
          >
            {currentIdx < totalQuestions - 1 ? `${t.nextQuestion} ▶` : `🏆 ${t.finishQuiz}`}
          </button>
        </div>
      </div>
    </div>
  );
}
