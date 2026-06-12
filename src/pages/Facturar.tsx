import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Facturar.css';
import type { Producto } from '../types/Producto';
import type { ItemCarrito } from '../types/ItemCarrito';
import { Eliminar } from '../components/Icons';
import { productoService } from '../services/productoService';
import { facturaService } from '../services/facturaService';


export default function Facturar() {
  // --- CLIENTE ---
  const [nit, setNit] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [tipoDoc, setTipoDoc] = useState("NIT");
  const [correo, setCorreo] = useState("");
  const [metodoPago, setMetodoPago] = useState("Efectivo");

  const [searchQuery, setSearchQuery] = useState("");

  // --- CARRITO ---
  const [cart, setCart] = useState<ItemCarrito[]>([]);
  

  // -- PRODUCTOS -- 
  const [productos, setProductos] = useState<Producto[]>([]);
  const [errorProductos, setErrorProductos] = useState("");


// Cargar productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const result = await productoService.getAll(); // Lee desde productoService
        if (result.success) {
          setProductos(result.data);
        } else {
          setErrorProductos("No se pudieron cargar los productos: " + result.message);
        }
      } catch (err: any) {
        setErrorProductos(err.message || "Error de red al conectar con el inventario.");
      }
    };

    cargarProductos();
  }, []);

  // Filtrado de productos 
  const productosFiltrados = productos.filter(prod => {
    if (!searchQuery.trim()) return false;
    
    return prod.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) || 
           prod.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Agregar producto o incrementar cantidad
  const handleAddProduct = (prod: Producto) => {
    setCart(prevCart => {
      const indiceExistente = prevCart.findIndex(item => item.id === prod.id);
      if (indiceExistente > -1) {
        return prevCart.map((item, idx) => idx === indiceExistente 
          ? { ...item, cantidad: item.cantidad + 1, total: ((item.cantidad + 1) * item.precio) }
          : item
        );
      }
      return [...prevCart, { ...prod, cantidad: 1, descuento: 0, total: prod.precio }];
    });
  };

  // Manejador unificado para mutaciones del carrito (Cantidad y Descuento)
  const updateCartItem = (id: string, updates: { cantidad?: number; descuento?: number }) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id !== id) return item;

      const nuevaCantidad = updates.cantidad !== undefined ? Math.max(1, updates.cantidad) : item.cantidad;
      
      const subtotal = nuevaCantidad * item.precio;

      return {
        ...item,
        cantidad: nuevaCantidad,
        descuento: 0,
        total: subtotal 
      };
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalFactura = cart.reduce((sum, item) => sum + item.total, 0);

  // Envío controlado de datos de facturación
  const handleFacturarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nit || !razonSocial || !tipoDoc || !metodoPago) return;
    
    if (cart.length === 0) {
      alert("Debe agregar al menos un artículo para poder facturar.");
      return;
    }

    // Para mandar Backend
    const payload = {
      cliente: { nit, razonSocial, tipoDoc, correo, metodoPago },
      articulos: cart.map(({ id, descripcion, cantidad, precio, descuento, total }) => ({
        id, descripcion, cantidad, precioUnitario: precio, descuento, total
      })),
      cufdUsado: "qwerty",
      totalFinal: totalFactura,
      fechaEmision: new Date().toISOString()
    };

    try {
          const result = await facturaService.crear(payload); // Leer desde FacturaService

          if (result.success) {
            alert(`¡Factura guardada exitosamente! Nro: ${result.factura_id}`);
            setCart([]);
            setNit("");
            setRazonSocial("");
            setCorreo("");
            setSearchQuery("");
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (error: any) {
          alert(error.message || "Ocurrió un error inesperado al facturar.");
        }
      };

  return (
    <>
      <Helmet>
        <title>Facturar | Ferretería América</title>
      </Helmet>

      <form className="facturacion-container" onSubmit={handleFacturarSubmit}>

        {/* RECUADRO DE DATOS DEL CLIENTE */}
        <div className="client-data-card">
          <div className="input-group">
            <label>NIT / Cédula <span className="required">*</span></label>
            <input type="text" required placeholder="1234567" value={nit} onChange={(e) => setNit(e.target.value)} />
          </div>
          <div className="input-group wide">
            <label>Cliente / Razón Social <span className="required">*</span></label>
            <input type="text" required placeholder="Nombre completo o razón social" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
          </div>
          <div className="input-group mid">
            <label>Tipo Documento <span className="required">*</span></label>
            <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
              { /* Tipos de Documentos de Identificacion */}
              <option value="NIT">NIT - Numero Identificacion Tributaria</option>
              <option value="CI">CI - Cédula de Identidad</option>
              <option value="CEX">CEX - Cédula Extranjera</option>
              <option value="PAS">PAS - Pasaporte</option>
              <option value="PAS">ODI - Otro Documento de Identidad</option>
            </select>
          </div>
          <div className="input-group wide">
            <label>Correo Electrónico <span className="optional">(Opcional)</span></label>
            <input type="email" placeholder="nombre@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <div className="input-group mid">
            <label>Método de Pago <span className="required">*</span></label>
            <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
              {/* Metodos de Pago */}
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta Débito/Crédito</option>
              <option value="Transferencia">Transferencia Bancaria</option>
              <option value="QR">Pago Simple QR</option>
            </select>
          </div>
        </div>

        <div className="facturacion-main-grid">
          
          {/* PANEL IZQUIERDO */}
          <div className="facturacion-card left-panel">
            <h3 className="panel-title">Búsqueda de Artículos</h3>
            
            <div className="search-control-wrapper">
              <input type="text" className="product-search-input" placeholder= "Buscar por nombre" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>

            {searchQuery.trim() !== "" ? (
              <div className="compact-table-container">
                {productosFiltrados.length > 0 ? (
                  <table className="compact-search-table">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>Unidad</th>
                        <th>Procedencia</th>
                        <th style={{ textAlign: 'right' }}>Precio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosFiltrados.map(prod => (
                        <tr key={prod.id} onClick={() => handleAddProduct(prod)} title="Haga clic para agregar al resumen">
                          <td className="compact-desc">{prod.descripcion}</td>
                          <td>{prod.unidad}</td>
                          <td>{prod.procedencia}</td>
                          <td style={{ textAlign: 'right', fontWeight: '600' }}>Bs {prod.precio.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-products-found">No se encontraron productos coincidentes.</div>
                )}
              </div>
            ) : (<div className="empty-search-placeholder">Escriba o escanee en el buscador superior para ver información de productos.</div>
            )}
          </div>

          {/* PANEL DERECHO */}
          <div className="facturacion-card right-panel">
            <h3 className="panel-title">Resumen de la Factura</h3>
            
            <div className="summary-table-wrapper">
              <table className="summary-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th style={{ width: '60px', textAlign: 'center' }}>Cant.</th>
                    <th style={{ width: '80px', textAlign: 'right' }}>P. Unit</th>
                    <th style={{ width: '90px', textAlign: 'right' }}>Total</th>
                    <th style={{ width: '40px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="cell-desc">{item.descripcion}</td>
                      <td style={{ textAlign: 'center' }}>
                        <input type="number" className="table-inline-input qty" min="1" value={item.cantidad} onChange={(e) => updateCartItem(item.id, { cantidad: parseInt(e.target.value) || 1 })} />
                      </td>
                      <td style={{ textAlign: 'right' }}>{item.precio.toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }} className="item-total-val">Bs. {item.total.toFixed(2)}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button type="button" className="btn-borrar-row" onClick={() => handleRemoveItem(item.id)} title="Eliminar artículo">
                          < Eliminar />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cart.length === 0 && (
                    <tr>
                      <td colSpan={6} className="empty-cart-msg">No hay artículos seleccionados en el resumen.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="invoice-total-box">
              <span>Total a Pagar:</span>
              <strong>Bs. {totalFactura.toFixed(2)}</strong>
            </div>

            <button type="submit" className="btn-submit-invoice">
              Facturar
            </button>
          </div>

        </div>
      </form>
    </>
  );
}