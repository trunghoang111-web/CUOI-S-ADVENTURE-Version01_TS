import React from 'react';
import { translations } from '../data/translations';
import { finalStoryContent } from '../data/missionsData';
import { sounds } from '../utils/soundEffects';

export default function FinalStoryScreen({
  lang,
  onStartQuiz,
  onBackToMap
}) {
  const t = translations[lang];

  return (
    <div className="screen final-story-screen">
      <div className="final-story-card">
        {/* Header */}
        <div className="final-header">
          <div className="final-badge">
            <span>✨ {lang === 'vi' ? 'Thông Điệp Ý Nghĩa' : 'Core Exploration Takeaway'}</span>
          </div>
          <h2 className="final-title">{t.finalStoryTitle}</h2>
          <h3 className="final-subtitle">"{t.appSubtitle}"</h3>
        </div>

        {/* Dual Artwork Showcase */}
        <div className="final-artwork-grid">
          <div className="artwork-item">
            <img
              src="assets/cuoi-final-story.png"
              alt="Cuội with hand on heart"
              className="final-img"
            />
            <span className="artwork-caption">
              {lang === 'vi' ? 'Cuội ghi nhớ câu chuyện của nhân loại' : 'Cuội keeping human memories alive'}
            </span>
          </div>

          <div className="artwork-item">
            <img
              src="assets/cuoi-final-values.png"
              alt="Cuội space exploration values"
              className="final-img"
            />
            <span className="artwork-caption">
              {lang === 'vi' ? '3 Giá trị thám hiểm: Khám phá - Học hỏi - Giúp đỡ' : 'Core Values: Explore - Learn - Help'}
            </span>
          </div>
        </div>

        {/* Cuội's Inspiring Quote */}
        <div className="cuoi-quote-banner">
          <div className="quote-mark">“</div>
          <p className="quote-text">{finalStoryContent.quote[lang]}</p>
          <div className="quote-author">– Chú Cuội / Chu Cuoi –</div>
        </div>

        {/* Space Heritage vs Space Debris Educational Callout */}
        <div className="educational-heritage-box">
          <div className="heritage-header">
            <h4>🛰️ {t.heritageVsDebrisTitle}</h4>
          </div>
          <div className="heritage-grid">
            <div className="heritage-col good-heritage">
              <h5>🏛️ {lang === 'vi' ? 'Di sản Không gian (Space Heritage)' : 'Space Heritage'}</h5>
              <p>{t.heritageDesc}</p>
            </div>
            <div className="heritage-col space-debris">
              <h5>⚠️ {lang === 'vi' ? 'Rác Không gian (Space Debris)' : 'Space Debris'}</h5>
              <p>{t.debrisDesc}</p>
            </div>
          </div>
          <div className="heritage-footer-note">
            <em>
              {lang === 'vi'
                ? "Các thiết bị trên Mặt Trăng không phải là 'rác thải'. Chúng là những hiện vật lịch sử vĩ đại được cộng đồng quốc tế kêu gọi bảo tồn như di sản của nền văn minh Trái Đất."
                : "Equipment left on the Moon is not 'trash'. These are precious historical monuments that international scientific conventions work to protect as the heritage of human civilization."}
            </em>
          </div>
        </div>

        {/* Action Controls */}
        <div className="final-actions">
          <button
            className="btn-secondary"
            onClick={() => { sounds.playClick(); onBackToMap(); }}
          >
            🗺️ {t.backToMap}
          </button>

          <button
            className="btn-primary start-quiz-cta glow-effect"
            onClick={() => { sounds.playClick(); onStartQuiz(); }}
          >
            🚀 {t.startChallenge} →
          </button>
        </div>
      </div>
    </div>
  );
}
