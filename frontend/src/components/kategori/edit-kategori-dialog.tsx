"use client"

import { useState } from "react"


import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { toast } from "sonner"

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

import { Textarea } from "@/components/ui/textarea"
import { apiBaseUrl } from "@/lib/utils"

const formSchema = z.object({
  category_name: z.string().min(1, "Nama kategori wajib diisi"),

  description: z.string().optional(),
})

type Category = {
  id: number
  category_name: string
  description?: string
}

type Props = {
  category: Category
}

export function EditKategoriDialog({
  category,
}: Props) {


  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),

    defaultValues: {
      category_name:
        category.category_name,

      description:
        category.description || "",
    },
  })

  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    try {

      setLoading(true)

      const response = await fetch(
        `${apiBaseUrl}/categories/${category.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      )

      if (!response.ok) {
        toast.error(
          "Gagal mengupdate kategori"
        )

        return
      }

      toast.success(
        "Kategori berhasil diupdate"
      )

      window.dispatchEvent(
        new Event("categories:refresh")
      )

      setOpen(false)

    } catch (error) {

      console.error(error)

      toast.error("Terjadi kesalahan")

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
        <Button size="sm">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Edit Kategori
          </DialogTitle>

          <DialogDescription>
            Update data kategori.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-4"
          >

            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>

                  <FormLabel htmlFor="edit-category-name">
                    Nama Kategori
                  </FormLabel>

                  <FormControl>
                    <Input id="edit-category-name" {...field} />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>

                  <FormLabel htmlFor="edit-category-description">
                    Deskripsi
                  </FormLabel>

                  <FormControl>
                    <Textarea id="edit-category-description" {...field} />
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
              {loading
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Button>

          </form>

        </Form>

      </DialogContent>

    </Dialog>
  )
}