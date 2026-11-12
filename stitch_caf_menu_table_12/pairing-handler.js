// Universal Perfect Pairing Handler
// Enables click-to-customize for pairings and special handling for Water
(function () {
    // 1. Logic to build customization URLs (Mirrored from main menu script)
    function buildCustomizationUrl(item) {
        if (!item) return '../pure_noir_espresso_customization_view_1/index.html';
        const category = (item.category || '').toLowerCase();
        const name = (item.name || '').toLowerCase();
        
        let customizationPage = '../brunch_customization_view/index.html';
        
        if (category.includes('brunch') || category.includes('toast') || name.includes('toast')) {
            customizationPage = '../toast_brunch_customization_view/index.html';
        } else if (category.includes('tea') || category.includes('infusion')) {
            customizationPage = '../tea_customization_view/index.html';
        } else if (category.includes('coffee') || category.includes('brew')) {
            customizationPage = '../pure_noir_espresso_customization_view_1/index.html';
        } else if (category.includes('pastry') || category.includes('bakery')) {
            customizationPage = '../sweet_pastries_customization_view/index.html';
        } else if (category.includes('fast food')) {
            customizationPage = '../fast_food_customization_view/index.html';
        } else if (category.includes('bread')) {
            customizationPage = '../petit pain bakery_customization_view/index.html';
        } else if (category.includes('juice') || category.includes('drink')) {
            customizationPage = '../orange juce_customization_view_1/index.html';
        } else if (category.includes('smoothie')) {
            customizationPage = '../smothie customisation review/index.html';
        } else if (category.includes('milkshake') || category.includes('shake')) {
            customizationPage = '../milkshake_customization_view/index.html';
        }

        const params = new URLSearchParams({
            id: item.id || '',
            name: item.name || '',
            price: item.price ?? '',
            image: item.image || item.image_url || '',
            category: item.category || ''
        });

        return `${customizationPage}?${params.toString()}`;
    }

    // 2. Initialize Pairing Cards
    function initPairings() {
        console.log("Pairing Handler: Initializing...");
        const cards = document.querySelectorAll('.pairing-card');
        console.log("Pairing Handler: Found " + cards.length + " cards");

        cards.forEach(function (card) {
            // Remove previous listeners if any (to avoid duplicates)
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            newCard.addEventListener('click', function (e) {
                console.log("Pairing Handler: Card clicked");
                
                // Get Name - more robust selection
                let nameEl = newCard.querySelector('p.font-bold') || 
                             newCard.querySelector('p.text-\\[14px\\]') ||
                             newCard.querySelector('p.truncate') ||
                             newCard.querySelector('p');
                
                if (!nameEl) {
                    console.error("Pairing Handler: Could not find name element");
                    return;
                }

                const name = nameEl.textContent.trim();
                console.log("Pairing Handler: Item Name -> " + name);

                const priceStr = newCard.querySelector('p.text-primary').textContent;
                const price = parseFloat(priceStr.replace('DH', '').replace(',', '.'));
                
                // Special Case: Water
                if (name.toLowerCase().includes('water')) {
                    console.log("Pairing Handler: Handling as Water (Direct Add)");
                    addPairingToCart(name, price, newCard.querySelector('.pairing-add-btn'));
                    return;
                }

                // Regular Case: Navigate to Customization
                if (typeof allMenuItems !== 'undefined') {
                    console.log("Pairing Handler: searching for " + name + " in allMenuItems (" + allMenuItems.length + " items)");
                    
                    // Try exact match first
                    let item = allMenuItems.find(i => i.name.toLowerCase() === name.toLowerCase());
                    
                    // Try partial match if no exact match
                    if (!item) {
                        item = allMenuItems.find(i => i.name.toLowerCase().includes(name.toLowerCase())) ||
                               allMenuItems.find(i => name.toLowerCase().includes(i.name.toLowerCase()));
                    }
                    
                    if (item) {
                        const targetUrl = buildCustomizationUrl(item);
                        console.log("Pairing Handler: Found item! Navigating to: " + targetUrl);
                        window.location.href = targetUrl;
                        return;
                    } else {
                        console.warn("Pairing Handler: Item not found in allMenuItems");
                    }
                } else {
                    console.error("Pairing Handler: allMenuItems is UNDEFINED");
                }
                
                // Fallback: If not found in allMenuItems, just add it directly (simple mode)
                console.log("Pairing Handler: Falling back to direct add");
                addPairingToCart(name, price, newCard.querySelector('.pairing-add-btn'));
            });

            // Prevent Add button from triggering card click twice 
            const addBtn = newCard.querySelector('.pairing-add-btn');
            if (addBtn) {
                addBtn.addEventListener('click', function (e) {
                    e.stopPropagation();
                    console.log("Pairing Handler: Add button clicked");
                    newCard.click();
                });
            }
        });
    }

    function addPairingToCart(name, price, btn) {
        const item = {
            id: 'pairing-' + Date.now(),
            name: name,
            price: isNaN(price) ? 0 : price,
            quantity: 1,
            qty: 1,
            category: 'Pairing',
            image_url: ''
        };

        const cart = JSON.parse(localStorage.getItem('stitch_cart') || '[]');
        cart.push(item);
        localStorage.setItem('stitch_cart', JSON.stringify(cart));
        if (window.updateGlobalCartCount) window.updateGlobalCartCount();

        // Visual feedback
        if (btn) {
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">check</span>';
            btn.classList.add('bg-green-100', 'text-green-600');
            btn.classList.remove('bg-primary/10', 'text-primary');
            setTimeout(function () {
                btn.innerHTML = originalHtml;
                btn.classList.remove('bg-green-100', 'text-green-600');
                btn.classList.add('bg-primary/10', 'text-primary');
            }, 1500);
        }
    }

    // Run on load and also watch for dynamic changes
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPairings);
    } else {
        initPairings();
    }
    
    // Fallback: Try again after a short delay to ensure allMenuItems is loaded
    setTimeout(initPairings, 500);
})();
