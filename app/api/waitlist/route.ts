import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const waitlistSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos'),
  userType: z.string().min(1, 'Selecciona un tipo de usuario')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = waitlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, userType } = validation.data;

    // Insertar en Supabase
    const { data, error } = await db
      .from('waitlist_subscribers')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          user_type: userType
        }
      ])
      .select();

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      return NextResponse.json(
        { error: 'Error al guardar los datos', details: error.message },
        { status: 500 }
      );
    }

    console.log('Nuevo suscriptor en la lista de espera:', data);

    return NextResponse.json(
      { message: '¡Gracias por unirte a nuestra lista de espera!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en el registro de la lista de espera:', error);
    
    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud', 
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      },
      { status: 500 }
    );
  }
}
