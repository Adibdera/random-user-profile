document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://randomuser.me/api/';
    const container = document.querySelector('.profile-container');

    async function fetchUserProfile() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const user = data.results[0];
            
            // Panggil fungsi untuk merender data
            renderProfile(user);
        } catch (error) {
            container.innerHTML = `<p class="error-text">Gagal memuat data: ${error.message}.</p>`;
            console.error('Error fetching user data:', error);
        }
    }

    function renderProfile(user) {
        // Hapus teks loading
        container.innerHTML = ''; 

        // Ekstraksi data
        const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        const email = user.email;
        const phone = user.phone;
        const location = `${user.location.city}, ${user.location.country}`;
        const dob = new Date(user.dob.date).toLocaleDateString('id-ID');
        const age = user.dob.age;
        const largePicture = user.picture.large;
        const username = user.login.username;

        // Struktur HTML Profil (desain kreatif di sini)
        const profileHTML = `
            <div class="profile-card">
                <div class="profile-header">
                    <img src="${largePicture}" alt="${fullName}" class="profile-picture">
                    <h1>${fullName}</h1>
                    <p class="username">@${username}</p>
                </div>
                <div class="profile-body">
                    <h2>Tentang Saya</h2>
                    <div class="info-group">
                        <i class="fas fa-envelope icon"></i>
                        <span class="info-label">Email:</span>
                        <span class="info-value">${email}</span>
                    </div>
                    <div class="info-group">
                        <i class="fas fa-phone icon"></i>
                        <span class="info-label">Telepon:</span>
                        <span class="info-value">${phone}</span>
                    </div>
                    <div class="info-group">
                        <i class="fas fa-map-marker-alt icon"></i>
                        <span class="info-label">Lokasi:</span>
                        <span class="info-value">${location}</span>
                    </div>
                    <div class="info-group">
                        <i class="fas fa-birthday-cake icon"></i>
                        <span class="info-label">Tanggal Lahir:</span>
                        <span class="info-value">${dob} (${age} tahun)</span>
                    </div>
                </div>
                <div class="profile-footer">
                    <button onclick="window.location.reload()">Muat Profil Baru</button>
                </div>
            </div>
        `;

        container.innerHTML = profileHTML;
    }

    // Panggil fungsi saat halaman dimuat
    fetchUserProfile();
});