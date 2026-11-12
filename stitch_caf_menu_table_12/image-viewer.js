(function() {
    // 1. Add CSS for the modal
    const style = document.createElement('style');
    style.textContent = `
        #image-viewer-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        #image-viewer-modal.active {
            display: flex;
            opacity: 1;
        }
        #image-viewer-modal img {
            max-width: 95%;
            max-height: 85%;
            object-fit: contain;
            border-radius: 16px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #image-viewer-modal.active img {
            transform: scale(1);
        }
        #image-viewer-close {
            position: absolute;
            top: 30px;
            right: 25px;
            color: white;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            transition: all 0.3s ease;
            z-index: 10000;
        }
        #image-viewer-close:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: rotate(90deg);
        }
        #image-viewer-caption {
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            text-align: center;
            color: white;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
            padding: 0 20px;
        }
        .hero-zoom-hint {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            pointer-events: none;
            opacity: 0.8;
            display: flex;
            align-items: center;
            gap: 6px;
        }
    `;
    document.head.appendChild(style);

    // 2. Add Modal HTML
    const modal = document.createElement('div');
    modal.id = 'image-viewer-modal';
    modal.innerHTML = `
        <span id="image-viewer-close" class="material-symbols-outlined">close</span>
        <img id="image-viewer-img" src="" alt="Full Screen Item">
        <div id="image-viewer-caption"></div>
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('image-viewer-img');
    const closeBtn = document.getElementById('image-viewer-close');
    const captionEl = document.getElementById('image-viewer-caption');

    // 3. Close Logic
    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            if (!modal.classList.contains('active')) {
                modal.style.display = 'none';
            }
        }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalImg) closeModal();
    });

    // 4. Attach to Hero Image
    function initImageViewer() {
        // Try multiple selectors common in the project
        const selectors = [
            '#customization-hero',
            '.brunch-cust-hero',
            '#hero-image',
            '[id*="-hero"]',
            '.hero-container'
        ];

        let foundHero = false;
        selectors.forEach(selector => {
            const hero = document.querySelector(selector);
            if (hero && !hero.dataset.viewerInitialized) {
                foundHero = true;
                hero.dataset.viewerInitialized = "true";
                hero.style.cursor = 'zoom-in';
                
                // Add a subtle hint
                const hint = document.createElement('div');
                hint.className = 'hero-zoom-hint';
                const hintText = (typeof translations !== 'undefined' && translations[getLang()]?.tap_to_view) || 'Tap to view full image';
                hint.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px">zoom_in</span> ${hintText}`;
                hero.appendChild(hint);

                hero.addEventListener('click', () => {
                    let bgUrl = '';
                    
                    // Priority 1: Check for explicit img tags inside
                    const imgInside = hero.querySelector('img');
                    if (imgInside) {
                        bgUrl = imgInside.src;
                    } 
                    // Priority 2: Specifically check for #hero-image (the primary target)
                    else {
                        const heroImgDiv = hero.querySelector('#hero-image') || hero.querySelector('.hero-image');
                        if (heroImgDiv) {
                            bgUrl = heroImgDiv.style.backgroundImage || window.getComputedStyle(heroImgDiv).backgroundImage;
                        } else {
                            // Fallback: Check any div with a background image that isn't just a gradient
                            const divs = hero.querySelectorAll('div');
                            for (let div of divs) {
                                const style = div.style.backgroundImage || window.getComputedStyle(div).backgroundImage;
                                if (style && style !== 'none' && !style.includes('gradient')) {
                                    bgUrl = style;
                                    break;
                                }
                            }
                        }
                    }

                    if (bgUrl && bgUrl !== 'none') {
                        let finalSrc = bgUrl;
                        if (bgUrl.includes('url')) {
                            // Extract URL from url("...") or url(...)
                            // Handles escaped quotes and various URL formats
                            const match = bgUrl.match(/url\s*\(\s*["']?([^"']+)["']?\s*\)/);
                            if (match && match[1]) {
                                finalSrc = match[1];
                            }
                        }

                        // Clean up the URL (some browsers add quotes or escape characters)
                        finalSrc = finalSrc.replace(/^["']|["']$/g, '').trim();
                        
                        // Handle potential double-encoding or relative path issues
                        try {
                            finalSrc = decodeURI(finalSrc);
                        } catch(e) {}

                        const itemName = document.querySelector('h1')?.textContent || '';
                        captionEl.textContent = itemName;
                        modalImg.src = finalSrc;
                        modal.style.display = 'flex';
                        setTimeout(() => modal.classList.add('active'), 10);
                    }
                });
            }
        });
    }

    // Run immediately and also on a short delay to catch dynamic loads
    initImageViewer();
    window.addEventListener('load', initImageViewer);
    setTimeout(initImageViewer, 1000);

    // Update on language change
    document.addEventListener('languageChanged', () => {
        const hint = document.querySelector('.hero-zoom-hint');
        if (hint) {
            const hintText = (typeof translations !== 'undefined' && translations[getLang()]?.tap_to_view) || 'Tap to view full image';
            hint.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px">zoom_in</span> ${hintText}`;
        }
    });
})();
