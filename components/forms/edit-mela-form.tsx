"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { updateMelaAction } from "@/app/_actions/mela"
import { melaIdSchema, melaSchema } from "@/lib/validations/order"


type Id = z.infer<typeof melaIdSchema>
type Inputs = z.infer<typeof melaSchema>


export function EditMelaForm( props:Inputs & Id ) {

  const [isPending, startTransition] = React.useTransition()


  const form = useForm<Inputs>({
    resolver: zodResolver(melaSchema),
  })


  function onSubmit(data: Inputs) {
    startTransition(async () => {
      console.log(data)
      try {
        await updateMelaAction({
          ...data,
         },{_id:props._id})
         
          toast.success("Mela topped up successfully.")
          form.reset()
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem className="w-full">
          <FormLabel>Mela</FormLabel>
          <FormControl>
            <Input
              type="number"
              inputMode="numeric"
              placeholder="Type product inventory here."
              defaultValue={props.count}
              {...form.register("count", {
                valueAsNumber: true,
              })}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.count?.message}
          />
        </FormItem>
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Fill Mela
          <span className="sr-only">Fill Mela</span>
        </Button>
      </form>
    </Form>
  )
}
