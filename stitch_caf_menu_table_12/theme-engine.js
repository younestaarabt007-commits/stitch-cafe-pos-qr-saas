/**
 * Stitch Café & Roastery — Universal 3-Theme Engine
 * Provides triple theme support:
 *   1. "classic"     : Clean, minimal white, modern light UI
 *   2. "gourmet"     : Starbucks Reserve luxury experience with warm latte palette,
 *                      editorial typography, and rich category-specific accents.
 *   3. "swiggy-bold" : High-conversion modern Swiggy/food-delivery experience with
 *                      colorful doodle background, hero XXL food cards (photo takes 70%),
 *                      superimposed floating badges, and signature "AJOUTER +" buttons.
 */
(function () {
  const THEME_STORAGE_KEY = 'stitch_menu_theme';
  const VALID_THEMES = ['classic', 'gourmet', 'swiggy-bold'];
  const DEFAULT_THEME = 'swiggy-bold';

  function getApiBase() {
    try {
      const custom = localStorage.getItem('stitch_live_api_base');
      if (custom) return custom.replace(/\/$/, '');
    } catch (_) {}
    if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
      return window.location.origin;
    }
    return 'http://127.0.0.1:8000';
  }

  function detectTheme() {
    // 1. URL parameter override (?theme=classic, ?theme=gourmet, ?theme=swiggy-bold)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTheme = urlParams.get('theme');
      if (urlTheme && VALID_THEMES.includes(urlTheme.toLowerCase())) {
        const clean = urlTheme.toLowerCase();
        try { localStorage.setItem(THEME_STORAGE_KEY, clean); } catch (_) {}
        return clean;
      }
    } catch (_) {}

    // 2. Local storage
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && VALID_THEMES.includes(stored)) {
        return stored;
      }
    } catch (_) {}

    return DEFAULT_THEME;
  }

  let currentTheme = detectTheme();

  function applyThemeToDom(theme) {
    if (!VALID_THEMES.includes(theme)) theme = DEFAULT_THEME;
    currentTheme = theme;

    const root = document.documentElement;
    const body = document.body;

    root.setAttribute('data-stitch-theme', theme);

    if (body) {
      body.classList.remove('theme-classic', 'theme-gourmet', 'theme-swiggy-bold');
      body.classList.add(`theme-${theme}`);
    }

    // Adapt Header and Hero texts dynamically to ensure 3 completely distinct identities
    try {
      const greetingEl = document.getElementById('header-greeting');
      const titleEl = document.getElementById('header-main-title');
      const taglineEl = document.getElementById('header-theme-tagline');
      const videoEl = document.getElementById('menu-hero-video');

      if (theme === 'classic') {
        if (greetingEl) greetingEl.innerHTML = '<span class="material-symbols-outlined text-[13px] text-gray-400">local_cafe</span><span>Torréfaction Artisanale</span>';
        if (titleEl) titleEl.textContent = "Stitch Café · Menu Épuré";
        if (taglineEl) {
          taglineEl.textContent = "Dégustation sur place & sélection épurée du jour";
          taglineEl.classList.remove('hidden');
        }
        if (videoEl) {
          try { videoEl.pause(); } catch (_) {}
        }
      } else if (theme === 'gourmet') {
        if (greetingEl) greetingEl.innerHTML = '<span class="material-symbols-outlined text-[13px] text-amber-300">star</span><span>Collection Réserve Privée</span>';
        if (titleEl) titleEl.textContent = "L'Atelier Stitch Roastery";
        if (taglineEl) {
          taglineEl.textContent = "Grands crus d'origine pure, torréfaction lente & pâtisseries fines";
          taglineEl.classList.remove('hidden');
        }
        if (videoEl) {
          try { videoEl.play(); } catch (_) {}
        }
      } else if (theme === 'swiggy-bold') {
        if (greetingEl) greetingEl.innerHTML = '<span class="animate-pulse">⚡</span><span>EN DIRECT DE LA CUISINE</span>';
        if (titleEl) titleEl.textContent = "Envies Fraîches & Street Food 🔥";
        if (taglineEl) {
          taglineEl.textContent = "Préparé à la minute · Photos XXL & Saveurs Croustillantes";
          taglineEl.classList.remove('hidden');
        }
        if (videoEl) {
          try { videoEl.play(); } catch (_) {}
        }
      }
    } catch (_) {}

    // Notify listeners (e.g. menu rendering script)
    try {
      window.dispatchEvent(new CustomEvent('stitchThemeChanged', { detail: { theme } }));
    } catch (_) {}
  }

  window.getStitchActiveTheme = function () {
    return currentTheme;
  };

  window.setStitchActiveTheme = async function (theme, syncServer = true) {
    if (!VALID_THEMES.includes(theme)) return;
    currentTheme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {}

    applyThemeToDom(theme);

    if (syncServer) {
      try {
        await fetch(`${getApiBase()}/api/settings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activeTheme: theme })
        });
      } catch (err) {
        console.warn('Could not sync theme with server:', err);
      }
    }
  };

  // Asynchronously fetch server settings on startup to ensure customer phone matches merchant choice
  async function syncThemeFromServer() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('theme')) {
      return; // URL explicitly dictates theme for previewing
    }
    try {
      const res = await fetch(`${getApiBase()}/api/settings`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && json.data && json.data.activeTheme) {
          const serverTheme = json.data.activeTheme;
          if (VALID_THEMES.includes(serverTheme) && serverTheme !== currentTheme) {
            applyThemeToDom(serverTheme);
            try { localStorage.setItem(THEME_STORAGE_KEY, serverTheme); } catch (_) {}
          }
        }
      }
    } catch (_) {}
  }

  // Inject Theme CSS into page head
  function injectThemeStyles() {
    if (document.getElementById('stitch-theme-engine-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'stitch-theme-engine-styles';
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Outfit:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

      /* ========================================================= */
      /* DISTINCT HEADERS & ATMOSPHERES (3 UNIQUE DESIGNS)        */
      /* ========================================================= */

      /* THEME 1: CLASSIC MINIMALIST HEADER */
      body.theme-classic header {
        background: #FFFFFF !important;
        border-bottom: 1.5px solid #E5E7EB !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03) !important;
        min-height: auto !important;
        padding-bottom: 1rem !important;
      }
      body.theme-classic #hero-bg-container video {
        display: none !important;
      }
      body.theme-classic #hero-bg-container {
        background: #FAFAFA !important;
      }
      body.theme-classic #hero-gradient-overlay {
        background: none !important;
      }
      body.theme-classic #theme-hero-banner #header-greeting {
        color: #4B5563 !important;
      }
      body.theme-classic #theme-hero-banner #header-main-title {
        color: #111827 !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        font-weight: 900 !important;
      }
      body.theme-classic #theme-hero-banner #header-theme-tagline {
        color: #6B7280 !important;
      }
      body.theme-classic #search-input {
        background: #F3F4F6 !important;
        border: 1.5px solid #E5E7EB !important;
        color: #111827 !important;
        box-shadow: none !important;
      }
      body.theme-classic #search-input::placeholder {
        color: #9CA3AF !important;
      }
      body.theme-classic #table-badge {
        background: #111827 !important;
        border: 1px solid #374151 !important;
      }
      body.theme-classic #table-badge span {
        color: #FFFFFF !important;
      }

      /* THEME 2: GOURMET RESERVE ROASTERY HEADER */
      body.theme-gourmet header {
        background: #18110D !important;
        border-bottom: 2px solid rgba(217, 119, 6, 0.4) !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45) !important;
      }
      body.theme-gourmet #hero-bg-container {
        background: #18110D !important;
      }
      body.theme-gourmet #hero-gradient-overlay {
        background: linear-gradient(180deg, rgba(24, 17, 13, 0.94) 0%, rgba(38, 26, 20, 0.88) 100%) !important;
      }
      body.theme-gourmet #theme-hero-banner #header-greeting {
        color: #FBBF24 !important;
        font-weight: 800 !important;
        letter-spacing: 0.18em !important;
      }
      body.theme-gourmet #theme-hero-banner #header-main-title {
        color: #FFFDF8 !important;
        font-family: 'Instrument Serif', Georgia, serif !important;
        font-style: italic !important;
        font-size: 1.85rem !important;
        line-height: 1.2 !important;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5) !important;
      }
      body.theme-gourmet #theme-hero-banner #header-theme-tagline {
        color: #D1B89D !important;
        font-style: italic !important;
      }
      body.theme-gourmet #search-input {
        background: rgba(0, 0, 0, 0.45) !important;
        border: 1.5px solid rgba(217, 119, 6, 0.5) !important;
        color: #FFFDF8 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
      }
      body.theme-gourmet #search-input::placeholder {
        color: #D1B89D !important;
      }
      body.theme-gourmet #table-badge {
        background: linear-gradient(135deg, #2D1A10, #18110D) !important;
        border: 1.5px solid rgba(245, 158, 11, 0.6) !important;
        box-shadow: 0 4px 15px rgba(217, 119, 6, 0.3) !important;
      }
      body.theme-gourmet #table-badge span {
        color: #FDE68A !important;
      }

      /* THEME 3: SWIGGY BOLD HIGH ENERGY HEADER */
      body.theme-swiggy-bold header {
        background: linear-gradient(135deg, #FF5200 0%, #E11D48 60%, #F59E0B 100%) !important;
        border-bottom: none !important;
        box-shadow: 0 12px 35px rgba(255, 82, 0, 0.35) !important;
      }
      body.theme-swiggy-bold #hero-bg-container video {
        opacity: 0.22 !important;
      }
      body.theme-swiggy-bold #hero-gradient-overlay {
        background: linear-gradient(135deg, rgba(255, 82, 0, 0.82) 0%, rgba(225, 29, 72, 0.82) 100%) !important;
      }
      body.theme-swiggy-bold #theme-hero-banner #header-greeting {
        color: #FFFFFF !important;
        background: rgba(0, 0, 0, 0.25) !important;
        padding: 0.25rem 0.75rem !important;
        border-radius: 9999px !important;
        display: inline-flex !important;
        width: fit-content !important;
        font-weight: 900 !important;
      }
      body.theme-swiggy-bold #theme-hero-banner #header-main-title {
        color: #FFFFFF !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        font-weight: 900 !important;
        font-size: 1.65rem !important;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) !important;
      }
      body.theme-swiggy-bold #theme-hero-banner #header-theme-tagline {
        color: rgba(255, 255, 255, 0.9) !important;
        font-weight: 700 !important;
      }
      body.theme-swiggy-bold #search-input {
        background: #FFFFFF !important;
        border: 2px solid #FED7AA !important;
        color: #111827 !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
      }
      body.theme-swiggy-bold #search-input::placeholder {
        color: #9CA3AF !important;
      }
      body.theme-swiggy-bold #table-badge {
        background: #FFFFFF !important;
        border: 2px solid #FF5200 !important;
        box-shadow: 0 4px 15px rgba(255, 82, 0, 0.25) !important;
      }
      body.theme-swiggy-bold #table-badge span {
        color: #FF5200 !important;
      }

      /* ========================================================= */
      /* THEME 1 : CLASSIQUE MINIMALISTE                          */
      /* ========================================================= */
      body.theme-classic {
        background-color: #FAFAFA !important;
        background-image: none !important;
        color: #111827 !important;
      }
      body.theme-classic .gourmet-card {
        background: #FFFFFF !important;
        border: 1px solid #E5E7EB !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05) !important;
      }
      body.theme-classic .gourmet-action-btn {
        background: #FF5200 !important;
        color: #FFFFFF !important;
      }

      /* ========================================================= */
      /* THEME 2 : GOURMET RESERVE (STARBUCKS ROASTERY)           */
      /* ========================================================= */
      body.theme-gourmet {
        background-color: #F8F5EE !important;
        background-image: 
          radial-gradient(#E8DEC8 0.8px, transparent 0.8px),
          radial-gradient(at 0% 0%, rgba(255, 82, 0, 0.03) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(138, 90, 43, 0.04) 0px, transparent 50%) !important;
        background-size: 20px 20px, 100% 100%, 100% 100% !important;
        color: #1F1610 !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
      }
      body.theme-gourmet .gourmet-serif {
        font-family: 'Instrument Serif', Georgia, serif !important;
        font-style: italic;
      }
      body.theme-gourmet .gourmet-outfit {
        font-family: 'Outfit', sans-serif !important;
      }

      /* ========================================================= */
      /* THEME 3 : SWIGGY BOLD (DOODLES POP & PHOTOS XXL)         */
      /* ========================================================= */
      body.theme-swiggy-bold {
        background-color: #FBF8F4 !important;
        /* Dynamic Colorful Food Doodle Pattern (Orange, Yellow, Green, Pink, Teal) */
        background-image: url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M25 35h14v10a7 7 0 0 1-7 7 7 7 0 0 1-7-7V35zm14 2h3a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-3v-10z' stroke='%23FF5200' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' opacity='0.22'/%3E%3Cpath d='M85 28c3 0 7 3 7 7 0 7-7 13-14 13s-14-6-14-13c0-4 4-7 7-7 2 0 4 1 5 3 1-2 3-3 6-3z' stroke='%23EAB308' stroke-width='1.8' opacity='0.22'/%3E%3Ccircle cx='30' cy='95' r='10' stroke='%23EA580C' stroke-width='1.8' opacity='0.22'/%3E%3Cpath d='M30 85v20M20 95h20' stroke='%23EA580C' stroke-width='1.2' opacity='0.2'/%3E%3Cpath d='M90 85c0 7-6 12-12 12 0-7 6-12 12-12z' fill='%2310B981' opacity='0.2'/%3E%3Cpath d='M65 60l2 4 4 2-4 2-2 4-2-4-4-2 4-2z' fill='%23EC4899' opacity='0.25'/%3E%3Ccircle cx='70' cy='20' r='2' fill='%238B5CF6' opacity='0.3'/%3E%3Ccircle cx='15' cy='65' r='2.5' fill='%2306B6D4' opacity='0.3'/%3E%3Ccircle cx='105' cy='105' r='2' fill='%23F59E0B' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E") !important;
        background-size: 140px 140px !important;
        color: #111827 !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
      }

      /* Card Transformation in Swiggy Bold: Hero Vertical Food Cards */
      body.theme-swiggy-bold #bestsellers,
      body.theme-swiggy-bold #bestsellers-grid {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)) !important;
        gap: 1.5rem !important;
        padding-bottom: 5rem !important;
      }

      @media (max-width: 640px) {
        body.theme-swiggy-bold #bestsellers,
        body.theme-swiggy-bold #bestsellers-grid {
          grid-template-columns: 1fr !important;
          gap: 1.25rem !important;
        }
      }

      body.theme-swiggy-bold .gourmet-card {
        flex-direction: column !important;
        align-items: stretch !important;
        padding: 0 !important;
        border-radius: 1.8rem !important;
        overflow: hidden !important;
        background: #FFFFFF !important;
        border: 1px solid rgba(0,0,0,0.08) !important;
        box-shadow: 0 10px 25px -6px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03) !important;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
      }

      body.theme-swiggy-bold .gourmet-card:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.12) !important;
      }

      /* Hero Food Image taking prominent appetizing height */
      body.theme-swiggy-bold .gourmet-card > div:first-child {
        width: 100% !important;
        height: 175px !important;
        border-radius: 0 !important;
        position: relative !important;
        overflow: hidden !important;
        background: #F3F4F6 !important;
      }

      body.theme-swiggy-bold .gourmet-card > div:first-child img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        transition: transform 0.6s ease !important;
      }

      body.theme-swiggy-bold .gourmet-card:hover > div:first-child img {
        transform: scale(1.06) !important;
      }

      /* Compact, Clean White Text Area (Chopped vertically to leave space for white) */
      body.theme-swiggy-bold .gourmet-card > div:nth-child(2) {
        padding: 0.55rem 0.85rem 0.55rem 0.85rem !important;
        min-height: auto !important;
        background: #FFFFFF !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
      }

      body.theme-swiggy-bold .gourmet-card h4 {
        font-size: 0.95rem !important;
        font-weight: 800 !important;
        line-height: 1.25 !important;
        color: #111827 !important;
        margin-bottom: 0.15rem !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 1 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }

      body.theme-swiggy-bold .gourmet-card p {
        font-size: 0.75rem !important;
        line-height: 1.3 !important;
        color: #6B7280 !important;
        margin-top: 0.15rem !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 1 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
      }

      /* Mobile Compact Card */
      @media (max-width: 640px) {
        body.theme-swiggy-bold .gourmet-card > div:first-child {
          height: 160px !important;
        }
        body.theme-swiggy-bold .gourmet-card > div:nth-child(2) {
          padding: 0.5rem 0.75rem 0.5rem 0.75rem !important;
        }
      }

      /* Swiggy Big Bold Action Button */
      body.theme-swiggy-bold .gourmet-action-btn {
        padding: 0.6rem 1.35rem !important;
        border-radius: 1rem !important;
        font-size: 0.82rem !important;
        font-weight: 900 !important;
        letter-spacing: 0.04em !important;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
      }

      /* Photo badge superposé vs Inline */
      body.theme-swiggy-bold .swiggy-photo-badge { display: inline-flex !important; }
      body:not(.theme-swiggy-bold) .swiggy-photo-badge { display: none !important; }
      body.theme-swiggy-bold .swiggy-inline-badge { display: none !important; }
      body:not(.theme-swiggy-bold) .swiggy-inline-badge { display: inline-flex !important; }
      /* Hide any lingering watermark icons across all themes */
      .gourmet-watermark,
      body.theme-classic .gourmet-watermark,
      body.theme-gourmet .gourmet-watermark,
      body.theme-swiggy-bold .gourmet-watermark { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }

      /* =================/* ========================================================= */
      /* CLEAN WHITE CARDS WITH SUBTLE EXTREMITY ACCENT LISERÉ     */
      /* ========================================================= */

      /* 1. SMOOTHIES & SHAKES */
      .gourmet-cat-smoothie {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #F472B6 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-smoothie {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #F472B6 !important;
      }
      .gourmet-cat-smoothie .gourmet-tag { background: #F472B6 !important; color: #FFFFFF !important; }
      .gourmet-cat-smoothie .gourmet-action-btn { background: #DB2777 !important; color: #FFFFFF !important; }

      /* 2. JUS FRAIS */
      .gourmet-cat-juice {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #FB923C !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-juice {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #FB923C !important;
      }
      .gourmet-cat-juice .gourmet-tag { background: #FB923C !important; color: #FFFFFF !important; }
      .gourmet-cat-juice .gourmet-action-btn { background: #EA580C !important; color: #FFFFFF !important; }

      /* 3. THÉS & INFUSIONS */
      .gourmet-cat-tea {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #10B981 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-tea {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #10B981 !important;
      }
      .gourmet-cat-tea .gourmet-tag { background: #10B981 !important; color: #FFFFFF !important; }
      .gourmet-cat-tea .gourmet-action-btn { background: #059669 !important; color: #FFFFFF !important; }

      /* 4. TOASTS & TARTINES */
      .gourmet-cat-toast {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #84CC16 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-toast {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #84CC16 !important;
      }
      .gourmet-cat-toast .gourmet-tag { background: #84CC16 !important; color: #FFFFFF !important; }
      .gourmet-cat-toast .gourmet-action-btn { background: #65A30D !important; color: #FFFFFF !important; }

      /* 5. MILKSHAKES GOURMANDS */
      .gourmet-cat-milkshake {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #A855F7 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-milkshake {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #A855F7 !important;
      }
      .gourmet-cat-milkshake .gourmet-tag { background: #A855F7 !important; color: #FFFFFF !important; }
      .gourmet-cat-milkshake .gourmet-action-btn { background: #7E22CE !important; color: #FFFFFF !important; }

      /* 6. FAST FOOD & BURGERS */
      .gourmet-cat-fastfood {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #EF4444 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-fastfood {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #EF4444 !important;
      }
      .gourmet-cat-fastfood .gourmet-tag { background: #EF4444 !important; color: #FFFFFF !important; }
      .gourmet-cat-fastfood .gourmet-action-btn { background: #DC2626 !important; color: #FFFFFF !important; }

      /* 7. CAFÉS NOIRS INTENSES */
      .gourmet-cat-coffee {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #78350F !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-coffee {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #78350F !important;
      }
      .gourmet-cat-coffee .gourmet-tag { background: #78350F !important; color: #FFFFFF !important; }
      .gourmet-cat-coffee .gourmet-action-btn { background: #3D2214 !important; color: #FFFFFF !important; }

      /* 8. LATTÉS & CRÉMEUX */
      .gourmet-cat-latte {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #D97706 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-latte {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #D97706 !important;
      }
      .gourmet-cat-latte .gourmet-tag { background: #D97706 !important; color: #FFFFFF !important; }
      .gourmet-cat-latte .gourmet-action-btn { background: #92400E !important; color: #FFFFFF !important; }

      /* 9. PÂTISSERIES & BOULANGERIE */
      .gourmet-cat-pastry, .gourmet-cat-bread {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #CA8A04 !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-pastry, [dir="rtl"] .gourmet-cat-bread {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #CA8A04 !important;
      }
      .gourmet-cat-pastry .gourmet-tag, .gourmet-cat-bread .gourmet-tag { background: #CA8A04 !important; color: #FFFFFF !important; }
      .gourmet-cat-pastry .gourmet-action-btn, .gourmet-cat-bread .gourmet-action-btn { background: #A16207 !important; color: #FFFFFF !important; }

      /* 10. BRUNCH SIGNATURE */
      .gourmet-cat-brunch {
        background: #FFFFFF !important;
        border: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: 4.5px solid #F59E0B !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04) !important;
      }
      [dir="rtl"] .gourmet-cat-brunch {
        border-left: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-right: 4.5px solid #F59E0B !important;
      }
      .gourmet-cat-brunch .gourmet-tag { background: #F59E0B !important; color: #FFFFFF !important; }
      .gourmet-cat-brunch .gourmet-action-btn { background: #D97706 !important; color: #FFFFFF !important; }
      `;
    document.head.appendChild(styleEl);
  }

  // Init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectThemeStyles();
      applyThemeToDom(currentTheme);
      syncThemeFromServer();
    });
  } else {
    injectThemeStyles();
    applyThemeToDom(currentTheme);
    syncThemeFromServer();
  }
})();
