"use client"

import { useState } from "react"

import { z } from "zod"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Plus } from "lucide-react"

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

import { toast } from "sonner"
import { apiBaseUrl } from "@/lib/utils"


const formSchema = z.object({
  category_name: z
    .string()
    .min(1, "Nama kategori wajib diisi"),

  description: z.string().optional(),
})

export function AddKategoriDialog() {


  const [loading, setLoading] =
    useState(false)

  const [open, setOpen] =
    useState(false)

  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),

    defaultValues: {
      category_name: "",
      description: "",
    },
  })

  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    try {

      setLoading(true)

      const response = await fetch(
        `${apiBaseUrl}/categories`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal menambah kategori"
        )
      }

      toast.success(
        "Kategori berhasil ditambahkan"
      )

      window.dispatchEvent(
        new Event("categories:refresh")
      )

      form.reset()

      setOpen(false)

    } catch (error) {

      console.error(error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan"
      )

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
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            Tambah Kategori
          </DialogTitle>

          <DialogDescription>
            Tambahkan kategori baru
            untuk inventaris.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>

          <form
            onSubmit={
              form.handleSubmit(onSubmit)
            }
            className="space-y-4"
          >

            {/* NAMA KATEGORI */}
            <FormField
              control={form.control}
              name="category_name"

              render={({ field }) => (
                <FormItem>

                  <FormLabel htmlFor="add-category-name">
                    Nama Kategori *
                  </FormLabel>

                  <FormControl>
                    <Input
                      id="add-category-name"
                      placeholder="Masukkan nama kategori"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />

                </FormItem>
              )}
            />

            {/* DESKRIPSI */}
            <FormField
              control={form.control}
              name="description"

              render={({ field }) => (
                <FormItem>

                  <FormLabel htmlFor="add-category-description">
                    Deskripsi
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      id="add-category-description"
                      placeholder="Masukkan deskripsi kategori"
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
                : "Simpan Kategori"}
            </Button>

          </form>

        </Form>

      </DialogContent>

    </Dialog>
  )
}