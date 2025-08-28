document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('loginModal');
    const mainHeader = document.getElementById('mainHeader');
    const mainContent = document.getElementById('mainContent');
    const adminTeacherDashboard = document.getElementById('adminTeacherDashboard');
    const parentDashboard = document.getElementById('parentDashboard');
    const currentUserName = document.getElementById('currentUserName');

    const users = {
        'admin_tahfidz': { password: 'admin123', role: 'admin' },
        'ustadz_tahfidz': { password: 'ustadz_123', role: 'guru' },
        '2024001': { password: 'wali123', role: 'wali', name: 'Ahmad Fauzi' },
        '2024002': { password: 'wali123', role: 'wali', name: 'Siti Aisyah' },
        '2024003': { password: 'wali123', role: 'wali', name: 'Muhammad Rizki' },
        '2024004': { password: 'wali123', role: 'wali', name: 'Fatimah Zahra' }
    };

    window.handleLogin = function(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('loginUsername').value;
        const passwordInput = document.getElementById('loginPassword').value;
        const user = users[usernameInput];

        if (user && user.password === passwordInput) {
            loginModal.classList.add('hidden');
            mainHeader.classList.remove('hidden');
            mainContent.classList.remove('hidden');

            if (user.role === 'admin' || user.role === 'guru') {
                adminTeacherDashboard.classList.remove('hidden');
                parentDashboard.classList.add('hidden');
                currentUserName.textContent = (user.role === 'admin') ? 'Admin' : 'Guru';
            } else if (user.role === 'wali') {
                parentDashboard.classList.remove('hidden');
                adminTeacherDashboard.classList.add('hidden');
                currentUserName.textContent = user.name;
            }

            // Panggil fungsi-fungsi untuk menampilkan data
            renderStudentsTable();
            renderJournalEntries();
            renderExamSchedule();
            renderExamResults();
            renderAlQuranAchievements();
            renderKibarAchievements();
            updateStudentDropdown();
            updateAchievementCounts();
            renderRecentActivities();

        } else {
            alert('Username atau password salah. Silakan coba lagi.');
        }
    };

    window.logout = function() {
        loginModal.classList.remove('hidden');
        mainHeader.classList.add('hidden');
        mainContent.classList.add('hidden');
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('tab-dashboard').click(); // Kembali ke tab dashboard
    };

    window.showTab = function(tabName) {
        const tabs = ['dashboard', 'students', 'journal', 'exams'];
        tabs.forEach(tab => {
            const content = document.getElementById(`content-${tab}`);
            const tabButton = document.getElementById(`tab-${tab}`);
            if (tab === tabName) {
                content.classList.remove('hidden');
                tabButton.classList.add('border-emerald-500', 'text-emerald-600');
                tabButton.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700');
            } else {
                content.classList.add('hidden');
                tabButton.classList.remove('border-emerald-500', 'text-emerald-600');
                tabButton.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700');
            }
        });
    };

    // Data-data statis untuk contoh
    const students = [
        { nis: '2024001', name: 'Ahmad Fauzi', class: 'A', tahsin: 90, tahfidz: 85, kibar: 'Kibar C', juz: 5, status: 'Aktif' },
        { nis: '2024002', name: 'Siti Aisyah', class: 'B', tahsin: 95, tahfidz: 90, kibar: 'Kibar B', juz: 8, status: 'Aktif' },
        { nis: '2024003', name: 'Muhammad Rizki', class: 'A', tahsin: 88, tahfidz: 80, kibar: 'Al Quran', juz: 2, status: 'Aktif' },
        { nis: '2024004', name: 'Fatimah Zahra', class: 'C', tahsin: 92, tahfidz: 95, kibar: 'Kibar A', juz: 10, status: 'Aktif' },
    ];

    const journals = [
        { nis: '2024001', type: 'Tahfidz', material: 'Al-Baqarah 1-10', notes: 'Murojaah', score: 90, date: '2024-08-27' },
        { nis: '2024002', type: 'Tahsin', material: 'Makharijul Huruf', notes: 'Telah hafal', score: 95, date: '2024-08-26' },
        { nis: '2024004', type: 'Tahfidz', material: 'An-Naba 1-40', notes: 'Lancar', score: 98, date: '2024-08-26' },
    ];

    const exams = [
        { nis: '2024001', type: 'Tahfidz', material: 'Al-Baqarah 1-30', date: '2024-09-05', status: 'Terjadwal', score: null },
    ];

    const alQuranAchievements = [
        { studentName: 'Muhammad Rizki', juz: 2, date: '2024-07-20', notes: 'Sangat baik' },
    ];

    const kibarAchievements = [
        { studentName: 'Fatimah Zahra', kibar: 'Kibar A', date: '2024-06-15', notes: 'Mampu membaca dengan lancar' },
        { studentName: 'Siti Aisyah', kibar: 'Kibar B', date: '2024-05-10', notes: 'Sudah mulai lancar' },
    ];

    const recentActivities = [
        { studentName: 'Ahmad Fauzi', action: 'menambahkan jurnal', type: 'Tahfidz', date: '2024-08-27' },
        { studentName: 'Siti Aisyah', action: 'menambahkan jurnal', type: 'Tahsin', date: '2024-08-26' },
        { studentName: 'Fatimah Zahra', action: 'menambahkan jurnal', type: 'Tahfidz', date: '2024-08-26' },
    ];

    // Functions to render the dashboard
    function updateAchievementCounts() {
        document.getElementById('kibarACount').textContent = students.filter(s => s.kibar === 'Kibar A').length;
        document.getElementById('kibarBCount').textContent = students.filter(s => s.kibar === 'Kibar B').length;
        document.getElementById('kibarCCount').textContent = students.filter(s => s.kibar === 'Kibar C').length;
        document.getElementById('alQuranCount').textContent = students.filter(s => s.kibar === 'Al Quran').length;
    }

    function renderStudentsTable() {
        const tableBody = document.getElementById('studentsTable');
        tableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.nis}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.class}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.tahsin}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.tahfidz}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.kibar}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Juz ${student.juz}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">${student.status}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    <a href="#" class="text-emerald-600 hover:text-emerald-900">Lihat</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderJournalEntries() {
        const journalContainer = document.getElementById('journalEntries');
        journalContainer.innerHTML = '';
        journals.forEach(entry => {
            const student = students.find(s => s.nis === entry.nis);
            const entryDiv = document.createElement('div');
            entryDiv.className = 'bg-gray-50 p-4 rounded-lg';
            entryDiv.innerHTML = `
                <p class="text-sm font-semibold text-gray-800">${student ? student.name : 'Siswa tidak ditemukan'}</p>
                <p class="text-xs text-gray-600 mt-1">
                    <span class="font-medium">${entry.type}</span>: ${entry.material} | Nilai: <span class="font-bold text-emerald-600">${entry.score}</span>
                </p>
                <p class="text-xs text-gray-500 mt-1">Catatan: ${entry.notes}</p>
            `;
            journalContainer.appendChild(entryDiv);
        });
    }

    function renderExamSchedule() {
        const examContainer = document.getElementById('examSchedule');
        examContainer.innerHTML = '';
        exams.forEach(exam => {
            const student = students.find(s => s.nis === exam.nis);
            const examDiv = document.createElement('div');
            examDiv.className = 'bg-blue-50 p-4 rounded-lg';
            examDiv.innerHTML = `
                <p class="text-sm font-semibold text-gray-800">${student ? student.name : 'Siswa tidak ditemukan'}</p>
                <p class="text-xs text-gray-600 mt-1">
                    Ujian <span class="font-medium">${exam.type}</span>: ${exam.material} pada ${exam.date}
                </p>
                <p class="text-xs text-blue-600 font-medium mt-1">Status: ${exam.status}</p>
            `;
            examContainer.appendChild(examDiv);
        });
    }

    function renderExamResults() {
        const resultsContainer = document.getElementById('examResults');
        resultsContainer.innerHTML = '<p class="text-gray-500">Belum ada hasil ujian terbaru.</p>';
    }

    function renderAlQuranAchievements() {
        const achievementsContainer = document.getElementById('alQuranAchievements');
        achievementsContainer.innerHTML = '';
        alQuranAchievements.forEach(ach => {
            const achDiv = document.createElement('div');
            achDiv.className = 'bg-gray-50 p-4 rounded-lg';
            achDiv.innerHTML = `
                <p class="text-sm font-semibold text-gray-800">${ach.studentName}</p>
                <p class="text-xs text-gray-600 mt-1">
                    Telah menyelesaikan Tahfidz Juz ${ach.juz}
                </p>
                <p class="text-xs text-gray-500 mt-1">Catatan: ${ach.notes}</p>
            `;
            achievementsContainer.appendChild(achDiv);
        });
    }

    function renderKibarAchievements() {
        const achievementsContainer = document.getElementById('kibarAchievements');
        achievementsContainer.innerHTML = '';
        kibarAchievements.forEach(ach => {
            const achDiv = document.createElement('div');
            achDiv.className = 'bg-gray-50 p-4 rounded-lg';
            achDiv.innerHTML = `
                <p class="text-sm font-semibold text-gray-800">${ach.studentName}</p>
                <p class="text-xs text-gray-600 mt-1">
                    Telah mencapai level <span class="font-medium">${ach.kibar}</span>
                </p>
                <p class="text-xs text-gray-500 mt-1">Catatan: ${ach.notes}</p>
            `;
            achievementsContainer.appendChild(achDiv);
        });
    }

    function updateStudentDropdown() {
        const dropdowns = [
            document.getElementById('journalStudent'),
            document.getElementById('examStudent')
        ];
        dropdowns.forEach(dropdown => {
            if (!dropdown) return;
            dropdown.innerHTML = '<option value="">Pilih Siswa</option>';
            students.forEach(student => {
                const option = document.createElement('option');
                option.value = student.nis;
                option.textContent = `${student.name} (${student.nis})`;
                dropdown.appendChild(option);
            });
        });
    }

    function renderRecentActivities() {
        const activitiesContainer = document.getElementById('recentActivities');
        activitiesContainer.innerHTML = '';
        recentActivities.forEach(activity => {
            const activityDiv = document.createElement('div');
            activityDiv.className = 'bg-gray-50 p-4 rounded-lg';
            activityDiv.innerHTML = `
                <p class="text-xs text-gray-600">
                    <span class="font-semibold">${activity.studentName}</span> ${activity.action}
                    <span class="text-gray-400">(${activity.date})</span>
                </p>
                <p class="text-sm font-medium text-gray-800 mt-1">${activity.type}</p>
            `;
            activitiesContainer.appendChild(activityDiv);
        });
    }

    // Modal functions
    window.showAddStudentModal = function() {
        document.getElementById('addStudentModal').classList.remove('hidden');
    };
    window.hideAddStudentModal = function() {
        document.getElementById('addStudentModal').classList.add('hidden');
    };
    window.showAddJournalModal = function() {
        document.getElementById('addJournalModal').classList.remove('hidden');
    };
    window.hideAddJournalModal = function() {
        document.getElementById('addJournalModal').classList.add('hidden');
    };
    window.showAddExamModal = function() {
        document.getElementById('addExamModal').classList.remove('hidden');
    };
    window.hideAddExamModal = function() {
        document.getElementById('addExamModal').classList.add('hidden');
    };

    // Initialize
    updateStudentDropdown();
    updateAchievementCounts();
    renderRecentActivities();

    document.getElementById('tab-dashboard').click(); // Show dashboard by default
});
