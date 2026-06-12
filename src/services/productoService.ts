import type { Producto } from '../types/Producto';
import type { ApiResponse } from '../types/responses';


export const productoService = {
  getAll: async (): Promise<ApiResponse<Producto[]>> => {
    const response = await fetch(`http://localhost/api/get_productos.php`);
    
    const rawText = await response.text();
    
    try {
      return JSON.parse(rawText) as ApiResponse<Producto[]>;
    } catch (error) {
      console.error("Error crudo del servidor:", rawText);
      throw new Error("El servidor devolvió un error al cargar los productos.");
    }
  },
  
  
};