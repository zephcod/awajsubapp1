import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { EmailItem } from './email-list'

interface EmailCardProps extends React.HTMLAttributes<HTMLDivElement> {
    template: EmailItem
    variant?: "default" | "switchable"
  }

export function EmailCard({template, variant = "default"}:EmailCardProps){
    return(
      <Card className="h-full overflow-hidden rounded-lg bg-accent shadow-sm hover:shadow-lg">
          <CardHeader>
  
          </CardHeader>
          <CardContent>
            <CardTitle>{template.name}</CardTitle>
            <CardDescription>{template.description} </CardDescription>
          </CardContent>
          <CardFooter className="p-4">
              <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
                <Link
                  aria-label="Preview product"
                  href={template.slug}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "h-8 w-full rounded-md",
                  })} >
                  Choose
                </Link>
                <Link
                  aria-label="Preview product"
                  href={template.slug}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "h-8 w-full rounded-md",
                  })} >
                  Edit
                </Link>
                </div>
          </CardFooter>
      </Card>
    )
  }