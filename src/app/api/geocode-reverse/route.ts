import { NextRequest, NextResponse } from 'next/server';
import { ExternalApiError } from '@/lib/errors';
import {
  captureException,
  trackExternalService,
  traceAsync,
} from '@/lib/observability';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  return traceAsync(
    'api.geocodeReverse',
    async () => {
      const searchParams = request.nextUrl.searchParams;
      const lat = searchParams.get('lat');
      const lng = searchParams.get('lng');

      if (!lat || !lng) {
        return NextResponse.json(
          { message: 'Parâmetros lat e lng são obrigatórios' },
          { status: 400 },
        );
      }

      const start = performance.now();
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'EcoTrip (https://ecotrip.vercel.app)',
            Accept: 'application/json',
          },
        },
      );
      trackExternalService(
        'Nominatim',
        response.status,
        performance.now() - start,
        {
          lat,
          lng,
        },
      );

      if (!response.ok) {
        throw new ExternalApiError(
          `Nominatim respondeu com status ${response.status}`,
          'Nominatim',
          response.status,
          { lat, lng },
        );
      }

      const data = await response.json();

      return NextResponse.json({
        address: data.display_name,
      });
    },
    { source: 'geocode-reverse' },
  ).catch((error) => {
    captureException(error, {
      tags: { route: 'geocode-reverse' },
    });

    return NextResponse.json(
      { message: 'Erro no geocoding reverso' },
      { status: 500 },
    );
  });
}
