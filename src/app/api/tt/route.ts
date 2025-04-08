import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Received data:', body)
    const { tt, customerPhone } = body

    const newTT = await prisma.ttinformation.create({
      data: {
        tt,
        customerPhone,
      },
    })

    return NextResponse.json(newTT, { status: 201 })
  } catch (error) {
    console.error('Create TT error:', error)
    return NextResponse.json({ error: 'Failed to create TT' }, { status: 500 })
  }
}


export async function GET() {
    try {
      const allTT = await prisma.ttinformation.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            location: true,
        },
      })
      return Response.json(allTT)
    } catch (error) {
      console.error('Fetch TT error:', error)
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
      })
    }
  }