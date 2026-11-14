import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { missionsData } from '../data/missionsData';
import { sounds } from '../utils/soundEffects';

export default function MissionScene({
  missionId,
  lang,
  onBackToMap,
  onNextStation,
  onPrevStation,
  onCollectStar,
  starsCollected,
  onGoToFinalStory
}) {
  const t = translations[lang];
  const mission = missionsData.find((m) => m.id === missionId) || missionsData[0];
  const dialogues = mission.dialogues[lang];

  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [showNasaFacts, setShowNasaFacts] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  // Reset dialogue to the beginning whenever missionId changes
  useEffect(() => {
    setDialogueIdx(0);
    setShowNasaFacts(false);
    setZoomImage(null);
  }, [missionId]);

  const isDialogueFinished = dialogueIdx >= dialogues.length - 1;
  const hasStar = starsCollected.includes(mission.id);

  const handleNextDialogue = () => {
    sounds.playBlip();
    if (dialogueIdx < dialogues.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    }
  };

  const handleCollectKnowledgeStar = () => {
    if (!hasStar) {
      sounds.playStarChime();
      onCollectStar(mission.id);
    }
  };

  const currentDialogue = dialogues[dialogueIdx];
  const isCuoiSpeaker = currentDialogue.speaker.toLowerCase().includes('cuội') || currentDialogue.speaker.toLowerCase().includes('cuoi');

  return (
    <div className="screen mission-scene-screen">
      {/* Station Navigation Header */}
      <div className="scene-header">
        <button
          className="btn-secondary nav-btn"
          onClick={() => { sounds.playClick(); onBackToMap(); }}
        >
          🗺️ {t.backToMap}
        </button>

        <div className="scene-header-center">
          <span className="mission-year-pill">Năm / Year {mission.year}</span>
          <h2 className="scene-header-title">{mission.title[lang]}</h2>
          <span className="scene-header-sub">{mission.subtitle[lang]}</span>
        </div>

        <div className="scene-nav-arrows">
          <button
            className="btn-icon"
            onClick={() => { sounds.playClick(); onPrevStation(); }}
            title={t.prevStation}
          >
            ◀
          </button>
          <span className="station-indicator-pill">{mission.id}/6</span>
          <button
            className="btn-icon"
            onClick={() => {
              sounds.playClick();
              if (mission.id === 6) {
                onGoToFinalStory();
              } else {
                onNextStation();
              }
            }}
            title={mission.id === 6 ? t.finalStoryTitle : t.nextStation}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Main Content Grid: Left Visual Showcase & Right Interactive Story Panel */}
      <div className="scene-content-grid">
        {/* Visual Showcase (Cuội Art & NASA Historical Photo) */}
        <div className="scene-visual-showcase">
          <div className="visual-card-wrapper cuoi-artwork-card">
            <div className="card-badge cuoi-badge">
              <span>🎭 {t.dualViewCuoi}</span>
            </div>
            <div className="image-container contain-mode">
              <img
                src={mission.cuoiImg}
                alt={mission.title[lang]}
                className="artwork-img"
              />
            </div>
          </div>

          <div
            className="visual-card-wrapper nasa-photo-card"
            onClick={() => setZoomImage(mission.nasaImg)}
            title={t.clickToZoom}
          >
            <div className="card-badge nasa-badge">
              <span>🚀 {t.dualViewNasa} (NASA Archive)</span>
            </div>
            <div className="image-container contain-mode zoomable">
              <img
                src={mission.nasaImg}
                alt={mission.nasaImgCaption[lang]}
                className="nasa-img"
              />
              <div className="zoom-hint-overlay">🔍 {t.clickToZoom}</div>
            </div>
            <p className="nasa-caption-text">{mission.nasaImgCaption[lang]}</p>
          </div>
        </div>

        {/* Interactive Story, Dialogue & Facts Panel */}
        <div className="scene-story-panel">
          {/* Fictional vs NASA Facts Indicator */}
          <div className="badge-tag-row">
            <span className="category-tag fictional-tag">
              🎭 {t.fictionalLabel}
            </span>
            <span className="category-tag nasa-tag">
              🔬 {t.nasaFactLabel}
            </span>
          </div>

          {/* Dialogue Box */}
          <div className="dialogue-box-container">
            <div className="dialogue-meta-row">
              <span className="speaker-name">
                {isCuoiSpeaker ? '🌕 Chú Cuội' : `🛸 ${currentDialogue.speaker}`}
              </span>
              <span className="dialogue-counter">
                {t.dialogueStep} {dialogueIdx + 1}/{dialogues.length}
              </span>
            </div>

            <div className={`speech-bubble ${isCuoiSpeaker ? 'cuoi-bubble' : 'visitor-bubble'}`}>
              <p className="speech-paragraph">"{currentDialogue.text}"</p>
            </div>

            {/* Dialogue Action */}
            <div className="dialogue-actions-row">
              {!isDialogueFinished ? (
                <button
                  className="btn-primary next-dialogue-btn glow-effect"
                  onClick={handleNextDialogue}
                >
                  💬 {t.nextDialogue} ({dialogueIdx + 1}/{dialogues.length}) →
                </button>
              ) : (
                <div className="dialogue-completed-banner">
                  <span>✨ {t.dialogueComplete}</span>
                </div>
              )}
            </div>
          </div>

          {/* Educational Takeaway Card */}
          <div className="takeaway-card">
            <div className="takeaway-header">
              <span className="takeaway-sparkle">💡</span>
              <h4>{t.takeawayLabel}</h4>
            </div>
            <p className="takeaway-body">"{mission.takeaway[lang]}"</p>
          </div>

          {/* Knowledge Star Collection Button */}
          <div className="collect-star-container">
            <button
              className={`btn-star ${hasStar ? 'star-collected' : isDialogueFinished ? 'star-ready glow-effect' : 'star-locked'}`}
              onClick={handleCollectKnowledgeStar}
              disabled={!isDialogueFinished || hasStar}
            >
              {hasStar ? (
                <>⭐ {t.starAlreadyCollected}</>
              ) : isDialogueFinished ? (
                <>🌟 {t.collectStar}</>
              ) : (
                <>🔒 {lang === 'vi' ? 'Hoàn thành hội thoại để nhận Sao' : 'Finish dialogue to unlock Star'}</>
              )}
            </button>
          </div>

          {/* NASA Real Facts Accordion Drawer */}
          <div className="nasa-facts-accordion">
            <button
              className="accordion-toggle-btn"
              onClick={() => { sounds.playClick(); setShowNasaFacts(!showNasaFacts); }}
            >
              <span>{showNasaFacts ? '📂' : '📁'} {showNasaFacts ? t.hideNasaFacts : t.seeNasaFacts}</span>
              <span className="arrow-icon">{showNasaFacts ? '▲' : '▼'}</span>
            </button>

            {showNasaFacts && (
              <div className="nasa-facts-body">
                <div className="nasa-source-badge">
                  <span>🏛️ National Aeronautics and Space Administration (NASA)</span>
                </div>
                <p className="nasa-facts-paragraph">{mission.nasaFacts[lang]}</p>
                <div className="nasa-link-row">
                  <a
                    href={mission.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nasa-official-link"
                  >
                    🔗 {t.officialNasaSource} ↗
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Mission Navigation */}
          <div className="scene-footer-nav">
            <button
              className="btn-secondary"
              onClick={() => { sounds.playClick(); onPrevStation(); }}
            >
              ◀ {t.prevStation}
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                sounds.playClick();
                if (mission.id === 6) {
                  onGoToFinalStory();
                } else {
                  onNextStation();
                }
              }}
            >
              {mission.id === 6 ? `📖 ${t.finalStoryTitle} →` : `${t.nextStation} ▶`}
            </button>
          </div>
        </div>
      </div>

      {/* High-Resolution NASA Photo Zoom Modal */}
      {zoomImage && (
        <div className="modal-overlay" onClick={() => setZoomImage(null)}>
          <div className="zoom-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn zoom-close" onClick={() => setZoomImage(null)}>×</button>
            <img src={zoomImage} alt="NASA High Res" className="zoomed-nasa-img" />
            <div className="zoom-caption">{mission.nasaImgCaption[lang]}</div>
          </div>
        </div>
      )}
    </div>
  );
}
