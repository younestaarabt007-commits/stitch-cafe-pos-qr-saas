// =========================================================================
// STITCH CAFÉ — SUPER ADMIN FLEET & LICENSE MANAGEMENT ENGINE
// Manage SaaS clients, subscriptions, remote push updates and fleet health
// =========================================================================

const STORAGE_KEY_MERCHANTS = 'stitch_super_admin_merchants';
const CLOUD_SYNC_ENDPOINT = 'https://ntfy.sh/stitch_cafe_saas_sync_v1';

const DEFAULT_MERCHANTS = [
    { id: 'm1', name: 'Elite Roastery', email: 'er-782@gmail.com', plan: 'Gold SaaS', status: 'Active', revenue: '12,450 DH', location: 'Casablanca' },
    { id: 'm2', name: 'Le Matin Bakery', email: 'contact@lematin.ma', plan: 'Starter', status: 'Active', revenue: '8,200 DH', location: 'Rabat' },
    { id: 'm3', name: 'Green Leaf Salad', email: 'hello@greenleaf.com', plan: 'Pro', status: 'Suspended', revenue: '0 DH', location: 'Marrakech' },
    { id: 'm4', name: 'Sushi Zen', email: 'manager@sushizen.ma', plan: 'Gold SaaS', status: 'Active', revenue: '45,100 DH', location: 'Tangier' },
    { id: 'm5', name: 'Burger King (Franchise)', email: 'bk-maroc@bk.com', plan: 'Enterprise', status: 'Active', revenue: '120,500 DH', location: 'Casablanca' }
];

function getMerchants() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_MERCHANTS);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch (_) {}
    return DEFAULT_MERCHANTS;
}

function saveMerchants(merchants) {
    try {
        localStorage.setItem(STORAGE_KEY_MERCHANTS, JSON.stringify(merchants));
    } catch (_) {}
    renderMerchants();
    updateOverviewStats();
}

// Navigation Logic
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => {
        el.style.display = 'none';
        el.classList.add('hidden');
        el.classList.remove('block');
    });

    const content = document.getElementById(`${tabName}-content`);
    if (content) {
        content.style.display = 'block';
        content.classList.remove('hidden');
        content.classList.add('block');
    }

    document.querySelectorAll('#main-nav button[data-tab]').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.remove('text-gray-500', 'hover:text-primary', 'hover:bg-orange-50', 'dark:hover:bg-orange-950/10');
            btn.classList.add('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        } else {
            btn.classList.add('text-gray-500', 'hover:text-primary', 'hover:bg-orange-50', 'dark:hover:bg-orange-950/10');
            btn.classList.remove('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        }
    });

    const titles = {
        overview: 'Platform Overview',
        merchants: 'Merchant Management',
        payments: 'Financial Overview',
        accounts: 'Administrative Accounts'
    };
    const headerTitle = document.querySelector('header h2');
    if (headerTitle && titles[tabName]) {
        headerTitle.textContent = titles[tabName];
    }
}
window.switchTab = switchTab;

// Dynamic Stats calculation
function updateOverviewStats() {
    const list = getMerchants();
    const totalEl = document.querySelector('#overview-content .grid > div:nth-child(1) h3');
    if (totalEl) totalEl.textContent = list.length;

    let totalRev = 0;
    list.forEach(m => {
        const val = parseInt(String(m.revenue).replace(/[^0-9]/g, ''), 10) || 0;
        totalRev += val;
    });

    const revEl = document.querySelector('#overview-content .grid > div:nth-child(2) h3');
    if (revEl) {
        revEl.textContent = (totalRev > 1000 ? (totalRev / 1000).toFixed(1) + 'k' : totalRev) + 'DH';
    }
}

// Rendering Logic
function createMerchantRow(m, isSimple) {
    if (isSimple) {
        return `
        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors">
            <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-primary font-bold">
                        ${m.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-bold">${m.name}</p>
                        <p class="text-xs text-gray-400 font-medium">${m.email}</p>
                    </div>
                </div>
            </td>
            <td class="px-8 py-5"><span class="text-xs font-bold text-primary">${m.plan}</span></td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 ${m.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} text-[10px] font-bold rounded-full">${m.status}</span>
            </td>
            <td class="px-8 py-5 text-right">
                <button onclick="editMerchant('${m.id}')" title="Modifier" class="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"><span class="material-symbols-outlined text-gray-400">edit</span></button>
            </td>
        </tr>`;
    } else {
        const isAct = m.status === 'Active';
        return `
        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors">
            <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center text-primary font-bold">
                        ${m.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-bold">${m.name}</p>
                        <p class="text-xs text-gray-400 font-medium">${m.email}</p>
                    </div>
                </div>
            </td>
            <td class="px-8 py-5 text-sm font-bold text-gray-500">${m.location || 'Maroc'}</td>
            <td class="px-8 py-5"><span class="text-xs font-bold text-primary">${m.plan}</span></td>
            <td class="px-8 py-5 text-sm font-bold">${m.revenue || '0 DH'}</td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 ${isAct ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} text-[10px] font-bold rounded-full">${m.status}</span>
            </td>
            <td class="px-8 py-5 text-right">
                <div class="flex justify-end gap-2">
                    <button onclick="toggleMerchantStatus('${m.id}')" title="${isAct ? 'Suspendre la licence' : 'Réactiver la licence'}"
                        class="p-2 rounded-lg transition-all ${isAct ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20' : 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'}">
                        <span class="material-symbols-outlined text-[18px]">${isAct ? 'pause_circle' : 'play_circle'}</span>
                    </button>
                    <button onclick="editMerchant('${m.id}')" title="Modifier le restaurant" class="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all text-gray-400 hover:text-primary">
                        <span class="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button onclick="deleteMerchant('${m.id}')" title="Supprimer le restaurant" class="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all text-red-500">
                        <span class="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>`;
    }
}

