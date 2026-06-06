import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
      return NextResponse.json(
        { message: 'Parâmetros lat e lng são obrigatórios' },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'EcoTrip (https://ecotrip.vercel.app)',
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Nominatim respondeu com status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      address: data.display_name,
    });
  } catch (error) {
    console.error('[geocode-reverse] Erro ao consultar Nominatim:', error);
    return NextResponse.json(
      { message: 'Erro no geocoding reverso' },
      { status: 500 },
    );
  }
}
