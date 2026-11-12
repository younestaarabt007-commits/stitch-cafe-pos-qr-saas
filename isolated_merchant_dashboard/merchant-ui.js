(() => {
  const tabs = new Set(['dashboard','pos','orders','delivery','kitchen','menu','qr','reservations','theme-manager','delivery-hub','tables']);
  const requestedTab = location.hash.slice(1);
  let expandedOrderWorkspace = false;
  function updateOrderWorkspace() {
    const active = document.getElementById('main-content')?.dataset.activeTab === 'pos';
    const expanded = expandedOrderWorkspace && active;
    document.body.classList.toggle('pos-workspace-expanded', expanded);
    const button = document.getElementById('pos-expand-btn');
    button?.setAttribute('aria-pressed', String(expanded));
    button?.setAttribute('aria-label', expanded ? 'Restore order workspace' : 'Expand order workspace');
    button?.setAttribute('title', expanded ? 'Restore workspace (Esc)' : 'Expand order workspace');
    const label = document.getElementById('pos-expand-label');
    if (label) label.textContent = expanded ? 'Restore' : 'Expand';
  }
  const originalSwitchTab = window.switchTab;
  window.switchTab = function(tabId) {
    if (!tabs.has(tabId)) return;
    originalSwitchTab(tabId);
    window.refreshMerchantNavigation?.();
    document.getElementById('main-content').dataset.activeTab = tabId;
    updateOrderWorkspace();
    document.querySelectorAll('[data-tab]').forEach(button => {
      if (button.dataset.tab === tabId) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    });
    if (location.hash !== `#${tabId}`) history.replaceState(null,'',`#${tabId}`);
  };
  document.addEventListener('DOMContentLoaded', () => {
    window.switchTab(tabs.has(requestedTab) ? requestedTab : 'dashboard');
    document.getElementById('pos-expand-btn')?.addEventListener('click', () => {
      expandedOrderWorkspace = !expandedOrderWorkspace;
      updateOrderWorkspace();
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !document.body.classList.contains('pos-workspace-expanded')) return;
      const openModal = [...document.querySelectorAll('[id$="modal"]')].some(modal => !modal.classList.contains('hidden') && modal.getClientRects().length);
      if (openModal) return;
      expandedOrderWorkspace = false;
      updateOrderWorkspace();
      document.getElementById('pos-expand-btn')?.focus();
    });
    const search = document.getElementById('pos-search');
    search?.setAttribute('aria-label','Search menu items');
    document.getElementById('discount-value')?.setAttribute('aria-label','Discount amount');
    document.getElementById('discount-type')?.setAttribute('aria-label','Discount type');
    const collapse = document.getElementById('sidebar-retract-trigger');
    collapse?.setAttribute('role','button'); collapse?.setAttribute('tabindex','0'); collapse?.setAttribute('aria-label','Collapse navigation');
    collapse?.addEventListener('keydown', event => { if(event.key==='Enter'||event.key===' ') { event.preventDefault(); collapse.click(); } });
    const modifierModal = document.getElementById('pos-modifier-modal');
    modifierModal?.setAttribute('role','dialog');
    modifierModal?.setAttribute('aria-modal','true');
    modifierModal?.setAttribute('aria-labelledby','mod-item-name');
    document.getElementById('mod-item-table')?.setAttribute('aria-label','Table number');
    document.getElementById('mod-item-notes')?.setAttribute('aria-label','Special instructions');
    let returnFocus = null;
    const focusableOptions = () => [...modifierModal.querySelectorAll('button,input,select,textarea,[tabindex="0"]')].filter(element => !element.disabled && element.getClientRects().length);
    if (modifierModal) {
      new MutationObserver(() => {
        if (!modifierModal.classList.contains('hidden')) {
          returnFocus = document.activeElement;
          focusableOptions()[0]?.focus();
        } else returnFocus?.focus?.();
      }).observe(modifierModal,{attributes:true,attributeFilter:['class']});
      modifierModal.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); window.closeModifierModal(); }
        if (event.key !== 'Tab') return;
        const elements = focusableOptions();
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault();last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault();first?.focus(); }
      });
    }
  });
  window.addEventListener('hashchange',()=>window.switchTab(tabs.has(location.hash.slice(1)) ? location.hash.slice(1) : 'dashboard'));
})();
