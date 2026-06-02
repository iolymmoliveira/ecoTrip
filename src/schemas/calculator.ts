import { z } from 'zod';

export const locationSchema = z.object({
  address: z.string().min(1, 'O endereço é obrigatório'),
  latitude: z.number(),
  longitude: z.number(),
});

export const calculatorSchema = z.object({
  mode: z.enum(['simple', 'custom']),
  origin: locationSchema.nullable().refine((val) => val !== null, {
    message: 'Selecione uma origem válida utilizando o mapa ou autocomplete',
  }),
  destination: locationSchema.nullable().refine((val) => val !== null, {
    message: 'Selecione um destino válido utilizando o mapa ou autocomplete',
  }),
  passengers: z
    .number()
    .int()
    .min(1, 'Pelo menos 1 passageiro')
    .max(100, 'Máximo de 100 passageiros'),
  distanceOverride: z
    .number()
    .min(0, 'A distância não pode ser negativa')
    .optional(),
});

export type LocationData = z.infer<typeof locationSchema>;
export type CalculatorInputs = z.infer<typeof calculatorSchema>;
