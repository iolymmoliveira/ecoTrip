import { NextRequest, NextResponse } from 'next/server';

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
  try {
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

    if (!response.ok) {
      throw new Error(`Nominatim respondeu com status ${response.status}`);
    }

    const data: NominatimResult[] = await response.json();

    const results = data.map((item) => ({
      id: `osm-${item.place_id}`,
      text: item.display_name,
      lat: Number(item.lat),
      lng: Number(item.lon),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('[location-search] erro ao consultar Nominatim:', error);

    return NextResponse.json(
      {
        message: 'Erro ao consultar serviço de localização',
      },
      {
        status: 500,
      },
    );
  }
}
