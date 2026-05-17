"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type UserProfileProps = {
  name: string
  email: string
  image?: string
}

export function UserProfile({
  name,
  email,
  image,
}: UserProfileProps) {

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-3">

      <Avatar className="h-10 w-10">
        <AvatarImage src={image} />
        <AvatarFallback>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col leading-tight">
        <p className="text-sm font-medium">
          {name}
        </p>

        <p className="text-xs text-muted-foreground">
          {email}
        </p>
      </div>

    </div>
  )
}