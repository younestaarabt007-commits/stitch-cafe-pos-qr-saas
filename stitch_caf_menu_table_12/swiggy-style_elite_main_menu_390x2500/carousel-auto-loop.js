(function () {
    function initCarousel() {
        const container = document.querySelector('#hero-carousel .flex');
        if (!container) return;

        // Check if already initialized to prevent duplicates
        if (container.getAttribute('data-init') === 'true') return;
        container.setAttribute('data-init', 'true');

        // Get original cards
        const originalCards = Array.from(container.children);
        if (originalCards.length === 0) return;

        // Add CSS for smooth animations
        const style = document.createElement('style');
        style.textContent = `
            #hero-carousel .flex {
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch;
                scroll-snap-type: x mandatory;
            }
            #hero-carousel .flex > div {
                scroll-snap-align: center;
                flex-shrink: 0;
                transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease;
            }
            #hero-carousel .flex > div:hover {
                transform: scale(1.02);
            }
            .carousel-clone {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);

        // --- Infinite Loop Setup ---

        const lastCard = originalCards[originalCards.length - 1];
        const firstCard = originalCards[0];
        const secondCard = originalCards[1];

        // Create clones
        const cloneLast = lastCard.cloneNode(true);
        cloneLast.setAttribute('aria-hidden', 'true');
        cloneLast.classList.add('carousel-clone');

        const cloneFirst = firstCard.cloneNode(true);
        cloneFirst.setAttribute('aria-hidden', 'true');
        cloneFirst.classList.add('carousel-clone');

        let cloneSecond = null;
        if (secondCard) {
            cloneSecond = secondCard.cloneNode(true);
            cloneSecond.setAttribute('aria-hidden', 'true');
            cloneSecond.classList.add('carousel-clone');
        }

        // Insert clones
        container.prepend(cloneLast);
        container.appendChild(cloneFirst);
        if (cloneSecond) container.appendChild(cloneSecond);

        // Update list of all cards
        let allCards = Array.from(container.children);

        const startIndex = 1;
        const realLastIndex = originalCards.length;
        const jumpTriggerIndex = originalCards.length + 1;

        let currentIndex = startIndex;
        let autoScrollInterval;
        let isPerformingAutoScroll = false;
        let isVisible = true;
        let isUserScrolling = false;

        // High-spec motion settings
        const SCROLL_DURATION = 600; // ms - faster but smooth
        const SLIDE_INTERVAL = 3500; // ms - faster auto-scroll
        const PAUSE_ON_HOVER = true;

        // Helper to scroll to specific card index with high-spec motion
        function scrollToCard(index, smooth = true) {
            if (window.scrollY > 100 || isUserScrolling) return;

            const card = allCards[index];
            if (!card) return;

            const containerWidth = container.clientWidth;
            const cardWidth = card.offsetWidth;
            const cardLeft = card.offsetLeft;

            const targetScroll = cardLeft - (containerWidth / 2) + (cardWidth / 2);

            if (!smooth) {
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = targetScroll;
            } else {
                container.style.scrollBehavior = 'smooth';
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        }

        // Set initial position
        requestAnimationFrame(() => {
            scrollToCard(currentIndex, false);
        });

        function nextSlide() {
            if (isPerformingAutoScroll || !isVisible || isUserScrolling || window.scrollY > 300) return;

            currentIndex++;

            if (currentIndex >= allCards.length) {
                currentIndex = startIndex;
                scrollToCard(currentIndex, false);
                return;
            }

            scrollToCard(currentIndex, true);

            // Add shake effect to new center card
            if (currentIndex >= 1 && currentIndex <= originalCards.length) {
                allCards.forEach(card => card.classList.remove('center-card'));
                const centerCard = allCards[currentIndex];
                if (centerCard) {
                    centerCard.classList.add('center-card');
                }
                lastCenterIndex = currentIndex;
            }

            if (currentIndex === jumpTriggerIndex) {
                isPerformingAutoScroll = true;

                setTimeout(() => {
                    currentIndex = startIndex;
                    scrollToCard(currentIndex, false);

                    setTimeout(() => {
                        isPerformingAutoScroll = false;
                    }, 50);
                }, 100);
            }
        }

        // Loop Control with high-spec timing
        function startLoop() {
            stopLoop();
            if (!isUserScrolling) {
                autoScrollInterval = setInterval(nextSlide, SLIDE_INTERVAL);
            }
        }

        function stopLoop() {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        }

        // Global Scroll Detection
        let scrollTimeoutGlobal;
        window.addEventListener('scroll', () => {
            isUserScrolling = true;
            stopLoop();

            clearTimeout(scrollTimeoutGlobal);
            scrollTimeoutGlobal = setTimeout(() => {
                isUserScrolling = false;
                if (isVisible) {
                    startLoop();
                }
            }, 100);
        }, { passive: true });

        // Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !isUserScrolling) {
                    startLoop();
                } else {
                    stopLoop();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(container);

        // Interaction Handlers with enhanced responsiveness
        container.addEventListener('mouseenter', () => {
            if (PAUSE_ON_HOVER) stopLoop();
        });
        container.addEventListener('touchstart', stopLoop, { passive: true });

        container.addEventListener('mouseleave', () => {
            if (isVisible && !isUserScrolling) startLoop();
        });
        container.addEventListener('touchend', () => {
            if (isVisible && !isUserScrolling) setTimeout(startLoop, 1500);
        });

        // Sync currentIndex on manual carousel scroll with enhanced detection
        let scrollTimeout;
        let lastCenterIndex = -1;
        
        function updateCenterCard() {
            const center = container.scrollLeft + (container.clientWidth / 2);
            let minDiff = Infinity;
            let closest = currentIndex;

            allCards.forEach((card, i) => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const diff = Math.abs(center - cardCenter);
                if (diff < minDiff) {
                    minDiff = diff;
                    closest = i;
                }
            });

            // Only trigger shake effect when entering new center card
            if (closest !== lastCenterIndex && !isPerformingAutoScroll) {
                // Remove center-card from all
                allCards.forEach(card => card.classList.remove('center-card'));
                
                // Add to new center card (not clones)
                if (closest >= 1 && closest <= originalCards.length) {
                    const realCard = allCards[closest];
                    if (realCard) {
                        realCard.classList.add('center-card');
                    }
                }
                lastCenterIndex = closest;
            }
            
            currentIndex = closest;

            if (currentIndex === jumpTriggerIndex) {
                currentIndex = startIndex;
                scrollToCard(currentIndex, false);
            }

            if (currentIndex === 0) {
                currentIndex = realLastIndex;
                scrollToCard(currentIndex, false);
            }
        }
        
        // Add scroll listener
        container.addEventListener('scroll', () => {
            if (isPerformingAutoScroll) return;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateCenterCard, 50);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
})();
