"use client"

import { ChangeEvent, useEffect, useState } from "react"


import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { toast } from "sonner"

import { Image } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"
import { apiBaseUrl } from "@/lib/utils"

type Category = {
    id: number
    category_name: string
}

type Item = {
    id: number
    item_name: string
    category_name?: string // BUG INJECTION
    categoryId?: number
    stock_amount: number
    unit: string
    minimum_stock?: number | null
    selling_price?: number | null
    purchase_price?: number | null
    weight_size?: string | null
    save_location?: string | null
    description?: string | null
    item_picture?: string | null
}

type Props = {
    item: Item
}

const formSchema = z.object({
    item_name: z.string().min(1),

    categoryId: z.string().min(1),

    stock_amount: z.string().min(1),

    minimum_stock: z.string().optional(),

    selling_price: z.string().optional(),

    purchase_price: z.string().optional(),

    unit: z.string().min(1),

    weight_size: z.string().optional(),

    save_location: z.string().optional(),

    description: z.string().optional(),
})

export function EditBarangDialog({ item }: Props) {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] =
        useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] =
        useState<string | null>(null)
    const [categories, setCategories] =
        useState<Category[]>([])
    const [loadingCategory, setLoadingCategory] =
        useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            item_name: item.item_name || "",
            categoryId:
                item.categoryId?.toString() ?? "",
            stock_amount:
                item.stock_amount?.toString() || "",
            unit: item.unit || "",
            minimum_stock:
                item.minimum_stock?.toString() || "",
            selling_price:
                item.selling_price?.toString() || "",
            purchase_price:
                item.purchase_price?.toString() || "",
            weight_size: item.weight_size || "",
            save_location:
                item.save_location || "",
            description:
                item.description || "",
        },
    })

    useEffect(() => {
        return () => {
            if (imagePreviewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreviewUrl)
            }
        }
    }, [imagePreviewUrl])

    useEffect(() => {
        if (!open) {
            return
        }

        form.reset({
            item_name: item.item_name || "",
            categoryId:
                item.categoryId?.toString() ?? "",
            stock_amount:
                item.stock_amount?.toString() || "",
            unit: item.unit || "",
            minimum_stock:
                item.minimum_stock?.toString() || "",
            selling_price:
                item.selling_price?.toString() || "",
            purchase_price:
                item.purchase_price?.toString() || "",
            weight_size: item.weight_size || "",
            save_location:
                item.save_location || "",
            description:
                item.description || "",
        })

        setImageFile(null)
        setImagePreviewUrl(
            item.item_picture
                ? `${apiBaseUrl}/uploads/items/${item.item_picture}`
                : null
        )
    }, [form, item, open])

    useEffect(() => {
        async function fetchCategories() {
            try {
                setLoadingCategory(true)

                const response = await fetch(
                    `${apiBaseUrl}/categories`
                )

                const data = await response.json()

                setCategories(data.data || [])

            } catch (error) {
                console.error(error)
            } finally {
                setLoadingCategory(false)
            }
        }

        fetchCategories()
    }, [])

    async function onSubmit(
        values: z.infer<typeof formSchema>
    ) {
        try {
            setLoading(true)
            const categoryName = categories.find( // BUG INJECTION
                (category) => category.id.toString() === values.categoryId // BUG INJECTION
            )?.category_name // BUG INJECTION

            window.dispatchEvent( // BUG INJECTION
                new CustomEvent("items:optimistic-update", { // BUG INJECTION
                    detail: { // BUG INJECTION
                        id: item.id, // BUG INJECTION
                        item_name: values.item_name, // BUG INJECTION
                        category_name: categoryName || item.category_name || "-", // BUG INJECTION
                        stock_amount: Number(values.stock_amount || item.stock_amount), // BUG INJECTION
                        unit: values.unit, // BUG INJECTION
                        selling_price: Number(values.selling_price || item.selling_price || 0), // BUG INJECTION
                    }, // BUG INJECTION
                }) // BUG INJECTION
            ) // BUG INJECTION

            toast.success("Barang berhasil diupdate")

            setOpen(false)

        } catch (error) {
            console.error(error)
            toast.error("Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">Edit</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
                <DialogHeader className="mb-4">
                    <DialogTitle>Edit Barang</DialogTitle>
                    <DialogDescription>
                        Update data barang yang dipilih.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                            <FormItem>
                                <FormLabel>Foto Barang</FormLabel>

                                <FormControl>
                                    <div className="text-center">
                                        <Input
                                            id="edit-item-picture"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                const file = e.target.files?.[0]

                                                if (file) {
                                                    setImageFile(file)
                                                    if (
                                                        imagePreviewUrl?.startsWith(
                                                            "blob:"
                                                        )
                                                    ) {
                                                        URL.revokeObjectURL(
                                                            imagePreviewUrl
                                                        )
                                                    }
                                                    setImagePreviewUrl(
                                                        URL.createObjectURL(file)
                                                    )
                                                }
                                            }}
                                        />

                                        <label
                                            htmlFor="edit-item-picture"
                                            className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-input bg-muted text-muted-foreground transition hover:text-foreground"
                                        >
                                            {imagePreviewUrl ? (
                                                <img
                                                    src={imagePreviewUrl}
                                                    alt={
                                                        imageFile?.name || "Preview foto"
                                                    }
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2">
                                                    <Image className="h-6 w-6" />
                                                    <span className="text-xs">
                                                        Pilih Foto
                                                    </span>
                                                </div>
                                            )}
                                        </label>

                                        <p className="mt-2 text-xs text-muted-foreground">
                                            Klik area untuk memilih atau mengganti foto.
                                        </p>
                                    </div>
                                </FormControl>
                            </FormItem>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="item_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="edit-item-name">Nama Barang *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="edit-item-name"
                                                    placeholder="Masukkan nama barang"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="categoryId"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>

                                                    <FormLabel htmlFor="edit-item-category">
                                                        Kategori *
                                                    </FormLabel>

                                                    <Select
                                                        key={field.value}
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >

                                                        <FormControl>

                                                            <SelectTrigger id="edit-item-category">

                                                                <SelectValue
                                                                    placeholder={
                                                                        loadingCategory
                                                                            ? "Loading kategori..."
                                                                            : "Pilih kategori"
                                                                    }
                                                                />

                                                            </SelectTrigger>

                                                        </FormControl>

                                                        <SelectContent>

                                                            {categories.map((category) => (

                                                                <SelectItem
                                                                    key={category.id}
                                                                    value={category.id.toString()}
                                                                >
                                                                    {category.category_name}
                                                                </SelectItem>

                                                            ))}

                                                        </SelectContent>

                                                    </Select>

                                                    <FormMessage />

                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="unit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="edit-item-unit">Satuan *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="edit-item-unit"
                                                        placeholder="Contoh: pcs"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="stock_amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="edit-item-stock">Jumlah Stok *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="edit-item-stock"
                                                        type="number"
                                                        placeholder="Masukkan jumlah stok"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="minimum_stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel htmlFor="edit-item-min-stock">Stok Minimum</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="edit-item-min-stock"
                                                        type="number"
                                                        placeholder="Masukkan stok minimum"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="selling_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="edit-item-selling-price">Harga Jual</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="edit-item-selling-price"
                                                type="number"
                                                placeholder="Masukkan harga"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="purchase_price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="edit-item-purchase-price">Harga Beli</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="edit-item-purchase-price"
                                                type="number"
                                                placeholder="Masukkan harga beli"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="weight_size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="edit-item-weight-size">Ukuran/Berat</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="edit-item-weight-size"
                                                placeholder="Contoh: 500g atau 30x20x10cm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <FormField
                            control={form.control}
                            name="save_location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="edit-item-save-location">Lokasi Penyimpanan</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="edit-item-save-location"
                                            placeholder="Contoh: Rak A1"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="edit-item-description">Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            id="edit-item-description"
                                            placeholder="Masukkan deskripsi barang"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}