import { NextResponse } from 'next/server';
import { calculatorSchema } from '@/schemas/calculator';
import { calculateTripEmissions } from '@/lib/services/calculatorService';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = calculatorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Dados de entrada inválidos',
          details: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const result = calculateTripEmissions(parsed.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro na rota de cálculo:', error);
    return NextResponse.json(
      {
        error: 'Erro ao processar o cálculo da rota',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
