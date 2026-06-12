import type { Producto } from "./Producto";

export interface ItemCarrito extends Producto {
  cantidad: number;
  descuento: number;
  total: number;
}