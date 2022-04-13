export interface Variant {
  id: number;
  title: string;
  description?: string;
  active?: boolean;
}

export interface VariantRes {
  [VariantType.METAL]: Variant[];
  [VariantType.STONE]: Variant[];
  [VariantType.SHAPE]: Variant[];
  [VariantType.STYLE]: Variant[];
}

export enum VariantType {
  SHAPE = 'shape',
  STONE = 'stone',
  METAL = 'metal',
  STYLE = 'style',
}
