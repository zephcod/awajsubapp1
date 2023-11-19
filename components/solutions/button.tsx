'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import { deleteProductAction } from '@/app/_actions/solution';

interface FaqCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
  delid: number
}

export function SolButton (props:FaqCardProps)  {
  const [isPending, startTransition] = React.useTransition()
  const toDelete = props.delid
  return (
          <Button
              variant='outline'
              aria-label="delete solution"
              size="icon"
              className='bg-red-400 hover:cursor-pointe'
              onClick={() => {
                startTransition(async () => {
                  try {
                    await deleteProductAction( toDelete )
                    toast.success("Solution Deleted")
                  } catch (error) {
                    error instanceof Error
                      ? toast.error(error.message)
                      : toast.error("Something went wrong, please try again.")
                  }
                })
              }}
              disabled={isPending}
              >
              {isPending ? (
                <Icons.spinner
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
                />
                ) : (
                  <Icons.trash className="h-4 w-4" aria-hidden="true" />
                  )}
          </Button>
  )
}
