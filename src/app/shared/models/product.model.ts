import { HttpParams } from '@angular/common/http';

export interface Product {
  id: number;
  title: string;
}

export interface ProductRes {
  count: number;
  products: Product[];
}

export interface ProductQueryParams {
  collectionId?: number;
  metalId?: number;
  stoneId?: number;
  shapeId?: number;
  styleId?: number;
  take?: number;
  page?: number;
  orderBy?: 'minPrice' | 'createdAt' | 'title';
  order?: 'ASC' | 'DESC';
}
