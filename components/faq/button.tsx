'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { deleteFaqAction } from '@/app/_actions/faqs';
import { toast } from 'sonner';

interface FaqCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
  delid: number
}

export function FaqButton (props:FaqCardProps)  {
  const [isPending, startTransition] = React.useTransition()
  const toDelete = props.delid
  return (
          <Button
              variant='secondary'
              aria-label="delete faq"
              size="icon"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startTransition(async () => {
                  try {
                    await deleteFaqAction( toDelete )
                    toast.success("Faq Deleted")
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
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
                />
                ) : (
                  <Icons.trash className="mr-2 h-4 w-4" aria-hidden="true" />
                  )}
          </Button>
  )
}
