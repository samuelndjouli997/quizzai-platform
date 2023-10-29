import SignInButton from '@/components/SignInButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/nextauth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getAuthSession();

  if (session?.user) {
    // that means the user is logged in , so we redirect the user to dashboard
    redirect("/dashboard"); 
  }
  
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
       <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle>Welcome to QuizzAi</CardTitle>
          <CardDescription>
            QuizzAi is a quizz app that allows us you to create and share quizz with your friends.
          </CardDescription>  
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign in with Google" />
        </CardContent>
       </Card>
    </div>
  )
}
