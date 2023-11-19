"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { toast } from "sonner"
import { type z } from "zod"
import { catchError, isArrayOfFile } from "@/lib/utils"
import { faqIdSchema, faqSchema, faqSuggestSchema, faqTagSchema } from "@/lib/validations/faq"
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

import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"
import {addFaqAction, updateFaqAction} from '@/app/_actions/faqs'


type Inputs = z.infer<typeof faqSchema>
type TagFaq = z.infer<typeof faqTagSchema>
type Id = z.infer<typeof faqIdSchema>
type Suggestion = z.infer<typeof faqSuggestSchema>

export function EditFaqForm (props:Inputs & TagFaq & Id & Suggestion) {
  const [elected, setElected] = React.useState(props.tags);
  const [isPending, startTransition] = React.useTransition()
  const suggestions = props.suggest

  const onAdd = React.useCallback(
    (newTag: Tag ) => {
      setElected([...elected, newTag])
    },
    [elected]
  )

  const onDelete = React.useCallback(
    (tagIndex: number) => {
      setElected(elected.filter((_, i) => i !== tagIndex))
    },
    [elected]
  )

  const form = useForm<Inputs & TagFaq>({
    resolver: zodResolver(faqSchema)
  })

  function onSubmit(data: Inputs & TagFaq) {
    startTransition(async () => {
      if (!props.question) {
        try {
          await addFaqAction({
            ...data, tags:elected,
           })
              toast.success("Faq created successfully.")
              form.reset()
          }   catch (err) {
              catchError(err)
          }
      }
     else {try {
        await updateFaqAction({
          ...data, tags:elected,
         },{_id:props._id})
            toast.success("Faq updated successfully.")
            form.reset()
        }   catch (err) {
            catchError(err)
        }}
        })
    }


  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormItem>
          <FormLabel>Question</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type question here."
              defaultValue={props.question}
              {...form.register("question")}
              />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.question?.message}
            />
        </FormItem>
        <FormItem>
          <FormLabel>Answer</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Type answer here."
              defaultValue={props.answer}
              {...form.register("answer")}
              />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.answer?.message}
            />
        </FormItem>
          <ReactTags
            labelText="Tags"
            allowNew
            classNames={{
              root: 'flex flex-row items-start',
              rootIsActive: 'is-active',
              rootIsDisabled: 'is-disabled',
              rootIsInvalid: 'is-invalid',
              label: 'mx-2',
              tagList: 'flex flex-row',
              tagListItem: 'mx-2 py-1 px-2 rounded-full ring-1',
              tag: '',
              tagName: 'react-tags__tag-name',
              comboBox: 'rounded-lg py-1 px-2 bg-secondary grow ring-1',
              input: 'bg-transparent grow outline-none',
              listBox: 'flex relative grow flex-col',
              option: 'hover:bg-muted hover:cursor-pointer',
              optionIsActive: 'react-tags__listbox-option',
              highlight: 'bg-primary',
            }}
            selected={elected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching tags" />
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
            />
            )}
          {!props.question ?('Add'):('Update')}
          <span className="sr-only">Enter</span>
        </Button>
      </form>
    </Form>
    )
  }
