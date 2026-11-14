import React from 'react';
import { translations } from '../data/translations';
import { sounds } from '../utils/soundEffects';

export default function Header({
  lang,
  setLang,
  muted,
  setMuted,
  currentScreen,
  setCurrentScreen,
  visitedCount,
  starsCount,
  totalStations,
  onReset
}) {
  const t = translations[lang];

  const handleToggleSound = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    sounds.setMuted(newMuted);
    if (!newMuted) sounds.playClick();
  };

  const handleToggleLang = () => {
    const newLang = lang === 'vi' ? 'en' : 'vi';
    setLang(newLang);
    sounds.playClick();
  };

  return (
    <header className="app-header">
      <div className="header-brand" onClick={() => { sounds.playClick(); setCurrentScreen('intro'); }}>
        <div className="header-logo-badge">🌙</div>
        <div className="header-titles">
          <h1 className="header-title">{t.appTitle}</h1>
          <span className="header-subtitle">{t.appSubtitle}</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Progress pills if not on intro */}
        {currentScreen !== 'intro' && (
          <div className="header-progress-group">
            <button
              className={`nav-pill ${currentScreen === 'map' ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); setCurrentScreen('map'); }}
              title={t.backToMap}
            >
              🗺️ {t.backToMap}
            </button>
            <span className="stat-pill" title={t.stationsVisited}>
              📍 {visitedCount}/{totalStations}
            </span>
            <span className="stat-pill stars" title={t.starsCollected}>
              ⭐ {starsCount}/{totalStations}
            </span>
          </div>
        )}

        {/* Global Controls */}
        <div className="header-controls">
          <button
            className="control-btn lang-toggle"
            onClick={handleToggleLang}
            title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
          >
            <span className="flag-icon">{lang === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN'}</span>
          </button>

          <button
            className="control-btn sound-toggle"
            onClick={handleToggleSound}
            title={muted ? t.soundOn : t.soundMuted}
          >
            {muted ? '🔇' : '🔊'}
          </button>

          <button
            className="control-btn reset-btn"
            onClick={onReset}
            title={t.resetProgress}
          >
            🔄
          </button>
        </div>
      </div>
    </header>
  );
}
