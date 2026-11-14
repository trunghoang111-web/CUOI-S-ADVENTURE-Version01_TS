# CUOI'S MOON ADVENTURE – Left Behind, Never Forgotten
### CHÚ CUỘI KHÁM PHÁ MẶT TRĂNG – Bỏ Lại, Nhưng Không Rơi Vào Quên Lãng

An interactive, bilingual (Vietnamese/English) educational web application designed for students ages 10–15 and school / NASA Space Apps presentations. Explore NASA space exploration milestones guided by Vietnamese folklore character **Chú Cuội**, learn the true scientific stories behind equipment left on the Moon, and earn an official lunar exploration certificate by completing the Moon Knowledge Challenge.

---

## 🌟 Key Features

1. **Magical, Cinematic 2D Atmosphere**:
   - High-contrast lunar panorama, deep-space starfields, glowing beacons, and Earth on the horizon.
   - Dual-view asset presentation: authentic folklore illustrations of Chu Cuoi paired with historical NASA mission photography.
   - 16:9 desktop immersion and fluid mobile responsiveness.
2. **Authentic Storytelling & Character Integrity**:
   - Preserves Chu Cuoi's original design, costume, expression, and folk spirit from the author's slides.
   - Clearly labels fictional folklore dialogues versus verified NASA scientific facts.
   - Educates students on **Space Heritage (Di sản không gian)** vs. **Space Debris (Rác không gian)**.
3. **Six Interactive Discovery Stations**:
   - **Station 1 (1966)**: Surveyor 1 – The Soft-Landing Pioneer
   - **Station 2 (1969)**: Apollo 11 Lunar Laser Retroreflector (LRRR) – Continuous 50+ Year Science
   - **Station 3 (1969)**: Apollo 11 Memory Flashback – Humanity's First Footsteps (Columbia in orbit vs. Lunar Module on Moon)
   - **Station 4 (1971)**: Apollo 15 Lunar Rover – First Battery-Powered Electric Car on Moon
   - **Station 5 (1972)**: Apollo 17 Lunar Rover – Left Behind, Never Forgotten
   - **Station 6 (1977)**: Voyager 1 & 2 – Interstellar Deep Space Signal
4. **Interactive 7-Question Bilingual Quiz**:
   - One question per screen with immediate visual & audio feedback.
   - Rigorous scientific explanations for every question.
   - Anti-cheat scoring: students cannot double-score by revisiting questions.
5. **Achievement Badges & In-App Printable Certificate**:
   - **7/7**: 👑 Moon Guardian (Vệ binh Mặt Trăng)
   - **5–6/7**: 🥈 Moon Explorer (Nhà thám hiểm Mặt Trăng)
   - **0–4/7**: 🥉 Space Cadet (Học viên Không gian)
   - Live certificate generation with student name, date, score, badge, and official seal.
   - Single-click print / PDF export via browser (`window.print()`) with print-optimized CSS.
6. **Robust Usability**:
   - Global instant VI/EN language switcher (zero mixed-language UI).
   - Web Audio API synthesized sound effects with mute toggle (100% offline).
   - Persistent progress and language saved in `localStorage`.
   - Zero backend, zero external API keys, zero mandatory logins.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Modern ES Modules + Responsive CSS
- **Build & Dev Tooling**: Vite 5 + Standalone Zero-Dependency Offline Bundler (`scripts/build.cjs`)
- **Audio**: Web Audio API (Synthesizer, zero audio asset latency)
- **Effects**: HTML5 Canvas Confetti
- **Deployment**: Fully optimized for GitHub Pages (`base: './'`)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended) & npm installed on your machine.
*(Note: A local zero-dependency wrapper `node.cmd` and `npm.cmd` is also provided in the repository for environments running without global Node in PATH).*

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Mode
Start the local development preview server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Production Build
Compile and bundle the production assets into the `dist/` directory:
```bash
npm run build
```
The build process will:
- Bundle all React components and JSX into `dist/assets/bundle.js`.
- Copy all local NASA photos and Chu Cuội illustrations to `dist/assets/`.
- Copy offline-ready vendor libraries to `dist/vendor/`.
- Generate the standalone `dist/index.html`.

### 4. Preview Production Build
Preview the generated `dist/` build locally:
```bash
npm run preview
```

---

