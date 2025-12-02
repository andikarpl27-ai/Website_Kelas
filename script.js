/* =========================================
   SCRIPT.JS - FINAL UNIVERSAL (ALL IN ONE)
   Aman untuk: Index (Slider), Jurusan (Modal), & Galeri
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. LOGIKA SLIDER (Hanya jalan di Index)
       ========================================= */
    const slides = document.getElementsByClassName("slide");
    
    if (slides.length > 0) {
        let slideIndex = 0;
        let autoSlideTimer;

        // Fungsi Helper
        window.plusSlides = function(n) {
            clearTimeout(autoSlideTimer);
            showSlides(slideIndex += n);
            autoSlideTimer = setTimeout(autoShowSlides, 6000);
        };

        function showSlides(n) {
            if (n >= slides.length) slideIndex = 0;
            if (n < 0) slideIndex = slides.length - 1;

            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex].style.display = "block";
        }

        function autoShowSlides() {
            slideIndex++;
            showSlides(slideIndex);
            autoSlideTimer = setTimeout(autoShowSlides, 6000);
        }

        // Jalankan Slider
        showSlides(slideIndex);
        autoSlideTimer = setTimeout(autoShowSlides, 6000);
    }


    /* =========================================
       2. LOGIKA MODAL SISWA (Hanya jalan di Jurusan)
       ========================================= */
    const modalBackdrop = document.getElementById("siswaModalBackdrop");
    const closeModalBtn = document.getElementById("modalCloseBtn");
    const detailButtons = document.querySelectorAll(".btn-detail");

    // Hanya jalankan jika elemen modal ada
    if (modalBackdrop && closeModalBtn) {
        
        const modalFoto = document.getElementById("modalFoto");
        const modalNama = document.getElementById("modalNama");
        const modalAbsen = document.getElementById("modalAbsen");
        const modalNamaLengkap = document.getElementById("modalNamaLengkap");
        const modalNisn = document.getElementById("modalNisn");
        const modalAlamat = document.getElementById("modalAlamat");

        function showModal(data) {
            if(modalFoto) {
                modalFoto.src = data.foto;
                modalFoto.alt = data.nama;
            }
            if(modalNama) modalNama.textContent = data.nama;
            if(modalAbsen) modalAbsen.textContent = data.absen;
            if(modalNamaLengkap) modalNamaLengkap.textContent = data.nama;
            if(modalNisn) modalNisn.textContent = data.nisn;
            if(modalAlamat) modalAlamat.textContent = data.alamat;

            modalBackdrop.classList.add("show");
        }

        function hideModal() {
            modalBackdrop.classList.remove("show");
        }

        // Event Listeners
        detailButtons.forEach(button => {
            button.addEventListener("click", function() {
                const data = {
                    nama: this.dataset.nama || '-',
                    nisn: this.dataset.nisn || '-',
                    absen: this.dataset.absen || '-',
                    alamat: this.dataset.alamat || '-',
                    foto: this.dataset.foto || ''
                };
                showModal(data);
            });
        });

        closeModalBtn.addEventListener("click", hideModal);
        modalBackdrop.addEventListener("click", function(event) {
            if (event.target === modalBackdrop) hideModal();
        });
    }


    /* =========================================
       3. LOGIKA GALERI (Hanya jalan di Galeri)
       ========================================= */
    
    // Database Foto Galeri
    const galleries = {
        'rpl': [
            { src: 'All Images/img-rpl/baju praktek.jpeg', desc: 'Foto Baju Praktik' },
            { src: 'All Images/img-rpl/drama rorojonggrang.jpeg', desc: 'Drama Roro Jonggrang' }
        ],
        'dpb': [],
        'titl': [],
        'tpm1': [], 'tpm2': [],
        'tkj1': [], 'tkj2': [],
        'tkr1': [], 'tkr2': [], 'tkr3': [],
        'tpk1': [], 'tpk2': []
    };

    const menuView = document.getElementById('menu-view');
    const galleryView = document.getElementById('gallery-view');
    const photoContainer = document.getElementById('photo-container');
    const classTitle = document.getElementById('class-title');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');

    // Definisikan fungsi GLOBAL window.openGallery agar bisa dipanggil HTML onclick
    window.openGallery = function(classId) {
        // Cek apakah kita di halaman galeri
        if (!menuView || !galleryView) return;

        menuView.style.display = 'none';
        galleryView.style.display = 'block';
        window.scrollTo(0, 0);

        if (classTitle) {
            const formattedClass = classId.toUpperCase().replace(/(\d)/, ' $1');
            classTitle.innerText = `Galeri Kelas XI ${formattedClass}`;
        }

        if (photoContainer) {
            photoContainer.innerHTML = '';
            const photos = galleries[classId] || [];

            if (photos.length > 0) {
                photos.forEach(photo => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `
                        <img src="${photo.src}" alt="${photo.desc}" loading="lazy" 
                             onerror="this.src='https://via.placeholder.com/400?text=Foto+Tidak+Ditemukan'">
                        <div class="overlay">${photo.desc}</div>
                    `;
                    item.onclick = () => window.openLightbox(photo.src, photo.desc);
                    photoContainer.appendChild(item);
                });
            } else {
                photoContainer.innerHTML = '<div class="empty-msg">Belum ada foto.</div>';
            }
        }
    };

    window.closeGallery = function() {
        if (galleryView && menuView) {
            galleryView.style.display = 'none';
            menuView.style.display = 'block';
        }
    };

    window.openLightbox = function(src, caption) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            if (lightboxCap) lightboxCap.innerText = caption;
            lightbox.style.display = 'flex';
        }
    };

    window.closeLightbox = function() {
        if (lightbox) {
            lightbox.style.display = 'none';
        }
    };

});
