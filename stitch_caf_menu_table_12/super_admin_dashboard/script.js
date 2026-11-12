// Demo Data
const DUMMY_MERCHANTS = [
    { id: 'm1', name: 'Elite Roastery', email: 'er-782@gmail.com', plan: 'Gold SaaS', status: 'Active', revenue: '12,450 DH', location: 'Casablanca' },
    { id: 'm2', name: 'Le Matin Bakery', email: 'contact@lematin.ma', plan: 'Starter', status: 'Active', revenue: '8,200 DH', location: 'Rabat' },
    { id: 'm3', name: 'Green Leaf Salad', email: 'hello@greenleaf.com', plan: 'Pro', status: 'Suspended', revenue: '0 DH', location: 'Marrakech' },
    { id: 'm4', name: 'Sushi Zen', email: 'manager@sushizen.ma', plan: 'Gold SaaS', status: 'Active', revenue: '45,100 DH', location: 'Tangier' },
    { id: 'm5', name: 'Burger King (Franchise)', email: 'bk-maroc@bk.com', plan: 'Enterprise', status: 'Active', revenue: '120,500 DH', location: 'Casablanca' }
];

// Navigation Logic
function switchTab(tabName) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(el => {
        el.style.display = 'none';
        el.classList.add('hidden');
        el.classList.remove('block');
    });

    // Show selected content
    const content = document.getElementById(`${tabName}-content`);
    if (content) {
        content.style.display = 'block';
        content.classList.remove('hidden');
        content.classList.add('block');
    }

    // Update active button state in sidebar
    document.querySelectorAll('#main-nav button[data-tab]').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.remove('text-gray-500', 'hover:text-primary', 'hover:bg-orange-50', 'dark:hover:bg-orange-950/10');
            btn.classList.add('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        } else {
            btn.classList.add('text-gray-500', 'hover:text-primary', 'hover:bg-orange-50', 'dark:hover:bg-orange-950/10');
            btn.classList.remove('bg-orange-50', 'dark:bg-orange-950/30', 'text-primary');
        }
    });

    // Update Header Title
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

// Rendering Logic
function createMerchantRow(m, isSimple) {
    if (isSimple) {
        return `
        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors">
            <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
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
                <button onclick="editMerchant('${m.name}')" class="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"><span class="material-symbols-outlined text-gray-400">edit</span></button>
            </td>
        </tr>`;
    } else {
        return `
        <tr class="hover:bg-gray-50/50 dark:hover:bg-black/5 transition-colors">
            <td class="px-8 py-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">
                        ${m.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <p class="font-bold">${m.name}</p>
                        <p class="text-xs text-gray-400 font-medium">${m.email}</p>
                    </div>
                </div>
            </td>
            <td class="px-8 py-5 text-sm font-bold text-gray-500">${m.location}</td>
            <td class="px-8 py-5"><span class="text-xs font-bold text-primary">${m.plan}</span></td>
            <td class="px-8 py-5 text-sm font-bold">${m.revenue}</td>
            <td class="px-8 py-5">
                <span class="px-3 py-1 ${m.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600'} text-[10px] font-bold rounded-full">${m.status}</span>
            </td>
            <td class="px-8 py-5 text-right">
                <div class="flex justify-end gap-2">
                    <button class="p-2 hover:bg-orange-50 dark:hover:bg-orange-950/10 rounded-lg transition-all text-orange-500"><span class="material-symbols-outlined">block</span></button>
                    <button class="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all text-red-500"><span class="material-symbols-outlined">delete</span></button>
                </div>
            </td>
        </tr>`;
    }
}

function renderMerchants(merchants = DUMMY_MERCHANTS) {
    // Render Recent (Overview)
    const recentBody = document.getElementById('recent-merchants-body');
    if (recentBody) {
        recentBody.innerHTML = merchants.slice(0, 3).map(m => createMerchantRow(m, true)).join('');
    }

    // Render All (Merchants Tab)
    const allBody = document.getElementById('all-merchants-body');
    if (allBody) {
        allBody.innerHTML = merchants.map(m => createMerchantRow(m, false)).join('');
    }
}

// UI Helpers
function applyTheme(name) {
    document.documentElement.classList.remove('theme-blue', 'theme-emerald');
    if (name === 'blue') document.documentElement.classList.add('theme-blue');
    if (name === 'emerald') document.documentElement.classList.add('theme-emerald');
    localStorage.setItem('stitch_theme', name);
}

function editMerchant(name) {
    const modal = document.getElementById('edit-modal');
    const input = document.getElementById('edit-merchant-name');
    if (modal && input) {
        input.value = name;
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Initial Load and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Tabs
    switchTab('overview');
    renderMerchants();

    // 2. Tab Navigation
    document.querySelectorAll('#main-nav button[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // 3. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = localStorage.getItem('stitch_theme') || 'elite';
            const next = current === 'elite' ? 'blue' : current === 'blue' ? 'emerald' : 'elite';
            applyTheme(next);
        });
    }

    // 4. Search Filter
    const searchInput = document.getElementById('merchant-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase();
            const filtered = DUMMY_MERCHANTS.filter(m => m.name.toLowerCase().includes(q));
            renderMerchants(filtered);
        });
    }

    // 5. Logout Handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Sign out?')) {
                localStorage.removeItem('stitch_token');
                localStorage.removeItem('stitch_role');
                localStorage.removeItem('stitch_user');
                window.location.href = '../auth_login_page/index.html';
            }
        });
    }

    // 6. Close Modal on Background Click
    window.onclick = function (event) {
        const modal = document.getElementById('edit-modal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // 7. Sidebar Toggle Logic
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

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            const isCollapsed = sidebar.classList.toggle('w-20');
            sidebar.classList.toggle('w-72');

            // Toggle main content margin
            if (isCollapsed) {
                mainContent.classList.remove('ml-72');
                mainContent.classList.add('ml-24'); // Slightly more than w-20 (5rem) to avoid overlap
            } else {
                mainContent.classList.add('ml-72');
                mainContent.classList.remove('ml-24');
            }

            // Toggle padding on header/footer
            sidebarHeader.classList.toggle('p-8');
            sidebarHeader.classList.toggle('p-4');
            sidebarFooter.classList.toggle('p-8');
            sidebarFooter.classList.toggle('p-4');

            // Toggle Text Visibility & Layout
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
