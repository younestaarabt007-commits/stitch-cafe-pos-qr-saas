function apiBase() {
    try {
        return localStorage.getItem('stitch_api_base') || (typeof window !== 'undefined' && window.STITCH_API_BASE) || 'http://localhost:3000';
    } catch {
        return 'http://localhost:3000';
    }
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.toLowerCase();
    const password = document.getElementById('password').value;

    // SIMULATED LOGIN LOGIC (Demo Mode)
    let role = '';
    let user = {};

    if (email === 'admin@stitch.cafe' && password === 'password123') {
        role = 'SUPER_ADMIN';
        user = { id: 1, name: 'Super Admin', email: email, role: role };
    } else if (email === 'merchant@cafe.com' && password === 'password123') {
        role = 'MANAGER';
        user = { id: 2, name: 'Merchant Owner', email: email, role: role };
    } else if (email === 'staff@cafe.com' && password === 'password123') {
        role = 'STAFF';
        user = { id: 3, name: 'Staff Member', email: email, role: role };
    } else {
        alert('Invalid credentials! \nTry: admin@stitch.cafe / password123');
        return;
    }

    // Save to localStorage
    localStorage.setItem('stitch_token', 'demo_token_12345');
    localStorage.setItem('stitch_role', role);
    localStorage.setItem('stitch_user', JSON.stringify(user));

    // Redirect based on role
    if (role === 'SUPER_ADMIN') {
        window.location.href = '../super_admin_dashboard/index.html';
    } else {
        window.location.href = '../dashbord insight page/index.html';
    }
});

function fillLogin(email) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = 'password123';
}
