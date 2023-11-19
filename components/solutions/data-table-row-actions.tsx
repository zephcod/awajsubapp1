"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu"

import { labels } from "./data"
import { solutionsSchema } from "./schema"
import { Icons } from "../icons"
import Link from "next/link"
import { SolButton } from "./button"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const sol = solutionsSchema.parse(row.original)

  return (
    <div className="flex flex-row gap-4 justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link href={`solutions/${sol.id}`}
                className="w-full">
                Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Stop selling</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-card text-primary border-border">
            <DropdownMenuRadioGroup value={sol.name} >
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value} className="hover:cursor-pointer hover:bg-secondary">
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <SolButton delid={sol.id}/>
   </div>
  )
}