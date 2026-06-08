import { z } from 'zod';

export const locationSchema = z.object({
  address: z.string().min(1, 'O endereço é obrigatório'),
  latitude: z.number(),
  longitude: z.number(),
});

export const calculatorSchema = z
  .object({
    mode: z.enum(['simple', 'custom']),
    origin: locationSchema.nullable(),
    destination: locationSchema.nullable(),
    passengers: z.number().int().min(1, 'Pelo menos 1 passageiro'),
    weightPerPerson: z.number().optional(),
    luggageWeight: z.number().optional(),
    fuelType: z.string().optional(),
    currentTransport: z.string().optional(),
    compareTransport: z.boolean().optional(),
    comparisonTransports: z.array(z.string()).optional(),
    distanceOverride: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.origin) {
      ctx.addIssue({
        code: 'custom',
        path: ['origin'],
        message:
          'Selecione uma origem válida utilizando o mapa ou autocomplete',
      });
    }

    if (!data.destination) {
      ctx.addIssue({
        code: 'custom',
        path: ['destination'],
        message:
          'Selecione um destino válido utilizando o mapa ou autocomplete',
      });
    }
  });

export type LocationData = z.infer<typeof locationSchema>;
export type CalculatorInputs = z.infer<typeof calculatorSchema>;