function renderMerchants(merchants = null) {
    const list = merchants !== null ? merchants : getMerchants();

    const recentBody = document.getElementById('recent-merchants-body');
    if (recentBody) {
        recentBody.innerHTML = list.slice(0, 3).map(m => createMerchantRow(m, true)).join('');
    }

    const allBody = document.getElementById('all-merchants-body');
    if (allBody) {
        if (list.length === 0) {
            allBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-400 font-bold">Aucun établissement trouvé.</td></tr>';
        } else {
            allBody.innerHTML = list.map(m => createMerchantRow(m, false)).join('');
        }
    }
}

// Modal & CRUD Operations
window.openNewMerchantModal = function() {
    const modal = document.getElementById('edit-modal');
    const form = document.getElementById('merchant-form');
    if (form) form.reset();
    document.getElementById('edit-merchant-id').value = '';
    document.getElementById('modal-merchant-title').textContent = 'Nouveau Restaurant';
    if (modal) modal.classList.remove('hidden');
};

window.editMerchant = function(id) {
    const list = getMerchants();
    const m = list.find(x => x.id === id || x.name === id);
    if (!m) return;

    document.getElementById('edit-merchant-id').value = m.id;
    document.getElementById('edit-merchant-name').value = m.name;
    document.getElementById('edit-merchant-email').value = m.email;
    document.getElementById('edit-merchant-location').value = m.location || '';
    document.getElementById('edit-merchant-plan').value = m.plan;
    document.getElementById('edit-merchant-status').value = m.status;
    document.getElementById('edit-merchant-revenue').value = m.revenue || '0 DH';

    document.getElementById('modal-merchant-title').textContent = `Modifier ${m.name}`;

    const modal = document.getElementById('edit-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeModal = function() {
    const modal = document.getElementById('edit-modal');
    if (modal) modal.classList.add('hidden');
};

window.saveMerchantForm = function(event) {
    event.preventDefault();
    const id = document.getElementById('edit-merchant-id').value;
    const name = document.getElementById('edit-merchant-name').value.trim();
    const email = document.getElementById('edit-merchant-email').value.trim();
    const location = document.getElementById('edit-merchant-location').value.trim();
    const plan = document.getElementById('edit-merchant-plan').value;
    const status = document.getElementById('edit-merchant-status').value;
    const revenue = document.getElementById('edit-merchant-revenue').value.trim();

    let list = getMerchants();

    if (id) {
        // Edit existing
        const idx = list.findIndex(m => m.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], name, email, location, plan, status, revenue };
        }
    } else {
        // Create new
        const newId = 'm' + Date.now();
        list.unshift({ id: newId, name, email, location, plan, status, revenue });
    }

    saveMerchants(list);
    window.closeModal();
};

window.toggleMerchantStatus = function(id) {
    let list = getMerchants();
    const m = list.find(x => x.id === id);
    if (!m) return;

    const newStatus = m.status === 'Active' ? 'Suspended' : 'Active';
    m.status = newStatus;
    saveMerchants(list);

    // Optional: send remote push signal
    sendFleetSignal({
        type: 'MERCHANT_LICENSE_UPDATE',
        merchantId: m.id,
        status: newStatus
    });
};

window.deleteMerchant = function(id) {
    let list = getMerchants();
    const m = list.find(x => x.id === id);
    if (!m) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement le restaurant "${m.name}" ?`)) {
        list = list.filter(x => x.id !== id);
        saveMerchants(list);
    }
};

// --- FLEET BROADCAST REMOTE UPDATE ---
window.openBroadcastModal = function() {
    const modal = document.getElementById('broadcast-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeBroadcastModal = function() {
    const modal = document.getElementById('broadcast-modal');
    if (modal) modal.classList.add('hidden');
};

window.executeFleetBroadcast = function() {
    const actionType = document.getElementById('broadcast-action-type').value;
    const message = (document.getElementById('broadcast-message-text').value || '').trim();

    const payload = {
        type: 'SUPER_ADMIN_BROADCAST',
        action: actionType,
        message: message || 'Mise à jour globale du système Stitch SaaS.',
        timestamp: Date.now(),
        admin: 'admin@stitch.cafe'
    };

    sendFleetSignal(payload).then(() => {
        alert(`✓ Signal diffusé avec succès sur la flotte !\nAction: ${actionType}\nMessage: ${payload.message}`);
        window.closeBroadcastModal();
    }).catch(err => {
        alert('Erreur lors de la diffusion: ' + err.message);
    });
};

async function sendFleetSignal(data) {
    try {
        await fetch(CLOUD_SYNC_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return true;
    } catch (e) {
        console.warn('Fleet broadcast HTTP failed:', e);
        return false;
    }
}

// UI Helpers
function applyTheme(name) {
    document.documentElement.classList.remove('theme-blue', 'theme-emerald');
    if (name === 'blue') document.documentElement.classList.add('theme-blue');
    if (name === 'emerald') document.documentElement.classList.add('theme-emerald');
    localStorage.setItem('stitch_theme', name);
}

// Initial Load and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    switchTab('overview');
    renderMerchants();
    updateOverviewStats();

    // Tab Navigation
    document.querySelectorAll('#main-nav button[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = localStorage.getItem('stitch_theme') || 'elite';
            const next = current === 'elite' ? 'blue' : current === 'blue' ? 'emerald' : 'elite';
            applyTheme(next);
        });
    }

    // Search Filter
    const searchInput = document.getElementById('merchant-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            const list = getMerchants();
            const filtered = list.filter(m =>
                m.name.toLowerCase().includes(q) ||
                m.email.toLowerCase().includes(q) ||
                (m.location && m.location.toLowerCase().includes(q))
            );
            renderMerchants(filtered);
        });
    }

    // Plan Filter
    const planSelect = document.querySelector('#merchants-content select');
    if (planSelect) {
        planSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            const list = getMerchants();
            if (selected === 'All Plans') {
                renderMerchants(list);
            } else {
                renderMerchants(list.filter(m => m.plan.toLowerCase().includes(selected.toLowerCase())));
            }
        });
    }

    // Sidebar Toggle Logic
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('aside');
    const mainContent = document.getElementById('main-content');
    const sidebarHeader = document.getElementById('sidebar-header');
    const sidebarFooter = document.getElementById('sidebar-footer');
    const sidebarTexts = document.querySelectorAll('.sidebar-text');
    const sidebarTitle = document.getElementById('sidebar-title');
    const navButtons = document.querySelectorAll('#main-nav button');
    const userInfoCard = document.getElementById('user-info-card');
    const userInfoHeader = document.getElementById('user-info-header');

    if (sidebarToggle && sidebar && mainContent) {
        sidebarToggle.addEventListener('click', () => {
            const isCollapsed = sidebar.classList.toggle('w-20');
            sidebar.classList.toggle('w-72');

            if (isCollapsed) {
                mainContent.classList.remove('ml-72');
                mainContent.classList.add('ml-24');
            } else {
                mainContent.classList.add('ml-72');
                mainContent.classList.remove('ml-24');
            }

            if (sidebarHeader) {
                sidebarHeader.classList.toggle('p-8');
                sidebarHeader.classList.toggle('p-4');
            }
            if (sidebarFooter) {
                sidebarFooter.classList.toggle('p-8');
                sidebarFooter.classList.toggle('p-4');
            }

            if (isCollapsed) {
                if (sidebarTitle) sidebarTitle.classList.add('hidden');
                sidebarTexts.forEach(el => el.classList.add('hidden'));
                navButtons.forEach(btn => {
                    btn.classList.remove('gap-3');
                    btn.classList.add('justify-center');
                    btn.classList.remove('px-4');
                });
                if (userInfoCard) {
                    userInfoCard.classList.replace('p-4', 'p-2');
                    userInfoCard.classList.add('flex', 'justify-center');
                }
                if (userInfoHeader) {
                    userInfoHeader.classList.remove('mb-2');
                    userInfoHeader.classList.remove('gap-3');
                }
            } else {
                if (sidebarTitle) sidebarTitle.classList.remove('hidden');
                sidebarTexts.forEach(el => el.classList.remove('hidden'));
                navButtons.forEach(btn => {
                    btn.classList.add('gap-3');
                    btn.classList.remove('justify-center');
                    btn.classList.add('px-4');
                });
                if (userInfoCard) {
                    userInfoCard.classList.replace('p-2', 'p-4');
                    userInfoCard.classList.remove('flex', 'justify-center');
                }
                if (userInfoHeader) {
                    userInfoHeader.classList.add('mb-2');
                    userInfoHeader.classList.add('gap-3');
                }
            }
        });
    }
});
