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



type Category = {
  id: number
  category_name: string
  description: string
  createdAt: string
  itemCount: number
}

const formSchema = z.object({
  item_name: z.string().min(1, "Nama barang wajib diisi"),

  categoryId: z.string().min(1, "Kategori wajib diisi"),

  stock_amount: z.string().min(1, "Jumlah stok wajib diisi"),

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
          "http://localhost:8000/categories"
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

      const formData = new FormData()

      formData.append(
        "item_name",
        values.item_name
      )

      formData.append(
        "categoryId",
        values.categoryId
      )

      formData.append(
        "stock_amount",
        values.stock_amount
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
        "http://localhost:8000/item",
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
        <Button>
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
            onSubmit={form.handleSubmit(onSubmit)}
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
                      id="item-picture"
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
                      htmlFor="item-picture"
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
                      <FormLabel>
                        Nama Barang *
                      </FormLabel>

                      <FormControl>
                        <Input
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

                        <FormLabel>
                          Kategori *
                        </FormLabel>

                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >

                          <FormControl>
                            <SelectTrigger>

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
                    )}
                  />
                  {/* SATUAN */}
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Satuan *
                        </FormLabel>

                        <FormControl>
                          <Input
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
                        <FormLabel>
                          Jumlah Stok *
                        </FormLabel>

                        <FormControl>
                          <Input
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
                        <FormLabel>
                          Stok Minimum
                        </FormLabel>
                        <FormControl>
                          <Input
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
                    <FormLabel>
                      Harga Jual
                    </FormLabel>

                    <FormControl>
                      <Input
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
                    <FormLabel>
                      Harga Beli
                    </FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>
                      Ukuran/Berat
                    </FormLabel>
                    <FormControl>
                      <Input
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
                    <FormLabel>
                      Lokasi Penyimpanan
                    </FormLabel>
                    <FormControl>
                      <Input
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
                  <FormLabel>
                    Deskripsi
                  </FormLabel>
                  <FormControl>
                    <Textarea
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