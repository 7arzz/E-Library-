document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi AOS jika tersedia
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true });
  }

  // Variabel penting
  const bukuTable = document.getElementById("bukuTableBody");
  const loginSection = document.getElementById("loginSection");
  const bookSection = document.getElementById("bookSection");
  const loginForm = document.getElementById("adminLoginForm");
  const bookForm = document.getElementById("bookForm");

  // Ambil data dari localStorage
  let dataBuku = JSON.parse(localStorage.getItem("dataBuku")) || [];

  function simpanBuku() {
    localStorage.setItem("dataBuku", JSON.stringify(dataBuku));
  }

  function renderBuku() {
    if (!bukuTable) return;
    bukuTable.innerHTML = "";

    dataBuku.forEach((buku, index) => {
      const isAdmin = bookSection && bookSection.style.display === "block";
      bukuTable.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${buku.judul}</td>
          <td>${buku.penulis}</td>
          <td>${buku.stok}</td>
          <td class="text-center">
            ${isAdmin ? `<button class="btn btn-danger btn-sm" onclick="hapusBuku(${index})">Hapus</button>` : "-"}
          </td>
        </tr>
      `;
    });
  }

  // Fungsi hapus
  window.hapusBuku = function (index) {
    dataBuku.splice(index, 1);
    simpanBuku();
    renderBuku();
  };

  // Form tambah buku
  if (bookForm) {
    bookForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const judul = document.getElementById("judul").value.trim();
      const penulis = document.getElementById("pengarang").value.trim();
      const stok = parseInt(document.getElementById("stok").value.trim());

      if (!judul || !penulis || isNaN(stok)) {
        alert("Lengkapi semua kolom dengan benar!");
        return;
      }

      dataBuku.push({ judul, penulis, stok });
      simpanBuku();
      renderBuku();
      bookForm.reset();
      alert("Buku berhasil ditambahkan!");
    });
  }

  // Login admin
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const password = document.getElementById("adminPassword").value.trim();

      if (password === "admin123") {
        loginSection.style.display = "none";
        bookSection.style.display = "block";
        renderBuku(); // render ulang biar tombol hapus muncul
      } else {
        alert("Password salah, coba lagi!");
      }
    });
  }

  renderBuku(); // render awal
});
