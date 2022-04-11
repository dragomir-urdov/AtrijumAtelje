import { Product } from './product.model';

export interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  products: Product[];
}
