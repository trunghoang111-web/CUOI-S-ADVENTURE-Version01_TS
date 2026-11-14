import React, { useState } from 'react';
import { translations } from '../data/translations';
import { sounds } from '../utils/soundEffects';

export default function IntroScreen({ lang, setLang, onStart, visitedCount }) {
  const t = translations[lang];
  const [showFolkStory, setShowFolkStory] = useState(false);

  return (
    <div className="screen intro-screen">
      <div className="hero-backdrop">
        <img
          src="assets/cuoi-hero-moon.png"
          alt="Chu Cuoi & Chi Hang on the Moon"
          className="hero-image"
        />
        <div className="hero-gradient-overlay" />
        <div className="twinkling-stars-layer" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-sparkle">✨</span>
          <span>{t.targetAudience}</span>
        </div>

        <h1 className="hero-main-title">{t.appTitle}</h1>
        <h2 className="hero-sub-title">"{t.appSubtitle}"</h2>

        {/* Cuội Dialogue Card */}
        <div className="intro-dialogue-card">
          <div className="cuoi-avatar-ring">
            <img
              src="assets/cuoi-waving.png"
              alt="Chu Cuội"
              className="cuoi-avatar-img"
            />
          </div>
          <div className="dialogue-speech-bubble">
            <div className="speaker-tag">Chú Cuội / Cuội</div>
            <p className="speech-text">{t.introGreeting}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn-primary cta-btn glow-effect"
            onClick={() => { sounds.playClick(); onStart(); }}
          >
            🚀 {visitedCount > 0 ? t.continueExploring : t.startExploring}
          </button>

          <button
            className="btn-secondary folk-story-btn"
            onClick={() => { sounds.playClick(); setShowFolkStory(!showFolkStory); }}
          >
            📜 {lang === 'vi' ? 'Sự tích Chú Cuội & Cây Đa' : 'Vietnamese Folklore Origin'}
          </button>
        </div>

        {/* Language Quick Selector */}
        <div className="intro-lang-switch">
          <button
            className={`lang-pill ${lang === 'vi' ? 'active' : ''}`}
            onClick={() => { sounds.playClick(); setLang('vi'); }}
          >
            🇻🇳 Tiếng Việt
          </button>
          <button
            className={`lang-pill ${lang === 'en' ? 'active' : ''}`}
            onClick={() => { sounds.playClick(); setLang('en'); }}
          >
            🇺🇸 English
          </button>
        </div>

        {/* Folk Story Memory Modal */}
        {showFolkStory && (
          <div className="modal-overlay" onClick={() => setShowFolkStory(false)}>
            <div className="modal-content folk-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{lang === 'vi' ? 'Sự Tích Chú Cuội Cung Trăng' : 'The Legend of Chu Cuội'}</h3>
                <button className="close-btn" onClick={() => setShowFolkStory(false)}>×</button>
              </div>
              <div className="modal-body">
                <img
                  src="assets/cuoi-wife-memory.png"
                  alt="Cuội memory"
                  className="folk-img"
                />
                <p className="folk-text">
                  {lang === 'vi'
                    ? "Theo cổ tích Việt Nam, chú Cuội vì giữ lấy cây đa thần kỳ chữa bệnh cho muôn loài mà bị kéo bay lên tận Cung Trăng. Trải qua bao năm tháng một mình nơi Mặt Trăng tĩnh lặng, Cuội đã chứng kiến những vị khách phi thường từ Trái Đất hạ cánh mang theo khát vọng hòa bình và khám phá!"
                    : "In Vietnamese folklore, Chu Cuoi held onto the roots of a miraculous healing banyan tree that soared into the sky, carrying him to the Moon. Over generations in the quiet lunar solitude, Cuoi has witnessed remarkable spacecraft arrive from Earth, carrying humanity's courage, science, and peaceful dreams!"}
                </p>
                <div className="dialogue-quote">
                  <em>"{t.introWifeDialogue}"</em>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" onClick={() => setShowFolkStory(false)}>
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
