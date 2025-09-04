import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = subscribeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, name, source } = validation.data;

    // For now, just log the subscription
    // TODO: Uncomment and implement database insertion when schema is ready
    /*
    await db.insert(subscribers).values({
      email,
      name: name || null,
      source: source || 'unknown',
    });
    */

    console.log('Nueva suscripción:', { email, name, source });

    return NextResponse.json(
      { message: '¡Gracias por suscribirte! Pronto te contactaremos.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en la suscripción:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Error al procesar la solicitud', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error desconocido al procesar la solicitud' },
      { status: 500 }
    );
  }
}
