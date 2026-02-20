import type { SaleRecord, Category, Region, Status } from '../types';

const categories: Category[] = [
  'Eletrônicos',
  'Vestuário',
  'Alimentos',
  'Serviços',
  'Software',
];
const regions: Region[] = ['Norte', 'Sul', 'Leste', 'Oeste', 'Centro'];
const statuses: Status[] = ['Concluído', 'Pendente', 'Cancelado'];
const salespersons = [
  'Ana Lima',
  'Bruno Souza',
  'Carla Moreira',
  'Diego Santos',
  'Eliana Costa',
  'Felipe Ramos',
  'Gabriela Nunes',
  'Henrique Alves',
];

function generateDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

const SEED = 42;
let seedVal = SEED;
function seededNext() {
  seedVal = (seedVal * 1664525 + 1013904223) & 0xffffffff;
  return (seedVal >>> 0) / 0xffffffff;
}
function seededGetRandom<T>(arr: T[]): T {
  return arr[Math.floor(seededNext() * arr.length)];
}
function seededAmount(category: Category): number {
  const ranges: Record<Category, [number, number]> = {
    Eletrônicos: [800, 8000],
    Vestuário: [80, 600],
    Alimentos: [30, 400],
    Serviços: [200, 3000],
    Software: [500, 5000],
  };
  const [min, max] = ranges[category];
  return Math.round((seededNext() * (max - min) + min) * 100) / 100;
}

export const mockSales: SaleRecord[] = Array.from({ length: 240 }, (_, i) => {
  const category = seededGetRandom(categories);
  return {
    id: `VND-${String(i + 1).padStart(4, '0')}`,
    date: generateDate(Math.floor(seededNext() * 365)),
    category,
    region: seededGetRandom(regions),
    salesperson: seededGetRandom(salespersons),
    amount: seededAmount(category),
    status: seededGetRandom(statuses),
  };
}).sort((a, b) => b.date.localeCompare(a.date));

export const CATEGORIES: Array<Category | 'Todas'> = ['Todas', ...categories];
export const REGIONS: Array<Region | 'Todas'> = ['Todas', ...regions];
export const STATUSES: Array<Status | 'Todos'> = ['Todos', ...statuses];
