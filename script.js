// ==============================
// SCRIPT SLIDER OTOMATIS + MANUAL
// Website Angkatan XI 24/25
// SMKN Tambakboyo
// ==============================

let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let autoSlideTimer;

// Fungsi menampilkan slide sesuai indeks
function showSlides(n) {
  if (n > slides.length - 1) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";
}

// Pindah ke slide berikut / sebelumnya
function plusSlides(n) {
  clearTimeout(autoSlideTimer);
  slideIndex += n;
  showSlides(slideIndex);
  autoSlideTimer = setTimeout(autoShowSlides, 6000);
}

// Tampilkan slide otomatis setiap 6 detik
function autoShowSlides() {
  slideIndex++;
  showSlides(slideIndex);
  autoSlideTimer = setTimeout(autoShowSlides, 6000);
}

// Inisialisasi saat halaman dimuat
window.onload = function() {
  showSlides(slideIndex);
  autoSlideTimer = setTimeout(autoShowSlides, 6000);
};

// ==================== Kelas Interaktif ====================

document.addEventListener("DOMContentLoaded", function() {

  // Ambil elemen-elemen modal
  const modalBackdrop = document.getElementById("siswaModalBackdrop");
  const modalContent = document.getElementById("siswaModalContent");
  const closeModalBtn = document.getElementById("modalCloseBtn");
  
  // jika tidak ditemukan, hentikan (mencegah error di halaman lain)
  if (!modalBackdrop || !modalContent || !closeModalBtn) return;

  // Ambil semua tombol "Lihat Data"
  const detailButtons = document.querySelectorAll(".btn-detail");

});

  // Ambil elemen-elemen di dalam modal yang akan diisi data
  const modalFoto = document.getElementById("modalFoto");
  const modalNama = document.getElementById("modalNama");
  const modalAbsen = document.getElementById("modalAbsen");
  const modalNamaLengkap = document.getElementById("modalNamaLengkap");
  const modalNisn = document.getElementById("modalNisn");
  const modalAlamat = document.getElementById("modalAlamat");

  // Fungsi untuk menampilkan modal
  function showModal(data) {
    // Isi data ke dalam modal
    modalFoto.src = data.foto;
    modalFoto.alt = data.nama;
    modalNama.textContent = data.nama;
    modalAbsen.textContent = data.absen;
    modalNamaLengkap.textContent = data.nama;
    modalNisn.textContent = data.nisn;
    modalAlamat.textContent = data.alamat;

    // Tampilkan modal
    modalBackdrop.classList.add("show");
  }

  // Fungsi untuk menyembunyikan modal
  function hideModal() {
    modalBackdrop.classList.remove("show");
  }

  // Tambahkan event listener ke setiap tombol "Lihat Data"
  detailButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Ambil data dari atribut 'data-' pada tombol
      const data = {
        nama: this.dataset.nama,
        nisn: this.dataset.nisn,
        absen: this.dataset.absen,
        alamat: this.dataset.alamat,
        foto: this.dataset.foto
      };
      
      // Tampilkan modal dengan data yang sesuai
      showModal(data);
    });
  });

  // Tambahkan event listener untuk tombol close (X)
  closeModalBtn.addEventListener("click", hideModal);

  // Tambahkan event listener untuk menutup modal saat klik di luar (backdrop)
  modalBackdrop.addEventListener("click", function(event) {
    if (event.target === modalBackdrop) {
      hideModal();
    }
  });

/* =========================================
   SCRIPT.JS - FINAL UNIVERSAL
   (Aman untuk Index, Jurusan, & Galeri)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- BAGIAN 1: LOGIKA SLIDER (Hanya jalan jika ada slider) ---
    const sliderContainer = document.querySelector('.slider');
    
    if (sliderContainer) {
        let slideIndex = 1;
        showSlides(slideIndex);

        // Fungsi Next/Prev
        window.plusSlides = function(n) {
            showSlides(slideIndex += n);
        };

        // Fungsi Utama Slider
        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("slide");
            if (!slides || slides.length === 0) return; // Stop jika tidak ada slide

            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slides[slideIndex - 1].style.display = "block";
        }
        
        // Auto slide (Opsional, hapus jika tidak mau)
        setInterval(() => {
            window.plusSlides(1);
        }, 5000); 
    }


    // --- BAGIAN 2: LOGIKA GALERI (Hanya jalan jika ada elemen galeri) ---
    
    // Database Foto
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

    // Ambil elemen galeri
    const menuView = document.getElementById('menu-view');
    const galleryView = document.getElementById('gallery-view');
    const photoContainer = document.getElementById('photo-container');
    const classTitle = document.getElementById('class-title');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');

    // FUNGSI GLOBAL (Agar bisa dipanggil onclick di HTML)
    // Kita definisikan window.openGallery di sini agar aman
    
    window.openGallery = function(classId) {
        // Cek dulu apakah elemen galeri ada di halaman ini
        if (!menuView || !galleryView) {
            console.warn("Fitur galeri tidak aktif di halaman ini.");
            return;
        }

        // 1. Tampilan
        menuView.style.display = 'none';
        galleryView.style.display = 'block';
        window.scrollTo(0, 0);

        // 2. Judul
        if (classTitle) {
            const formattedClass = classId.toUpperCase().replace(/(\d)/, ' $1');
            classTitle.innerText = `Galeri Kelas XI ${formattedClass}`;
        }

        // 3. Render Foto
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
