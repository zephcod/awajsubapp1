'use client'
import appwriteAuthService from "@/db/appwrite_auth"
import appwriteDBService from "@/db/appwrite_db"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Shell } from "@/components/shells/shell"
import { useSearchParams } from 'next/navigation'
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useEffect, useState } from "react"
import { Models } from 'appwrite';
import { AwajUser } from "@/lib/validations/user"
import LoadingRouteUI2 from "@/components/loading/loading_route2"
import { formatDate } from "@/lib/utils"



const AccountPage = () => {
  const [user, setUser] = useState<AwajUser|null>(null)
  const [appuser, setAppUser] = useState<Models.Preferences|null>(null)
  let ver = false
  useEffect(()=>{
    (async () => {
      const iuser = await appwriteDBService.getUser()
      setUser(iuser)
      const iappuser = await appwriteAuthService.currentUser()
      setAppUser(iappuser)
      if (userId && secret) {
        await appwriteAuthService.confirmVerifyEmail(userId!,secret!)
        ver = true
      }
    })()
  },[])

  const urlParams = useSearchParams()
  const userId = urlParams.get('userId')
  const secret = urlParams.get('secret')

  if (!user||!appuser) {
    return (<LoadingRouteUI2/>);
  }
  return (
    <Shell variant="sidebar" className="max-w-4xl mx-auto p-4">
      { ver ?
      <div className="rounded-md bg-card p-4 max-w-2xl mx-auto">
      <p className="text-center text-3xl text-primary">Congratulations!</p>
      <p className="text-center">✨ Your account has been verified ✨</p>
      </div>
      :<></>
      }
      <div className="flex flex-row justify-start gap-8 items-center">
      <Header
        title="Account"
        description="Manage your account settings."
        size="sm"
        />
      <Link href="/account/edit">
        <div
          className={buttonVariants({
            variant:'outline',
            size: "sm",
          })}
          >
          <Icons.edit className="m-2"/>
          Edit
          <span className="sr-only">Edit Account</span>
        </div>
      </Link>
      </div>
      <div className="max-w-3xl flex-col flex gap-3 p-4 ring-1 ring-border rounded-md">
      <p className="text-lg font-semibold text">Personal Info:</p>
        <div className="pl-2 flex flex-col gap-3 text-base text-muted-foreground">
          <Avatar>
            <AvatarImage src={user?.profilePic} alt={user?.name}/>
            <AvatarFallback><Icons.user2/></AvatarFallback>
          </Avatar>
          <p>Name:{' '}{user?.name}</p>
          <p>Email:{' '}{user?.email}</p>
          <p>Phone:{' '}{user?.phone}</p>
        </div>
      </div>
      <div className="max-w-3xl flex-col flex gap-3 p-4 ring-1 ring-border rounded-md">
      <p className="text-lg font-semibold text">Preferences:</p>
        <div className="pl-2 flex flex-col gap-3 text-base text-muted-foreground">
          <p>App:{' '}</p>
          <p>Website:{' '}</p>
          <p>Desktop:{' '}</p>
        </div>
      </div>
      <div className="max-w-3xl flex-col flex gap-3 p-4 ring-1 ring-border rounded-md">
      <p className="text-lg font-semibold text">Stats:</p>
        <div className="pl-2 flex flex-col gap-3 text-base text-muted-foreground">
          <p>Member since:{' '}{ formatDate(appuser?.$createdAt) }</p>
          <p>Last login:{' '}{ formatDate(appuser?.accessedAt) }</p>
          <div className="flex flex-col md:flex-row gap-2 pl-2 md:pl-0 items-baseline">
            <p>Verification:{' '}</p>
              <div className="flex flex-row gap-3"><p>Email: </p>{appuser?.emailVerification?<p>✔️</p>:<p>❌</p>}</div>
              <div className="flex flex-row gap-3"><p>Phone: </p>{appuser?.phoneVerification?<p>✔️</p>:<p>❌</p>}</div>
            {appuser?.emailVerification && appuser?.phoneVerification ?<></>:
            <Link href="/signup/verify" className="text-card-foreground underline-offset-4 transition-colors hover:underline">
                Verify now 🡥
            </Link>}
          </div>
          <p>Memberships:{' '}{appuser?.labels}</p>
        </div>
      </div>
      <Link href="/account/logout" className="relative w-fit">
        <div
          className={buttonVariants({
            variant:'destructive',
            size: "lg",
          })}
          >
          <Icons.logout className="m-2"/>
          Log Out
          <span className="sr-only">Log Out</span>
        </div>
      </Link>
    </Shell>
  )
}

export default AccountPage