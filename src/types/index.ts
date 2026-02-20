export type Status = 'Concluído' | 'Pendente' | 'Cancelado';
export type Category =
  | 'Eletrônicos'
  | 'Vestuário'
  | 'Alimentos'
  | 'Serviços'
  | 'Software';
export type Region = 'Norte' | 'Sul' | 'Leste' | 'Oeste' | 'Centro';

export interface SaleRecord {
  id: string;
  date: string;
  category: Category;
  region: Region;
  salesperson: string;
  amount: number;
  status: Status;
}

export interface FilterState {
  dateFrom: string;
  dateTo: string;
  category: Category | 'Todas';
  region: Region | 'Todas';
  status: Status | 'Todos';
}

export interface MonthlyRevenue {
  month: string;
  receita: number;
  meta: number;
}

export interface CategoryData {
  name: string;
  valor: number;
  quantidade: number;
}

export interface StatusData {
  name: Status;
  value: number;
}
