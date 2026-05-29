"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { EditBarangDialog }
    from "./edit-barang-dialog"

import { DeleteBarangDialog }
    from "./delete-barang-dialog"
import { apiBaseUrl } from "@/lib/utils"

type Item = {
    id: number

    item_name: string

    category_name?: string

    stock_amount: number

    minimum_stock?: number

    selling_price?: number

    purchase_price?: number

    weight_size?: string

    unit: string

    save_location?: string

    description?: string

    item_picture?: string
}

type Props = {
    item: Item
}

export function DetailBarangDialog({
    item,
}: Props) {

    return (
        <Dialog>

            <DialogTrigger asChild>

                <Button
                    id={`detail-item-open-dialog-${item.id}`}
                    variant="outline"
                    size="sm"
                >
                    Detail
                </Button>

            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">

                <DialogHeader className="mb-4">

                    <DialogTitle>
                        Detail Barang
                    </DialogTitle>

                    <DialogDescription>
                        Informasi lengkap barang.
                    </DialogDescription>

                </DialogHeader>

                <div className="space-y-4">

                    <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                        <div>
                            <div className="mb-2 text-sm font-medium">
                                Foto Barang
                            </div>

                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border bg-muted">
                                {item.item_picture ? (
                                    <img
                                        src={`${apiBaseUrl}/uploads/items/${item.item_picture}`}
                                        alt={item.item_name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                                        Tidak ada gambar
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 pl-4">
                            <DetailField
                                label="Nama Barang"
                                value={item.item_name}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <DetailField
                                    label="Kategori"
                                    value={
                                        item.category_name ||
                                        "Tanpa Kategori"
                                    }
                                />

                                <DetailField
                                    label="Satuan"
                                    value={item.unit}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <DetailField
                                    label="Jumlah Stok"
                                    value={`${item.stock_amount} ${item.unit}`}
                                />

                                <DetailField
                                    label="Stok Minimum"
                                    value={
                                        item.minimum_stock?.toString() ||
                                        "-"
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <DetailField
                            label="Harga Jual"
                            value={
                                item.selling_price
                                    ? `Rp ${item.selling_price.toLocaleString()}`
                                    : "-"
                            }
                        />

                        <DetailField
                            label="Harga Beli"
                            value={
                                item.purchase_price
                                    ? `Rp ${item.purchase_price.toLocaleString()}`
                                    : "-"
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <DetailField
                            label="Ukuran/Berat"
                            value={item.weight_size || "-"}
                        />

                        <DetailField
                            label="Lokasi Penyimpanan"
                            value={item.save_location || "-"}
                        />
                    </div>

                    <div>
                        <div className="text-sm font-medium">
                            Deskripsi
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {item.description ||
                                "Tidak ada deskripsi"}
                        </p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <EditBarangDialog item={item} />
                        <DeleteBarangDialog
                            id={item.id}
                            item_name={item.item_name}
                        />
                    </div>
                </div>

            </DialogContent >

        </Dialog >
    )
}

function DetailField({
    label,
    value,
}: {
    label: string
    value: string
}) {
    return (
        <div>
            <div className="text-sm font-medium">
                {label}
            </div>

            <div className="text-sm text-muted-foreground">
                {value}
            </div>
        </div>
    )
}