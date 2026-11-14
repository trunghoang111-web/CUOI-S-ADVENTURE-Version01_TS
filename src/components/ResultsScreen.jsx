import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { quizQuestions } from '../data/quizData';
import { sounds } from '../utils/soundEffects';

export default function ResultsScreen({
  lang,
  score,
  quizAnswers,
  onTryAgain,
  onExploreAgain,
  studentName,
  setStudentName
}) {
  const t = translations[lang];
  const [showReview, setShowReview] = useState(false);

  // Determine Badge Tier
  let badgeKey = 'badgeCadet';
  let badgeColor = '#cd7f32'; // Bronze
  let badgeIcon = '🥉';

  if (score === 7) {
    badgeKey = 'badgeGuardian';
    badgeColor = '#ffd700'; // Gold
    badgeIcon = '👑';
  } else if (score >= 5) {
    badgeKey = 'badgeExplorer';
    badgeColor = '#e0e0e0'; // Silver
    badgeIcon = '🥈';
  }

  const badgeTitle = t[badgeKey];

  // Confetti trigger on mount
  useEffect(() => {
    sounds.playFanfare();
    if (typeof window !== 'undefined' && window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, []);

  const handlePrintCertificate = () => {
    sounds.playClick();
    window.print();
  };

  const todayFormatted = new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="screen results-screen">
      {/* Results Header Card */}
      <div className="results-card no-print">
        <div className="results-top-badge">
          <span>🏆 {t.resultsTitle}</span>
        </div>

        <div className="badge-showcase" style={{ borderColor: badgeColor }}>
          <div className="badge-icon-large">{badgeIcon}</div>
          <h2 className="badge-title" style={{ color: badgeColor }}>{badgeTitle}</h2>
          <div className="score-counter-large">
            <span className="score-num">{score}</span>
            <span className="score-denom">/ 7</span>
          </div>
          <div className="animated-stars-row">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={`star-symbol ${i < score ? 'star-earned' : 'star-empty'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <p className="results-congrats-text">
          {score === 7
            ? (lang === 'vi' ? 'Tuyệt đỉnh! Bạn là một Vệ Binh Mặt Trăng xuất sắc hiểu rõ từng dấu mốc lịch sử không gian!' : 'Spectacular! You are a true Moon Guardian with mastery over space exploration history!')
            : score >= 5
            ? (lang === 'vi' ? 'Rất giỏi! Bạn đã trở thành Nhà Thám Hiểm Mặt Trăng cừ khôi nắm vững các bí mật vũ trụ!' : 'Great job! You have proven yourself as a skilled Moon Explorer with strong space knowledge!')
            : (lang === 'vi' ? 'Khởi đầu tuyệt vời! Bạn là Học Viên Không Gian đầy nhiệt huyết sẵn sàng khám phá thêm!' : 'A promising start! You are an eager Space Cadet ready to discover more!')}
        </p>

        {/* Action Buttons */}
        <div className="results-actions-group">
          <button
            className="btn-primary print-cert-btn glow-effect"
            onClick={handlePrintCertificate}
          >
            🖨️ {t.printCertificate}
          </button>

          <button
            className="btn-secondary"
            onClick={() => { sounds.playClick(); setShowReview(!showReview); }}
          >
            📋 {showReview ? (lang === 'vi' ? 'Ẩn Lại Bài Thi' : 'Hide Review') : (lang === 'vi' ? 'Xem Lại 7 Câu Trả Lời' : 'Review 7 Questions')}
          </button>

          <button
            className="btn-secondary"
            onClick={() => { sounds.playClick(); onTryAgain(); }}
          >
            🔄 {t.tryAgain}
          </button>

          <button
            className="btn-secondary"
            onClick={() => { sounds.playClick(); onExploreAgain(); }}
          >
            🗺️ {t.exploreAgain}
          </button>
        </div>

        {/* 7-Question Detailed Review Drawer */}
        {showReview && (
          <div className="quiz-review-section">
            <h3 className="review-title">
              {lang === 'vi' ? 'Chi Tiết 7 Câu Hỏi & Lời Giải Thích Khoa Học' : 'Review of 7 Questions & Scientific Explanations'}
            </h3>
            <div className="review-list">
              {quizQuestions.map((q, idx) => {
                const userChoice = quizAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} className={`review-item ${isCorrect ? 'item-correct' : 'item-wrong'}`}>
                    <div className="review-item-header">
                      <span className="q-badge">Câu {idx + 1}</span>
                      <span className="status-badge">{isCorrect ? '✓ Đúng' : '✗ Sai'}</span>
                    </div>
                    <p className="review-q-text">{q.question[lang]}</p>
                    <div className="review-answer-info">
                      <div>
                        <strong>{lang === 'vi' ? 'Bạn chọn:' : 'Your answer:'} </strong>
                        <span>{userChoice !== undefined ? q.options[lang][userChoice] : (lang === 'vi' ? 'Chưa chọn' : 'Not answered')}</span>
                      </div>
                      {!isCorrect && (
                        <div className="correct-answer-line">
                          <strong>{lang === 'vi' ? 'Đáp án đúng:' : 'Correct answer:'} </strong>
                          <span className="correct-highlight">{q.options[lang][q.correctIndex]}</span>
                        </div>
                      )}
                    </div>
                    <div className="review-explanation">
                      <em>💡 {q.explanation[lang]}</em>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Printable In-App Certificate Section */}
      <div className="certificate-section-wrapper">
        <div className="cert-input-row no-print">
          <label htmlFor="student-name-input" className="cert-input-label">
            ✍️ {t.studentName}:
          </label>
          <input
            id="student-name-input"
            type="text"
            className="cert-name-input"
            placeholder={t.namePlaceholder}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        {/* The Printable Certificate Document */}
        <div className="certificate-frame print-target" id="certificate-print-area">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              {/* Corner Ornaments */}
              <div className="cert-corner tl">★</div>
              <div className="cert-corner tr">★</div>
              <div className="cert-corner bl">★</div>
              <div className="cert-corner br">★</div>

              {/* Certificate Header */}
              <div className="cert-header">
                <div className="cert-logo-row">
                  <div className="cert-logo-circle">🌙</div>
                  <div className="cert-nasa-tag">NASA SPACE APPS • STEM ADVENTURE</div>
                  <div className="cert-logo-circle">🚀</div>
                </div>
                <h1 className="cert-title">{t.certificateTitle}</h1>
                <h2 className="cert-subtitle">CUOI'S MOON ADVENTURE – LEFT BEHIND, NEVER FORGOTTEN</h2>
              </div>

              {/* Recipient */}
              <div className="cert-body">
                <p className="cert-presented-text">{t.certificateRecipient}</p>
                <div className="cert-student-name">
                  {studentName.trim() ? studentName : (lang === 'vi' ? 'NHÀ THÁM HIỂM TƯƠNG LAI' : 'FUTURE SPACE EXPLORER')}
                </div>
                <div className="cert-divider-line" />
                <p className="cert-achievement-text">{t.certificateAchievement}</p>
                <div className="cert-badge-award" style={{ color: badgeColor }}>
                  {badgeIcon} {badgeTitle}
                </div>
              </div>

              {/* Footer Meta & Official Seal */}
              <div className="cert-footer">
                <div className="cert-meta-item">
                  <span className="meta-label">{t.certificateDate}:</span>
                  <span className="meta-val">{todayFormatted}</span>
                </div>

                <div className="cert-official-seal">
                  <div className="seal-ring">
                    <span className="seal-text">CUỘI'S MOON HERITAGE</span>
                    <span className="seal-star">⭐ SEAL OF HONOR ⭐</span>
                  </div>
                </div>

                <div className="cert-meta-item">
                  <span className="meta-label">{t.certificateScore}:</span>
                  <span className="meta-val">{score} / 7 ({Math.round((score / 7) * 100)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
