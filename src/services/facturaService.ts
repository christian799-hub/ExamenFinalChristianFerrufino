import type { FacturaResponse } from '../types/responses';
import type { FacturarPayload } from '../types/FacturaPayload';

const API_URL = 'https://backendexamentecweb2.onrender.com/crud_factura.php';

export const facturaService = {
  crear: async (payload: FacturarPayload): Promise<FacturaResponse> => {
    const dataConAccion = { ...payload, accion: 'crear' };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(dataConAccion) 
    });

    return manejarRespuesta(response);
  },

  modificar: async (payload: FacturarPayload): Promise<FacturaResponse> => {
    const dataConAccion = { ...payload, accion: 'modificar' };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataConAccion),
    });
    
    return manejarRespuesta(response);
  },

  // 3. ANULAR
  anular: async (id: number): Promise<FacturaResponse> => {
    const payload = { accion: 'anular', id };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    return manejarRespuesta(response);
  }
};

const manejarRespuesta = async (response: Response): Promise<FacturaResponse> => {
  const rawText = await response.text();
  try {
    return JSON.parse(rawText) as FacturaResponse;
  } catch (error) {
    console.error("Error crudo del servidor:", rawText);
    throw new Error("El servidor devolvio un error inesperado.");
  }
};