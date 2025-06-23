// Inisialisasi AOS
AOS.init({ duration: 1000, once: true });

// Inisialisasi ScrollReveal
ScrollReveal().reveal('.reveal-up', {
  distance: '60px',
  origin: 'bottom',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200
});
ScrollReveal().reveal('.reveal-left', {
  distance: '50px',
  origin: 'left',
  duration: 1000,
  easing: 'ease-in-out'
});

// Ambil data dari localStorage (kalau ada)
let dataSiswa = JSON.parse(localStorage.getItem("dataSiswa")) || [];

function simpanKeStorage() {
  localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
}

function renderTable() {
  const tbody = document.getElementById("siswaTableBody");
  tbody.innerHTML = "";
  dataSiswa.forEach((siswa, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${siswa.nama}</td>
        <td>${siswa.kelas}</td>
        <td>${siswa.email}</td>
        <td><button class="btn btn-danger btn-sm" onclick="hapusSiswa(${index})">Hapus</button></td>
      </tr>
    `;
  });
}

function hapusSiswa(index) {
  dataSiswa.splice(index, 1);
  simpanKeStorage();
  renderTable();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studentForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const kelas = document.getElementById("kelas").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nama || !kelas || !email) {
      alert("Isi semua kolom yaa!");
      return;
    }

    dataSiswa.push({ nama, kelas, email });
    simpanKeStorage();
    renderTable();
    form.reset();
    alert("Data siswa berhasil ditambahkan!");
  });

  renderTable();
});
