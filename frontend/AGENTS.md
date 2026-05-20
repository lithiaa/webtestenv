Saya memiliki project web manajemen stok dengan fitur:

1. CRUD Barang
2. CRUD Kategori Barang

Tech stack:
- Frontend: [ISI SENDIRI]
- Backend: [ISI SENDIRI]
- Database: [ISI SENDIRI]

Saya ingin project ini dijadikan testbed untuk skripsi automation testing menggunakan Katalon Studio.

Tolong bantu IMPLEMENTASIKAN bug secara sengaja (intentional bug injection) pada project ini. 
Bug harus tetap membuat aplikasi bisa berjalan normal, tetapi menghasilkan perilaku yang salah sehingga dapat dideteksi oleh automation testing.

PENTING:
- Jangan merusak keseluruhan aplikasi
- Jangan membuat aplikasi crash total
- Bug harus realistis seperti bug pada aplikasi production
- Tambahkan komentar:
  // BUG INJECTION
  pada setiap kode yang dimodifikasi
- Jelaskan file mana saja yang diubah
- Jelaskan bagaimana bug bekerja
- Jangan memperbaiki bug
- Fokus hanya implementasi bug

Implementasikan 10 bug berikut:

==================================================
BUG 1 — Required Validation Tidak Berjalan
==================================================

Pada form tambah barang:
- field nama barang tetap bisa disubmit meskipun kosong
- field stok tetap bisa disubmit meskipun kosong

Expected normal:
- form ditolak

Bug:
- data tetap tersimpan

==================================================
BUG 2 — Stok Negatif Diperbolehkan
==================================================

Izinkan input stok:
-1
-10
-999

Bug:
- backend tetap menerima data

==================================================
BUG 3 — Delete Barang Gagal Tetapi Toast Sukses
==================================================

Saat tombol delete ditekan:
- tampilkan toast "Berhasil menghapus data"
- tetapi data sebenarnya jangan dihapus dari database

Pastikan:
- setelah refresh data masih ada

==================================================
BUG 4 — Edit Barang Tidak Persist Setelah Refresh
==================================================

Saat edit barang:
- frontend menampilkan data berhasil berubah
- tetapi backend jangan update database

Atau:
- update hanya di state frontend sementara

==================================================
BUG 5 — Duplicate Nama Barang Diperbolehkan
==================================================

Hilangkan validasi unique:
- nama barang boleh sama persis

==================================================
BUG 6 — Toast Notification Hilang Terlalu Cepat
==================================================

Toast sukses/error:
- hilang dalam < 500ms

Tujuan:
- memicu flaky automation test pada Katalon

==================================================
BUG 7 — Delay Loading Data Table
==================================================

Tambahkan artificial delay:
- 5–8 detik
- sebelum data tabel barang muncul

Tujuan:
- memicu timeout/synchronization issue

==================================================
BUG 8 — Tombol Simpan Tetap Disabled Setelah Error
==================================================

Saat submit invalid:
- tombol save menjadi disabled

Bug:
- setelah input diperbaiki
- tombol tetap disabled

==================================================
BUG 9 — Kategori Barang Salah Tersimpan
==================================================

Saat user memilih kategori:
- Elektronik

Bug:
- simpan kategori lain secara acak
ATAU
- offset index dropdown

Contoh:
- pilih index 1
- yang tersimpan index 2

==================================================
BUG 10 — Search Bersifat Case Sensitive
==================================================

Bug:
- search hanya bekerja jika huruf besar/kecil sama persis

Contoh:
Data:
Laptop

Search:
laptop

Hasil:
tidak ditemukan

==================================================

Setelah selesai:
1. tampilkan semua file yang diubah
2. jelaskan tiap bug diimplementasikan di bagian mana
3. jangan memperbaiki bug
4. jangan melakukan refactor besar
5. pertahankan struktur project yang ada