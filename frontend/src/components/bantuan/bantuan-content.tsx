import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

export function BantuanContent() {

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <h1 className="text-xl font-bold">
                Panduan Penggunaan Sistem
            </h1>

            <Separator />

            {/* TUTORIAL */}
            <div className="grid gap-4">

                <Card>

                    <CardHeader>
                        <CardTitle>
                            <b>Cara Menambah Barang Baru</b>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <ol className="list-decimal space-y-2 pl-5">

                            <li>
                                Buka halaman <b>Dashboard</b>, klik tombol <b> + Tambah Barang</b> di kanan atas.
                            </li>

                            <li>
                                Unggah foto barang (opsional), lalu isi formulir: nama, kategori, satuan, jumlah stok, harga, dan lainnya.
                            </li>

                            <li>
                                Klik <b>Simpan Barang.</b> Barang akan muncul di daftar dashboard.
                            </li>

                        </ol>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader>
                        <CardTitle>
                            <b>Cara update stok barang masuk</b>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <ol className="list-decimal space-y-2 pl-5">

                            <li>
                                Temukan barang di dashboard menggunakan kolom pencarian atau filter kategori.
                            </li>

                            <li>
                                Klik tombol <b>Edit</b> pada baris barang tersebut.
                            </li>

                            <li>
                                Ubah nilai <b>Jumlah stok</b> sesuai kondisi saat ini, lalu klik <b>Simpan Barang.</b>
                            </li>

                        </ol>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <b>Cara mengelola kategori</b>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal space-y-2 pl-5">
                            <li>
                                Buka halaman <b>Kategori</b> dari sidebar.
                            </li>
                            <li>
                                Klik tombol <b>+ Tambah Kategori</b> untuk membuat kategori baru, isi nama kategori, lalu simpan.
                            </li>
                            <li>
                                Untuk mengedit atau menghapus kategori, gunakan tombol aksi pada baris kategori yang diinginkan.
                            </li>
                            <li>
                                Menghapus kategori tidak akan menghapus barang, tetapi barang tersebut akan menjadi tidak berkategori.
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <p> Satuan barang diisi bebas sesuai kebutuhan, misalnya <b>pcs</b>, <b>kg</b>, <b>liter</b>, dll.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <b>Informasi Mahasiswa</b>
                        </CardTitle>
                        <CardContent>
                        <ol className="space-y-2 pt-2">
                            <li>
                                <b>Nama :</b> Muhammad Bagus Indrawan <br />
                            </li>
                            <li>
                                <b>NIM :</b> 2241720217 <br />
                            </li>
                            <li>
                                <b>Kelas :</b> TI - 4H <br />
                            </li>
                            <li>
                                <b>Prodi :</b> Teknik Informatika <br />
                            </li>
                            <li>
                                <b>Alamat :</b> Jl. Tlogosuryo Gg.V No.33 RT.4 RW.2 Tlogomas, Lowokwaru, Kota Malang <br />
                            </li>
                            <li>
                                <b>No Telepon :</b> 082331906216 <br />
                            </li>
                            <li>
                                <b>Email :</b> indraw910@gmail.com <br />
                            </li>
                        </ol>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}