## 🌐 GitHub Pages Publication Guide

The project is pre-configured with relative asset paths (`base: './'`) in `vite.config.js` and `scripts/build.cjs`, making it deployable to GitHub Pages at any repository URL.

### Method A: Automated Deployment via GitHub Actions (Recommended)
This repository includes a pre-configured workflow file at [deploy.yml](file:///d:/Cuoi'%20Journey/.github/workflows/deploy.yml).

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Cuoi's Moon Adventure web app"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Every time you push to `main`, GitHub Actions will automatically run `npm run build` and publish your site!

### Method B: Manual Deployment via `gh-pages` Branch
1. Run the build locally:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to a `gh-pages` branch:
   ```bash
   git add dist -f
   git commit -m "Deploy dist to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```
3. In GitHub **Settings** > **Pages**:
   - Under **Source**, select **Deploy from a branch**.
   - Select branch `gh-pages` and folder `/ (root)`, then click **Save**.
4. Your site will be live at:
   `https://<YOUR_USERNAME>.github.io/<YOUR_REPOSITORY>/`

---

## 📁 Project Directory Structure

```text
Cuoi' Journey/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── dist/                           # Production-ready build output
│   ├── assets/                     # Bundled JS, CSS, and all images
│   ├── vendor/                     # Offline React, ReactDOM, Confetti
│   └── index.html                  # Standalone entry point
├── public/
│   ├── assets/                     # Mapped NASA & Chu Cuội images
│   │   └── manifest.json           # JSON asset manifest
│   └── vendor/                     # React, ReactDOM, Babel, Confetti
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Brand, progress stats, sound & lang controls
│   │   ├── IntroScreen.jsx         # Hero scene, dialogue card, folk legend modal
│   │   ├── MoonMap.jsx             # Side-scrolling lunar panorama & station nodes
│   │   ├── MissionScene.jsx        # Dual-view visuals, dialogue & NASA facts
│   │   ├── FinalStoryScreen.jsx    # Cuội's pledge & Space Heritage vs Debris
│   │   ├── QuizScreen.jsx          # 7-question interactive quiz & live feedback
│   │   └── ResultsScreen.jsx       # Scores, stars, badges & printable certificate
│   ├── data/
│   │   ├── missionsData.js         # 6 discovery stations (bilingual dialogues & NASA facts)
│   │   ├── quizData.js             # 7 bilingual quiz questions & explanations
│   │   └── translations.js         # Global Vietnamese & English localization dictionary
│   ├── utils/
│   │   └── soundEffects.js         # Web Audio API sound synthesizer (100% offline)
│   ├── App.css                     # Cinematic space game stylesheet & print CSS
│   ├── App.jsx                     # Top-level state & screen router
│   └── main.jsx                    # React 18 DOM mount entry point
├── scripts/
│   ├── build.cjs                   # Production compiler & asset packager
│   ├── build.js                    # ESM build forwarder
│   ├── serve.cjs                   # Local HTTP preview server
│   ├── serve.js                    # ESM preview forwarder
│   └── npm-runner.cjs              # Offline CLI runner for npm commands
├── ASSET_MANIFEST.md               # Complete asset mapping document
├── index.html                      # Development entry point
├── package.json                    # Project metadata & npm scripts
├── vite.config.js                  # Vite configuration (base: './')
├── node.cmd                        # Windows CLI wrapper for Node runtime
├── npm.cmd                         # Windows CLI wrapper for npm commands
└── README.md                       # Documentation & instructions
```

---

## 🗺️ Asset Mapping & Integrity

All media assets are tracked in [ASSET_MANIFEST.md](file:///d:/Cuoi'%20Journey/ASSET_MANIFEST.md).
- Original photos in `imagines/` and slide artwork extracted from `Cuội's Story.pdf` have been preserved.
- Character illustrations are maintained without replacement, artificial resizing, or distortion.
- NASA mission records are verified with direct citations to official NASA archives.

---

## 📜 Educational Credits & License

- **Vietnamese Folklore**: Character of Chú Cuội & Chị Hằng (The Man in the Moon & The Moon Lady).
- **Space History & Photography**: NASA (National Aeronautics and Space Administration) public domain educational archives.
- **Created for**: NASA Space Apps Challenge & STEM Student Exploration.
- **License**: MIT License.
