import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import { skip } from 'node:test';
import * as yup from 'yup'


// 🟢 El método GET se utiliza para recuperar datos de un servidor, mientras que el método POST se utiliza para enviar datos al servidor para crear o actualizar recursos. 
// 🟢 GET se utiliza para solicitar información,
// 🟢 mientras que POST se utiliza para enviar información, como formularios o datos de entrada, al servidor.


// localhost:3000/api/todos?take=10&skip=0 --> ejemplo de un endpoint acá
export async function GET(request: Request) { 


    const { searchParams } = new URL(request.url)
    
    //🟢 aquí voy a obtener el parametro opcional (que puede ser por ej, la cantidad de pokemones -limit y offset por ej-)
    //🟢 siempre lo que viene como parametro de una url será string
    const take = Number(searchParams.get('take') ?? '10') // el o '10' es porque sino también podría ser null lo que viene como respuesta
    const skip = Number(searchParams.get('skip') ?? '0')
 
    //esto es por ejemplo, si una persona en vez de un numero, me manda letras, lo voy a chequear
    if(isNaN(take || skip)) {
        return NextResponse.json({message: 'Take y Skip tienen que ser un numero'}, {status: 400})
    }

    //acá estoy recuperando los 'todo' de la base de datos
    // - TODO viene de prisma/scheme.prisma
    // take y skip como llaves acá, es una opción que nos da prisma y el mismo nos hará el trabajo de agarrar la cantidad de take y saltear la cantidad de skip
    // take será la cantidad de objetos que traerá y skip son los que salteará en la lista de objetos
    const todos = await prisma.todo.findMany({
        skip, take
        // el + take te lo convierte en numero, esto es por si yo no lo hubiese convertido en numero arriba
        // take: +take,
        // skip: +skip
    })

    return new Response(JSON.stringify({
    todos
  }), { status: 200 } );
}



// En general, las solicitudes POST suelen llevar un cuerpo (body) en la solicitud, 
// ya que se utilizan para enviar datos al servidor. En el contexto de una API REST,
// el cuerpo de una solicitud POST suele contener los datos que se desean agregar al servido
export async function POST(request: Request) { 

    const postSchema = yup.object({
        description: yup.string().required(),
        complete: yup.boolean().optional().default(false),
        
    })

    try {

        const body = await postSchema.validate(await request.json()) 

        const { description, complete } = body
        //FORMA DE MANDAR UN BODY, data: --> es obligatorio
        const todo = prisma.todo.create({data:  body })

        //el segundo parametro es el estado, obligatorio poner status:
        return new Response(JSON.stringify({
            body
          }), { status: 200 } );

    } catch(error){
        return new Response(JSON.stringify({
            error
          }), { status: 400 } );
    }

}