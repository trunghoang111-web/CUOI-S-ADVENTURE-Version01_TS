import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../data/translations';
import { missionsData } from '../data/missionsData';
import { sounds } from '../utils/soundEffects';

export default function MoonMap({
  lang,
  visitedStations,
  starsCollected,
  currentStationId,
  onSelectStation,
  onGoToFinalStory,
  allStationsVisited
}) {
  const t = translations[lang];
  const [showDrawer, setShowDrawer] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to current station
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector(`.station-node[data-id="${currentStationId}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentStationId]);

  const handleStationClick = (id) => {
    sounds.playClick();
    onSelectStation(id);
  };

  const handleNextStation = () => {
    sounds.playClick();
    const nextId = currentStationId < 6 ? currentStationId + 1 : 1;
    onSelectStation(nextId);
  };

  const handlePrevStation = () => {
    sounds.playClick();
    const prevId = currentStationId > 1 ? currentStationId - 1 : 6;
    onSelectStation(prevId);
  };

  return (
    <div className="screen map-screen">
      {/* Top Banner / Controls */}
      <div className="map-top-bar">
        <div className="map-info-left">
          <h2 className="map-title">🗺️ {t.missionTimeline}</h2>
          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${(visitedStations.length / 6) * 100}%` }}
              />
            </div>
            <span className="progress-label">
              {visitedStations.length}/6 {t.stationsVisited} (⭐ {starsCollected.length}/6)
            </span>
          </div>
        </div>

        <div className="map-actions-right">
          <button
            className="btn-secondary station-drawer-btn"
            onClick={() => { sounds.playClick(); setShowDrawer(true); }}
          >
            📋 {t.chooseStation}
          </button>

          {allStationsVisited && (
            <button
              className="btn-primary final-story-pulse-btn glow-effect"
              onClick={() => { sounds.playClick(); onGoToFinalStory(); }}
            >
              📖 {t.finalStoryTitle} →
            </button>
          )}
        </div>
      </div>

      {/* Main Moon Panorama Container */}
      <div className="moon-panorama-wrapper" ref={scrollRef}>
        <div className="moon-panorama">
          {/* Parallax Starfield & Cosmic Nebula */}
          <div className="panorama-stars" />
          <div className="earth-on-horizon" title="Trái Đất / Planet Earth">
            <div className="earth-glow" />
            <div className="earth-sphere" />
          </div>

          {/* Lunar Terrain SVG Horizon */}
          <div className="lunar-surface-curve">
            <svg viewBox="0 0 2400 300" preserveAspectRatio="none" className="lunar-terrain-svg">
              <path
                d="M0,180 Q200,120 400,160 T800,150 T1200,170 T1600,130 T2000,170 T2400,150 L2400,300 L0,300 Z"
                fill="#161b29"
              />
              <path
                d="M0,220 Q300,180 600,210 T1200,200 T1800,220 T2400,190 L2400,300 L0,300 Z"
                fill="#0f131f"
              />
            </svg>
          </div>

          {/* Timeline Connector Line */}
          <div className="timeline-connector-line" />

          {/* Mission Stations Hotspots */}
          <div className="stations-track">
            {missionsData.map((mission, index) => {
              const isVisited = visitedStations.includes(mission.id);
              const isCurrent = currentStationId === mission.id;
              const hasStar = starsCollected.includes(mission.id);
              const isDeepSpace = mission.id === 6;

              return (
                <div
                  key={mission.id}
                  className={`station-node ${isCurrent ? 'active' : ''} ${isVisited ? 'visited' : ''} ${isDeepSpace ? 'deep-space-node' : ''}`}
                  data-id={mission.id}
                  style={{ left: `${140 + index * 360}px` }}
                  onClick={() => handleStationClick(mission.id)}
                >
                  {/* Cuội Moving Avatar Marker */}
                  {isCurrent && (
                    <div className="cuoi-travelling-marker">
                      <img
                        src="assets/cuoi-waving.png"
                        alt="Cuội at this station"
                        className="cuoi-marker-img"
                      />
                      <div className="marker-speech-tag">Cuội!</div>
                    </div>
                  )}

                  {/* Pulsing Target / Hotspot Beacon */}
                  <div className="node-beacon">
                    <div className="beacon-ring" />
                    <div className="beacon-core">
                      {isDeepSpace ? '📡' : hasStar ? '⭐' : isVisited ? '✓' : mission.id}
                    </div>
                  </div>

                  {/* Mission Card on Horizon */}
                  <div className="node-card">
                    <div className="node-year-badge">{mission.year}</div>
                    <div className="node-img-thumb">
                      <img
                        src={mission.nasaImg}
                        alt={mission.title[lang]}
                        loading="lazy"
                        className="thumb-image"
                      />
                    </div>
                    <h3 className="node-title">{mission.title[lang]}</h3>
                    <div className="node-meta-pills">
                      {hasStar && <span className="star-badge" title="Đã thu thập Ngôi sao!">⭐</span>}
                      {isVisited && <span className="visited-badge">✓ {lang === 'vi' ? 'Đã xem' : 'Visited'}</span>}
                      {isDeepSpace && <span className="deep-space-pill">🌌 Interstellar</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Space Signal Waves Indicator for Station 6 */}
          <div className="deep-space-signal-animation" style={{ left: `${140 + 5 * 360}px` }}>
            <div className="signal-wave wave-1" />
            <div className="signal-wave wave-2" />
            <div className="signal-wave wave-3" />
            <div className="signal-caption">{t.deepSpaceStationNote}</div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Controls */}
      <div className="map-bottom-controls">
        <button
          className="map-nav-btn prev-btn"
          onClick={handlePrevStation}
          title={t.prevStation}
        >
          ◀ {t.prevStation}
        </button>

        <div className="map-current-pill">
          <span>{lang === 'vi' ? 'Trạm' : 'Station'} {currentStationId}/6:</span>
          <strong>{missionsData[currentStationId - 1].title[lang]}</strong>
          <button
            className="btn-primary open-station-btn"
            onClick={() => handleStationClick(currentStationId)}
          >
            🚀 {lang === 'vi' ? 'Khám phá ngay' : 'Explore Now'}
          </button>
        </div>

        <button
          className="map-nav-btn next-btn"
          onClick={handleNextStation}
          title={t.nextStation}
        >
          {t.nextStation} ▶
        </button>
      </div>

      {/* Station Directory Drawer */}
      {showDrawer && (
        <div className="modal-overlay" onClick={() => setShowDrawer(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>📋 {t.chooseStation}</h3>
              <button className="close-btn" onClick={() => setShowDrawer(false)}>×</button>
            </div>
            <div className="drawer-list">
              {missionsData.map((m) => {
                const isVisited = visitedStations.includes(m.id);
                const hasStar = starsCollected.includes(m.id);
                return (
                  <div
                    key={m.id}
                    className={`drawer-item ${currentStationId === m.id ? 'active' : ''}`}
                    onClick={() => {
                      setShowDrawer(false);
                      handleStationClick(m.id);
                    }}
                  >
                    <div className="drawer-item-thumb">
                      <img src={m.nasaImg} alt={m.title[lang]} />
                    </div>
                    <div className="drawer-item-info">
                      <div className="drawer-item-year">Năm {m.year}</div>
                      <div className="drawer-item-title">{m.title[lang]}</div>
                      <div className="drawer-item-sub">{m.subtitle[lang]}</div>
                    </div>
                    <div className="drawer-item-status">
                      {hasStar && <span title="Knowledge Star">⭐</span>}
                      {isVisited && <span className="check">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
