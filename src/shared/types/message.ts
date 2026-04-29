import type { Product } from './product.ts'

export type Msg =
  | { kind: 'me'; text: string }
  | { kind: 'bot'; text: string }
  | { kind: 'system'; text: string }
  | { kind: 'product'; data: Product }
