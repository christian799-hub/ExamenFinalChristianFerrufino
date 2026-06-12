export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface FacturaResponse {
  success: boolean;
  message: string;
  factura_id?: number;
}