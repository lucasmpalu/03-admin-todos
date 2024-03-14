import prisma from '@/app/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

interface Segments {
    params: {
        id: string
    }
}

// localhost:3000/api/todos/elIdQueLePase
//SEGMENTS ME VA A DEVOLVER LOS PARAMS, ACÁ COMO ES ID, SI CONSOLEO SEGMENTS (PUEDE TENER CUALQUIER NOMBRE ESE SEGUNDO PARAMETRO)
//SI LO CONSOLEO SEGMENTS.PARAMS ME VA A DEVOLVER {'id': 'el parametro que reciba x url'}
export async function GET(request: Request, segments: Segments) { 

    const { id } = segments.params

    const todos = await prisma.todo.findMany()

    const itemFound = todos.find((item) => (item.id == id))

    if(itemFound !== undefined) {
        return new Response(JSON.stringify({
            itemFound        
        }), { status: 200 } );
    } else {
        return new Response(JSON.stringify({
            message: 'Id no encontrado'
        }), { status: 404 } );
    }


}
//🟢🔴🟡 UTILIZANDO EN VEZ DE FINDMANY, USO FINDFIRST
// export async function GET(request: Request, segments: Segments) { 
//     const { id } = segments.params;

//     //Utilizamos findFirst() en lugar de findMany()
//     const itemFound = await prisma.todo.findFirst({
//         where: {
//             id: id,
//         },
//     });

//     if (itemFound !== null) {
//         return new Response(JSON.stringify({
//             itemFound        
//         }), { status: 200 });
//     } else {
//         return new Response(JSON.stringify({
//             message: 'Id no encontrado'
//         }), { status: 404 });
//     }
// }
