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



// ==================== GALERI INTERAKTIF ====================
const uploadInput = document.getElementById("uploadInput");
const galeriGrid = document.getElementById("galeriGrid");

// Menyimpan foto di localStorage (tetap ada saat reload)
function loadSavedImages() {
  const saved = JSON.parse(localStorage.getItem("galeriFotos")) || [];
  galeriGrid.innerHTML = "";
  saved.forEach(src => {
    const div = document.createElement("div");
    div.classList.add("foto");
    div.innerHTML = `<img src="${src}" alt="Foto Kenangan"><p>Foto dari teman ✨</p>`;
    galeriGrid.appendChild(div);
  });
}
loadSavedImages();

uploadInput.addEventListener("change", (e) => {
  const files = e.target.files;
  let saved = JSON.parse(localStorage.getItem("galeriFotos")) || [];

  for (let file of files) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      saved.push(evt.target.result);
      localStorage.setItem("galeriFotos", JSON.stringify(saved));
      loadSavedImages();
    };
    reader.readAsDataURL(file);
  }
});
// ==================== AKHIR GALERI INTERAKTIF ====================