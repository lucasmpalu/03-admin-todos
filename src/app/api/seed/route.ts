// ESTO SERÍA UN ENDPOINT
import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany() //delete * from todo
    // - TODO viene de prisma/scheme.prisma
    // const todo = await prisma.todo.create({
    //     data: {description: 'Piedra del alma',
    //             complete: true},
    // })

    await prisma.todo.createMany({
        data: [
            {description: 'Piedra del alma', complete: true},
            {description: 'Piedra del poder'},
            {description: 'Piedra del tiempo'},
            {description: 'Piedra del espacio'},
            {description: 'Piedra de la realidad'},
        ]
    })

 

  return new Response(JSON.stringify({
    message: 'Seed Executed'
  }), { status: 200 } );
}