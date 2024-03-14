// ESTO SERÍA UN ENDPOINT
import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    //ACÁ CON PRISMA ESTOY RECUPERANDO TODA LA INFORMACIÓN DE LA BASE DE DATOS
  const todos = await prisma.todo.findMany()

  return new Response(JSON.stringify({
    todos
  }), { status: 200 } );
}