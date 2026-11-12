document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const urlOrderId = params.get('orderId');
  const urlTable = params.get('table');

  if (urlOrderId) {
    // Clear cart when arriving from a newly submitted order
    localStorage.removeItem('stitch_cart');
  }

  if (typeof window.updateGlobalCartCount === 'function') {
    window.updateGlobalCartCount();
  }

  let activeOrder = null;
  try {
    activeOrder = JSON.parse(localStorage.getItem('stitch_active_customer_order') || 'null');
  } catch (_) {}

  const orderId = urlOrderId || activeOrder?.id || null;
  const tableId = urlTable || activeOrder?.table || localStorage.getItem('stitch_current_table') || '12';

  const headingEl = document.getElementById('order-status-heading') || document.querySelector('h1');
  const subTextEl = document.getElementById('order-status-subtext') || headingEl?.parentElement?.querySelector('p');
  const heroImgEl = document.getElementById('order-hero-img');
  const returnBtn = document.getElementById('return-btn');
  const viewDetailsBtn = document.getElementById('view-details-btn');
  const progressBarFill = document.getElementById('order-progress-fill');
  const stepItems = document.querySelectorAll('#order-steps-container .step-item');

  // Set all 4 steps to uniform grey when there is no active order
  function setAllStepsInactive() {
    if (progressBarFill) {
      progressBarFill.style.width = '0%';
    }
    stepItems.forEach((item) => {
      const circle = item.querySelector('.step-circle');
      const label = item.querySelector('.step-label');
      if (circle) {
        circle.classList.remove('is-active', 'is-current');
        circle.classList.add('is-inactive');
      }
      if (label) {
        label.classList.remove('is-active');
        label.classList.add('is-inactive');
      }
    });
  }

  function updateOrderTrackingUI(order) {
    if (!order) {
      setAllStepsInactive();
      return;
    }

    activeOrder = order;
    try {
      localStorage.setItem('stitch_active_customer_order', JSON.stringify(order));
    } catch (_) {}

    // Update hero image if the order has a product image
    if (heroImgEl && Array.isArray(order.items) && order.items.length > 0) {
      const firstImg = order.items.find(i => i && i.img)?.img;
      if (firstImg) {
        heroImgEl.src = firstImg;
      }
    }

    const isDelivery = (order && order.orderType === 'delivery') ||
      String(order?.table || tableId || '').toLowerCase().includes('livraison') ||
      params.get('mode') === 'delivery' ||
      localStorage.getItem('stitch_order_mode') === 'delivery';

    const status = order.status || 'Received';

    if (headingEl) {
      if (isDelivery) {
        if (status === 'Received') headingEl.textContent = `Commande #${order.id} envoyée ! 🛵`;
        else if (status === 'Preparing') headingEl.textContent = `En préparation en cuisine 👨‍🍳`;
        else if (status === 'Ready') headingEl.textContent = `Livreur en route vers vous ! 🛵💨`;
        else if (status === 'Completed') headingEl.textContent = `Commande livrée ! Bon appétit ✨`;
      } else {
        if (status === 'Received') headingEl.textContent = `Commande #${order.id} envoyée !`;
        else if (status === 'Preparing') headingEl.textContent = `En préparation 👨‍🍳`;
        else if (status === 'Ready') headingEl.textContent = `En route vers votre table ! 🍽️`;
        else if (status === 'Completed') headingEl.textContent = `Bon appétit ! ✨`;
      }
    }

    if (subTextEl) {
      const addr = order.deliveryAddress || localStorage.getItem('stitch_delivery_address') || '';
      if (isDelivery) {
        if (status === 'Received') {
          subTextEl.textContent = `Livraison à Domicile • Reçue en caisse (${Number(order.total || 0).toFixed(2)} DH)`;
        } else if (status === 'Preparing') {
          subTextEl.textContent = `La cuisine prépare vos articles fraîchement pour la livraison`;
        } else if (status === 'Ready') {
          subTextEl.textContent = addr ? `Le livreur fait route vers ${addr}` : `Le livreur est en route avec votre commande !`;
        } else {
          subTextEl.textContent = `Commande #${order.id} livrée avec succès. Merci !`;
        }
      } else {
        if (status === 'Received') {
          subTextEl.textContent = `Table ${order.table || tableId} • Reçue en caisse & cuisine (${Number(order.total || 0).toFixed(2)} DH)`;
        } else if (status === 'Preparing') {
          subTextEl.textContent = `Table ${order.table || tableId} • La cuisine prépare votre commande #${order.id}`;
        } else if (status === 'Ready') {
          subTextEl.textContent = `Table ${order.table || tableId} • Le serveur apporte votre commande #${order.id} !`;
        } else {
          subTextEl.textContent = `Table ${order.table || tableId} • Commande #${order.id} servie à table. Merci !`;
        }
      }
    }

    // Adapt step 3 icon & labels for delivery
    if (isDelivery && stepItems.length >= 4) {
      const step3Icon = stepItems[2]?.querySelector('.step-circle .material-symbols-outlined');
      const step3Label = stepItems[2]?.querySelector('.step-label');
      const step4Label = stepItems[3]?.querySelector('.step-label');
      if (step3Icon) step3Icon.textContent = 'two_wheeler';
      if (step3Label) step3Label.textContent = 'En livraison';
      if (step4Label) step4Label.textContent = 'Livrée';
    }

    // Map status to step index (0 = Placed, 1 = Preparing, 2 = On Route, 3 = Served)
    const stepIndex =
      status === 'Received' ? 0 :
      status === 'Preparing' ? 1 :
      status === 'Ready' ? 2 : 3;

    // Track line spans from left 12.5% to right 12.5% (total max width = 75%)
    const trackWidths = ['0%', '25%', '50%', '75%'];
    if (progressBarFill) {
      progressBarFill.style.width = trackWidths[stepIndex] || '0%';
    }

    stepItems.forEach((item, idx) => {
      const circle = item.querySelector('.step-circle');
      const label = item.querySelector('.step-label');
      if (!circle || !label) return;

      if (idx <= stepIndex) {
        circle.classList.remove('is-inactive');
        circle.classList.add('is-active');
        if (idx === stepIndex) {
          circle.classList.add('is-current');
        } else {
          circle.classList.remove('is-current');
        }
        label.classList.remove('is-inactive');
        label.classList.add('is-active');
      } else {
        circle.classList.remove('is-active', 'is-current');
        circle.classList.add('is-inactive');
        label.classList.remove('is-active');
        label.classList.add('is-inactive');
      }
    });
  }

  async function pollOrderStatus() {
    if (!orderId) return;
    try {
      const res = await fetch(`${window.location.origin}/api/live-orders/${encodeURIComponent(orderId)}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success && json.data) {
          updateOrderTrackingUI(json.data);
        }
      }
    } catch (_) {}
  }

  // Initialize state
  if (activeOrder) {
    updateOrderTrackingUI(activeOrder);
  } else {
    setAllStepsInactive();
  }

  if (orderId) {
    pollOrderStatus();
    setInterval(pollOrderStatus, 2000);
  }

  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      window.location.href = (localStorage.getItem('stitch_order_mode') === 'delivery') ? '../swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery' : `../swiggy-style_elite_main_menu_390x2500/index.html?table=${encodeURIComponent(tableId)}`;
    });
  }

  // Modal logic for order details
  const modal = document.getElementById('order-details-modal');
  const closeModalBtn = document.getElementById('close-details-modal');
  const modalTitle = document.getElementById('modal-order-title');
  const modalMeta = document.getElementById('modal-order-meta');
  const modalItems = document.getElementById('modal-order-items');
  const modalTotal = document.getElementById('modal-order-total');

  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', () => {
      if (!activeOrder || !Array.isArray(activeOrder.items) || activeOrder.items.length === 0) {
        if (modal && modalItems) {
          modalTitle.textContent = 'Aucune commande active';
          modalMeta.textContent = `Table ${tableId}`;
          modalItems.innerHTML = `<p class="text-gray-500 dark:text-gray-400 py-3 text-center">Vous n'avez pas encore envoyé de commande.</p>`;
          modalTotal.textContent = '0.00 DH';
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
        return;
      }

      if (modal && modalItems) {
        const isDeliveryOrder = activeOrder.orderType === 'delivery' || String(activeOrder.table || '').toLowerCase().includes('livraison');
        modalTitle.textContent = `Commande #${activeOrder.id}`;
        modalMeta.textContent = isDeliveryOrder
          ? `Livraison à Domicile • Statut : ${activeOrder.status || 'Received'}`
          : `Table ${activeOrder.table || tableId} • Statut : ${activeOrder.status || 'Received'}`;

        let deliveryInfoHtml = '';
        if (isDeliveryOrder) {
          const addr = activeOrder.deliveryAddress || localStorage.getItem('stitch_delivery_address') || '';
          const phone = activeOrder.deliveryPhone || localStorage.getItem('stitch_delivery_phone') || '';
          const pay = activeOrder.paymentMethod === 'card' ? 'Carte Bancaire (TPE au livreur)' : 'Espèces (Cash à la livraison)';
          deliveryInfoHtml = `
            <div class="mb-3 p-3 rounded-xl bg-orange-50 dark:bg-white/5 border border-orange-200/60 dark:border-white/10 text-xs space-y-1">
              <div class="font-extrabold text-[#FF5200] flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">two_wheeler</span> Coordonnées de Livraison</div>
              ${addr ? `<div><span class="text-stone-400 font-bold">Adresse :</span> <span class="font-semibold">${addr}</span></div>` : ''}
              ${phone ? `<div><span class="text-stone-400 font-bold">Téléphone :</span> <span class="font-semibold">${phone}</span></div>` : ''}
              <div><span class="text-stone-400 font-bold">Paiement :</span> <span class="font-semibold">${pay}</span></div>
            </div>
          `;
        }

        modalItems.innerHTML = deliveryInfoHtml + activeOrder.items.map(item => {
          const qty = Number(item.qty || item.quantity || 1);
          const lineTotal = (Number(item.price || 0) * qty).toFixed(2);
          return `
            <div class="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-zinc-800/60 last:border-0">
              <div class="pr-2">
                <div class="font-semibold text-gray-800 dark:text-gray-100">${qty}x ${item.name}</div>
              </div>
              <div class="font-bold text-gray-900 dark:text-white whitespace-nowrap">${lineTotal} DH</div>
            </div>
          `;
        }).join('');
        modalTotal.textContent = `${Number(activeOrder.total || 0).toFixed(2)} DH`;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }
});
