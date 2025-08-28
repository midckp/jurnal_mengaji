document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Mencegah form untuk melakukan submit default (reload halaman)
    event.preventDefault();

    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // A simple, hardcoded list of demo user credentials
    const credentials = {
        "admin_tahfidz": { password: "admin123", role: "Admin", page: "dashboard_admin.html" },
        "guru_tahfidz": { password: "guru123", role: "Guru", page: "dashboard_guru.html" },
        "wali_tahfidz": { password: "wali123", role: "Wali", page: "dashboard_wali.html" }
    };

    // Cek apakah username ada di objek kredensial kita
    if (credentials.hasOwnProperty(usernameInput)) {
        const user = credentials[usernameInput];
        // Cek apakah password cocok
        if (user.password === passwordInput) {
            alert(`Login Berhasil sebagai ${user.role}!`);
            window.location.href = user.page;
        } else {
            alert("Password yang Anda masukkan salah.");
        }
    } else {
        alert("Username tidak ditemukan. Silakan periksa kembali.");
    }
});
