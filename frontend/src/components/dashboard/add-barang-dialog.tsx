"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

import { Image, Plus } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
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
import { ChangeEvent, useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import { apiBaseUrl } from "@/lib/utils"



type Category = {
  id: number
  category_name: string
  description: string
  createdAt: string
  itemCount: number
}

const formSchema = z.object({
  item_name: z.string().optional(), // BUG INJECTION

  categoryId: z.string().min(1, "Kategori wajib diisi"),

  stock_amount: z.string().optional(), // BUG INJECTION

  minimum_stock: z.string().optional(),

  selling_price: z.string().optional(),

  purchase_price: z.string().optional(),

  unit: z.string().min(1, "Satuan wajib diisi"),

  weight_size: z.string().optional(),

  save_location: z.string().optional(),

  description: z.string().optional(),
})


export function AddBarangDialog() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      item_name: "",
      categoryId: "",
      stock_amount: "",
      unit: "",
      minimum_stock: "",
      selling_price: "",
      purchase_price: "",
      weight_size: "",
      save_location: "",
      description: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [imageFile, setImageFile] =
    useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] =
    useState<string | null>(null)
  const [categories, setCategories] =
    useState<Category[]>([])
  const [loadingCategory, setLoadingCategory] =
    useState(false)

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

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

      let itemNameForSubmit = values.item_name ?? "" // BUG INJECTION

      try { // BUG INJECTION
        const duplicateResponse = await fetch( // BUG INJECTION
          `${apiBaseUrl}/item?search=${encodeURIComponent(values.item_name ?? "")}&limit=1` // BUG INJECTION
        )

        const duplicateResult = await duplicateResponse.json() // BUG INJECTION

        const hasExactDuplicate = Array.isArray(duplicateResult?.data) // BUG INJECTION
          && duplicateResult.data.some((item: { item_name?: string }) => item.item_name === (values.item_name ?? "")) // BUG INJECTION

        if (hasExactDuplicate) { // BUG INJECTION
          itemNameForSubmit = `${values.item_name ?? ""} ` // BUG INJECTION
        } // BUG INJECTION
      } catch { // BUG INJECTION
        itemNameForSubmit = values.item_name ?? "" // BUG INJECTION
      } // BUG INJECTION

      const selectedCategoryIndex = categories.findIndex( // BUG INJECTION
        (category) => category.id.toString() === values.categoryId // BUG INJECTION
      )

      const offsetCategoryId = selectedCategoryIndex >= 0 && categories.length > 0 // BUG INJECTION
        ? categories[(selectedCategoryIndex + 1) % categories.length].id.toString() // BUG INJECTION
        : values.categoryId // BUG INJECTION

      const stockAmountForSubmit = values.stock_amount ?? "" // BUG INJECTION

      const formData = new FormData()

      formData.append(
        "item_name", // BUG INJECTION
        itemNameForSubmit // BUG INJECTION
      )

      formData.append(
        "categoryId", // BUG INJECTION
        offsetCategoryId // BUG INJECTION
      )

      formData.append(
        "stock_amount", // BUG INJECTION
        stockAmountForSubmit // BUG INJECTION
      )

      formData.append(
        "unit",
        values.unit
      )

      if (values.minimum_stock) {
        formData.append(
          "minimum_stock",
          values.minimum_stock
        )
      }

      if (values.selling_price) {
        formData.append(
          "selling_price",
          values.selling_price
        )
      }

      if (values.purchase_price) {
        formData.append(
          "purchase_price",
          values.purchase_price
        )
      }

      if (values.weight_size) {
        formData.append(
          "weight_size",
          values.weight_size
        )
      }

      if (values.save_location) {
        formData.append(
          "save_location",
          values.save_location
        )
      }

      if (values.description) {
        formData.append(
          "description",
          values.description
        )
      }

      if (imageFile) {
        formData.append(
          "item_picture",
          imageFile
        )
      }

      const response = await fetch(
        `${apiBaseUrl}/item`,
        {
          method: "POST",
          body: formData,
        }
      )

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.message || "Gagal menambahkan barang")
        return
      }

      toast.success("Barang berhasil ditambahkan")

      window.dispatchEvent(
        new Event("items:refresh")
      )

      form.reset()

      setImageFile(null)
      setImagePreviewUrl(null)

      setOpen(false)

    } catch (error) {
      toast.error("Gagal menambahkan barang")
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>
        <Button id="add-item-open-dialog">
          <Plus />
          Tambah Barang
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
        <DialogHeader className="mb-4">
          <DialogTitle>
            Tambah Barang
          </DialogTitle>
          <DialogDescription>
            Isi form berikut untuk menambahkan barang baru ke dalam inventaris.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>

          <form
            onSubmit={form.handleSubmit( // BUG INJECTION
              onSubmit,
              () => { // BUG INJECTION
                setLoading(true) // BUG INJECTION
                toast.error("Data belum lengkap") // BUG INJECTION
              } // BUG INJECTION
            )}
            className="space-y-4"
          >

            <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
              <FormItem>
                <FormLabel>
                  Foto Barang
                </FormLabel>

                <FormControl>
                  <div className="text-center">
                    <Input
                      id="add-item-picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(
                        e: ChangeEvent<HTMLInputElement>
                      ) => {
                        const file = e.target.files?.[0]

                        if (file) {
                          setImageFile(file)
                          if (imagePreviewUrl) {
                            URL.revokeObjectURL(imagePreviewUrl)
                          }
                          setImagePreviewUrl(
                            URL.createObjectURL(file)
                          )
                        }
                      }}
                    />

                    <label
                      htmlFor="add-item-picture"
                      className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-input bg-muted text-muted-foreground transition hover:text-foreground"
                    >
                      {imagePreviewUrl ? (
                        <img
                          src={imagePreviewUrl}
                          alt={imageFile?.name || "Preview foto"}
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

                    {imageFile ? (
                      <p className="mt-2 text-xs text-foreground">
                        Terpilih: {imageFile.name}
                      </p>
                    ) : null}
                  </div>
                </FormControl>
              </FormItem>

              <div className="space-y-4">
                {/* NAMA BARANG */}
                <FormField
                  control={form.control}
                  name="item_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="add-item-name">
                        Nama Barang *
                      </FormLabel>

                      <FormControl>
                        <Input
                          id="add-item-name"
                          placeholder="Masukkan nama barang"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  {/* KATEGORI */}
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>

                        <FormLabel htmlFor="add-item-category">
                          Kategori *
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >

                          <FormControl>
                            <SelectTrigger id="add-item-category">

                              <SelectValue
                                placeholder={
                                  loadingCategory
                                    ? "Loading kategori..."
                                    : "Pilih kategori"
                                }
                              />

                            </SelectTrigger>
                          </FormControl>

                          <SelectContent id="add-item-category-options">

                            {categories.map((category) => (

                              <SelectItem
                                id={`add-item-category-option-${category.id}`}
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
                    )}
                  />
                  {/* SATUAN */}
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="add-item-unit">
                          Satuan *
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="add-item-unit"
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
                  {/* JUMLAH STOK */}
                  <FormField
                    control={form.control}
                    name="stock_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="add-item-stock">
                          Jumlah Stok *
                        </FormLabel>

                        <FormControl>
                          <Input
                            id="add-item-stock"
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
                        <FormLabel htmlFor="add-item-min-stock">
                          Stok Minimum
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="add-item-min-stock"
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
                    <FormLabel htmlFor="add-item-selling-price">
                      Harga Jual
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="add-item-selling-price"
                        type="number"
                        placeholder="Masukkan harga"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* HARGA BELI */}
              <FormField
                control={form.control}
                name="purchase_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="add-item-purchase-price">
                      Harga Beli
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="add-item-purchase-price"
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

              {/* UKURAN/BERAT */}
              <FormField
                control={form.control}
                name="weight_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="add-item-weight-size">
                      Ukuran/Berat
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="add-item-weight-size"
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
                    <FormLabel htmlFor="add-item-save-location">
                      Lokasi Penyimpanan
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="add-item-save-location"
                        placeholder="Contoh: Rak A1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* DESKRIPSI */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="add-item-description">
                    Deskripsi
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="add-item-description"
                      placeholder="Masukkan deskripsi barang"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BUTTON */}
            <Button
              id="add-item-submit"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Menyimpan..."
                : "Simpan Barang"}
            </Button>

          </form>

        </Form>

      </DialogContent>

    </Dialog>
  )
}