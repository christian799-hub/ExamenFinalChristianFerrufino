export interface FacturarPayload {
  cliente: {
    nit: string;
    razonSocial: string;
    tipoDoc: string;
    correo: string;
    metodoPago: string;
  };
  articulos: Array<{
    id: string;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    total: number;
  }>;
  cufdUsado: string;
  totalFinal: number;
  fechaEmision: string;
}