import { NextRequest, NextResponse } from 'next/server';
import { ExternalApiError } from '@/lib/errors';
import {
  captureException,
  trackExternalService,
  traceAsync,
} from '@/lib/observability';

export const revalidate = 3600;

type NominatimResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
};

const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 10;

export async function GET(request: NextRequest) {
  return traceAsync(
    'api.locationSearch',
    async () => {
      const searchParams = request.nextUrl.searchParams;
      const query = searchParams.get('q')?.trim();
      const countries = searchParams.get('countries')?.trim();

      if (!query || query.length < 3) {
        return NextResponse.json([], {
          status: 200,
        });
      }

      const limitParam = Number(searchParams.get('limit'));

      const limit =
        Number.isFinite(limitParam) && limitParam > 0
          ? Math.min(limitParam, MAX_LIMIT)
          : DEFAULT_LIMIT;

      const nominatimParams = new URLSearchParams({
        q: query,
        format: 'jsonv2',
        addressdetails: '1',
        limit: String(limit),
      });

      if (countries) {
        nominatimParams.set(
          'countrycodes',
          countries
            .split(',')
            .map((country) => country.trim().toLowerCase())
            .join(','),
        );
      }

      const start = performance.now();
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${nominatimParams.toString()}`,
        {
          headers: {
            'User-Agent': 'EcoTrip (https://ecotrip.vercel.app)',
            Accept: 'application/json',
          },
          next: {
            revalidate: 60 * 60,
          },
        },
      );
      trackExternalService(
        'Nominatim',
        response.status,
        performance.now() - start,
        { query, countries },
      );

      if (!response.ok) {
        throw new ExternalApiError(
          `Nominatim respondeu com status ${response.status}`,
          'Nominatim',
          response.status,
          { query, countries },
        );
      }

      const data: NominatimResult[] = await response.json();

      const results = data.map((item) => ({
        id: `osm-${item.place_id}`,
        text: item.display_name,
        lat: Number(item.lat),
        lng: Number(item.lon),
      }));

      return NextResponse.json(results);
    },
    { source: 'location-search' },
  ).catch((error) => {
    captureException(error, {
      tags: { route: 'location-search' },
    });

    return NextResponse.json(
      {
        message: 'Erro ao consultar serviço de localização',
      },
      {
        status: 500,
      },
    );
  });
}
