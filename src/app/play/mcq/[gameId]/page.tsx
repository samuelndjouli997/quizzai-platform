import { prisma } from '@/lib/db'
import { getAuthSession } from '@/lib/nextauth'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params : {
        gameId: string
    
    }
}

const MCQPage = async ({params: { gameId }}: Props) => {
    const session = await getAuthSession();

    const game = await prisma.game.findUnique({
        where: {
            id: gameId
        },
        include: {
            questions: true
        }
    });

    if (!session?.user) {
        redirect('/');
    }
  return (
    <pre>{JSON.stringify(game, null, 2)}</pre>
  )
}

export default MCQPage