"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

import { toast } from "sonner"


import { useState } from "react"

type DeleteKategoriDialogProps = {
  id: number
  category_name: string
}

export function DeleteKategoriDialog({
  id,
  category_name,
}: DeleteKategoriDialogProps) {


  const [loading, setLoading] =
    useState(false)

  async function handleDelete() {

    try {

      setLoading(true)

      const response = await fetch(
        `http://localhost:8000/categories/${id}`,
        {
          method: "DELETE",
        }
      )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Gagal menghapus kategori"
        )
      }

      toast.success(
        "Kategori berhasil dihapus"
      )

      window.dispatchEvent(
        new Event("categories:refresh")
      )

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
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
        >
          Hapus
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Hapus Kategori
          </AlertDialogTitle>

          <AlertDialogDescription>
            Apakah Anda yakin ingin
            menghapus kategori
            <span className="font-semibold">
              {" "}
              {category_name}
            </span>
            ? Tindakan ini tidak dapat
            dibatalkan.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Batal
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Menghapus..."
              : "Ya, Hapus"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  )
}