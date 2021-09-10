import { Seller } from "./seller"

export type SaleSum = {
  seller: string;
  sum_amount: number;
}

export type SaleSuccess = {
  seller: string;
  sum_visited: number;
  sum_deals: number;
}

export type Sale = {
  id: number;
  seller: string;
  date: string;
  svisited: number;
  sdeals: number;
  samount: number;
}

export type SalePage = {
  content: Sale[];
  count: number;
  next_page: number | null;
  current_page: number;
  previous_page: number | null;
  total_pages: number;
  limit: number;
}