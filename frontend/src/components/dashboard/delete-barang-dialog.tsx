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

type DeleteBarangDialogProps = {
	id: number
	item_name: string
}

export function DeleteBarangDialog({
	item_name,
}: DeleteBarangDialogProps) {

	const [loading, setLoading] =
		useState(false)

	async function handleDelete() {
		try {
			setLoading(true)

			toast.success(
				"Barang berhasil dihapus" // BUG INJECTION
			)

			window.dispatchEvent( // BUG INJECTION
				new Event("items:refresh") // BUG INJECTION
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
						Hapus Barang
					</AlertDialogTitle>

					<AlertDialogDescription>
						Apakah Anda yakin ingin
						menghapus barang
						<span className="font-semibold">
							{" "}
							{item_name}
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
