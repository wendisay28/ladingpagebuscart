import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const artistSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos'),
  tipoArtista: z.string().min(1, 'Selecciona un tipo de artista'),
  experiencia: z.string().min(1, 'Indica tus años de experiencia'),
  redes: z.string().optional(),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = artistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { email, nombre, telefono, tipoArtista, experiencia, redes, mensaje } = validation.data;

    // Insertar en Supabase
    const { data, error } = await db
      .from('artistas')
      .insert([
        {
          email,
          nombre,
          telefono,
          tipo_artista: tipoArtista,
          experiencia: parseInt(experiencia),
          redes_sociales: redes || null,
          mensaje,
          fecha_registro: new Date().toISOString()
        },
      ])
      .select();

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      return NextResponse.json(
        { error: 'Error al guardar los datos', details: error.message },
        { status: 500 }
      );
    }

    console.log('Nuevo artista registrado:', data);

    return NextResponse.json(
      { message: '¡Gracias por registrarte! Pronto nos pondremos en contacto contigo.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en el registro de artista:', error);
    
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
