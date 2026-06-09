import React from 'react';
import { Tv, BatteryCharging, ShoppingBag, Flame } from 'lucide-react';

interface EquivalencyListProps {
  co2Kg: number;
}

export const EquivalencyList: React.FC<EquivalencyListProps> = ({ co2Kg }) => {
  // Conversions:
  // - TV Hours: ~0.1 kg CO2 per hour
  // - Smartphone charges: ~0.008 kg CO2 per charge
  // - Plastic bags: ~0.033 kg CO2 per bag
  // - Gas burned equivalent: ~2.3 kg CO2 per liter of gasoline
  const tvHours = Math.round(co2Kg / 0.1);
  const phoneCharges = Math.round(co2Kg / 0.008);
  const plasticBags = Math.round(co2Kg / 0.033);
  const fuelLiters = (co2Kg / 2.3).toFixed(1);

  const items = [
    {
      label: 'Horas de TV ligada',
      value: tvHours.toLocaleString(),
      description: 'Tempo de uma TV LED de 32" funcionando continuamente.',
      icon: Tv,
    },
    {
      label: 'Cargas de smartphone',
      value: phoneCharges.toLocaleString(),
      description: 'Quantidade de ciclos completos de bateria carregada.',
      icon: BatteryCharging,
    },
    {
      label: 'Sacolas plásticas',
      value: plasticBags.toLocaleString(),
      description: 'Impacto equivalente à produção e descarte de sacolas.',
      icon: ShoppingBag,
    },
    {
      label: 'Gasolina consumida',
      value: `${fuelLiters} L`,
      description:
        'Combustível fóssil queimado diretamente para produzir esse CO₂.',
      icon: Flame,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl border border-(--border) bg-(--bg-card)">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-(--text-muted)">
          Equivalência Ecológica
        </h3>
        <p className="text-xs text-(--text-muted)">
          O que esse impacto representa em nosso cotidiano?
        </p>
      </div>

      <div className="grid gap-3.5 mt-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-(--bg-card-secondary)/30 border border-transparent transition-all"
            >
              <div className="p-2.5 rounded-lg bg-emerald-500/5 text-(--primary) border border-emerald-500/10">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-(--text-main)">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-(--text-main) -mt-0.5">
                  {item.label}
                </span>
                <span className="text-[11px] text-(--text-muted) mt-1 leading-normal">
                  {item.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
