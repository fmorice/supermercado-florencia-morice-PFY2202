import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Alert, Button, Paper, TextField } from '@mui/material';
import { useInventario } from '../context/InventarioContext';

function DetalleArticulo() {
  const { id } = useParams();
  const { articulos, agregarAlCarrito } = useInventario();
  const [cantidad, setCantidad] = useState('1');
  const [mensaje, setMensaje] = useState(null);
  const idArticulo = Number(id);
  const articulo = articulos.find((item) => item.id === idArticulo);

  if (!articulo) {
    return (
      <main className="contenido pagina-informativa">
        <p className="etiqueta">INVENTARIO</p>
        <h1>Artículo no encontrado</h1>
        <p className="descripcion">
          No encontramos un artículo con el identificador solicitado.
        </p>
        <NavLink className="boton-inicio" to="/">
          Volver al inicio
        </NavLink>
      </main>
    );
  }

  const agregarArticuloAlCarrito = (evento) => {
    evento.preventDefault();
    const cantidadSolicitada = Number(cantidad);

    if (!Number.isInteger(cantidadSolicitada) || cantidadSolicitada <= 0) {
      setMensaje({
        tipo: 'error',
        texto: 'Ingresa una cantidad entera mayor que cero.',
      });
      return;
    }

    if (cantidadSolicitada > articulo.stock) {
      setMensaje({
        tipo: 'error',
        texto: 'La cantidad no puede superar el stock disponible.',
      });
      return;
    }

    const resultado = agregarAlCarrito(articulo.id, cantidadSolicitada);
    if (resultado.ok) {
      setMensaje({ tipo: 'success', texto: 'Artículo agregado al carrito.' });
      setCantidad('1');
      return;
    }

    setMensaje({
      tipo: 'error',
      texto: resultado.motivo || 'No se pudo agregar el artículo al carrito.',
    });
  };

  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">DETALLE DEL PRODUCTO</p>
      <h1>{articulo.nombre}</h1>

      <Paper
        component="section"
        className="tarjeta"
        elevation={0}
        aria-label={`Detalle de ${articulo.nombre}`}
      >
        <p>
          <strong>Marca:</strong> {articulo.marca}
        </p>
        <p>
          <strong>Tipo o categoría:</strong> {articulo.tipo}
        </p>
        <p>
          <strong>Precio:</strong> ${articulo.precio.toLocaleString('es-CL')} CLP
        </p>
        <p>
          <strong>Stock disponible:</strong> {articulo.stock}
        </p>

        <form
          onSubmit={agregarArticuloAlCarrito}
          style={{ display: 'grid', gap: 22, maxWidth: 760, marginTop: 25 }}
        >
          <TextField
            label="Cantidad"
            type="number"
            value={cantidad}
            onChange={(evento) => {
              setCantidad(evento.target.value);
              setMensaje(null);
            }}
            slotProps={{
              htmlInput: { min: 1, max: articulo.stock, step: 1 },
            }}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={articulo.stock === 0}
            sx={{
              backgroundColor: '#174d38',
              '&:hover': { backgroundColor: '#103d2b' },
            }}
          >
            Agregar al carrito
          </Button>
        </form>

        {mensaje && (
          <Alert severity={mensaje.tipo} role="status" sx={{ mt: 2 }}>
            {mensaje.texto}
          </Alert>
        )}
      </Paper>

      <NavLink className="enlace-inventario" to="/inventario">
        Volver al inventario
      </NavLink>
    </main>
  );
}

export default DetalleArticulo;
