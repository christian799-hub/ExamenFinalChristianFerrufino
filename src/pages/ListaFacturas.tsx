import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Anular, Editar } from '../components/Icons';
import { facturaService } from '../services/facturaService';
import './ListaFacturas.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'



const ListaFacturas = () => {
  
  const [facturas, setFacturas] = useState<any[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<any>(null);
  const [editNit, setEditNit] = useState('');
  const [editRazonSocial, setEditRazonSocial] = useState('');

  const { user } = useAuth();
  const esAdmin = user?.rol === 'Administrador';

  // Consumo api Facturas

  useEffect(() => {
    const fetchFacturas = async () => {

        const response = await fetch('https://backendexamentecweb2.onrender.com/get_facturas.php');
        const result = await response.json();

        if (result.success) {
          setFacturas(result.data);
        } 
    };

    fetchFacturas();
  }, []);

  // Anular Facturas

  const handleAnular = async (id: number) => {
    const confirmar = window.confirm("¿Está seguro que desea anular esta factura?");
    if (!confirmar) return;

    try {
      const result = await facturaService.anular(id);

      if (result.success) {
        alert("Factura anulada correctamente.");
        setFacturas(prevFacturas => 
          prevFacturas.map(factura => 
            factura.id === id ? { ...factura, estado: 'Anulado' } : factura
          )
        );
      } else {
        alert("No se pudo anular: " + result.message);
      }
    } catch (error) {
      alert("Error de red al intentar anular la factura.");
      console.error(error);
    }
  };

  // Editar Facturas

  const handleEditar = (fila: any) => {
    setFacturaSeleccionada(fila);
    setEditNit(fila.nit);
    setEditRazonSocial(fila.razonSocial);
    setModalAbierto(true);
  };

  // --- FUNCIÓN GUARDAR EDICIÓN ---
  const handleGuardarEdicion = async () => {
    if (!facturaSeleccionada) return;

    const payloadModificar = {
      accion: 'modificar' as const,
      id: facturaSeleccionada.id,
      cliente: {
        nit: editNit,
        razonSocial: editRazonSocial,
        tipoDoc: facturaSeleccionada.tipoDoc || 1, 
        correo: facturaSeleccionada.correo || '',
        metodoPago: facturaSeleccionada.metodoPago || 1
      },
      totalFinal: facturaSeleccionada.total, 
      articulos: [], 
      cufdUsado: '', 
      fechaEmision: '' 
    };

    try {
      const result = await facturaService.modificar(payloadModificar);

      if (result.success) {
        alert("Factura actualizada correctamente.");
        setFacturas(prevFacturas => 
          prevFacturas.map(f => 
            f.id === facturaSeleccionada.id 
              ? { ...f, nit: editNit, razonSocial: editRazonSocial } 
              : f
          )
        );
        setModalAbierto(false); 
      } else {
        alert("No se pudo actualizar: " + result.message);
      }
    } catch (error) {
      alert("Error de red al intentar actualizar.");
    }
  };

  // Estados 

  const getEstadoClass = (estado: string) => {
    switch (estado.toLowerCase()) {
      case 'aceptado': return 'status-aceptado';
      case 'pendiente': return 'status-pendiente';
      case 'anulado': return 'status-anulado';
      default: return '';
    }
  };

  return (
    <>
      <Helmet>

        <title>Lista de Facturas Ferretería América</title>

        <meta
          name="description"
          content="Lista de Facturacion Ferreteria America."
        />

        <meta
          name="keywords"
          content="React, JavaScript, frontend, desarrollo web, facturacion, Ferreteria, Lista Facturacion"
        />

        <meta
          name="author"
          content="Christian Ferrufino"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Lista Facturacion Ferretería America"
        />

        <meta
          property="og:description"
          content="Facturas de la Ferreteria America."
        />

        <meta
          property="og:type"
          content="website"
        />
        
      </Helmet>

      <div className="page-container">
        
        {/* Encabezado superior */}
        <div className="page-header">
          <div>
            <span className="recorrido">Pages / Lista Facturas</span>
            <h1 className="page-titulo">Lista Facturas</h1>
          </div>
          {esAdmin &&(
          <Link to="/facturar" className="btn-add">
            Agregar Factura
          </Link>
          )}
        </div>

        {/* Ttabla */}
        <div className="table-card">
          <h2 className="card-titulo">Ventas Realizadas</h2>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Nro VENTA </th>
                <th>FECHA </th>
                <th>CI/NIT </th>
                <th>RAZON SOCIAL </th>
                <th>ESTADO </th>
                <th>SUB TOTAL </th>
                <th>TOTAL </th>
                {esAdmin &&(
                <th>ACCIONES</th>
                )}
              </tr>
            </thead>
            <tbody>
              {facturas.map((row) => {

                return (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.fecha}</td>
                    <td>{row.nit}</td>
                    <td>{row.razonSocial}</td>
                    <td>
                      <span className={`status-badge ${getEstadoClass(row.estado)}`}>
                        {row.estado}
                      </span>
                    </td>
                    <td>{row.subTotal}</td>
                    <td>{row.total}</td>
                    <td>
                      {esAdmin &&(
                      <div className="acciones">
                        <>
                          <button className="action-btn" title="Editar" onClick={ () => handleEditar(row)}>
                            <Editar />
                             <span className="action-text">Editar</span>
                            </button>

                            <button className="action-btn delete" title="Eliminar" onClick={() => handleAnular(row.id)}> 
                              <Anular/>
                              <span className="action-text">Anular</span>
                            </button>            
                            </>
                      </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- VENTANA MODAL DE EDICIÓN --- */}
      {modalAbierto &&  esAdmin &&(
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Factura #{facturaSeleccionada?.id}</h3>
            
            <div className="modal-form">
              <label>
                CI/NIT:
                <input 
                  type="text" 
                  value={editNit} 
                  onChange={(e) => setEditNit(e.target.value)} 
                />
              </label>
              
              <label>
                Razón Social:
                <input 
                  type="text" 
                  value={editRazonSocial} 
                  onChange={(e) => setEditRazonSocial(e.target.value)} 
                />
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setModalAbierto(false)}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleGuardarEdicion}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListaFacturas;