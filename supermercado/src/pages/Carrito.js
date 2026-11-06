import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Alert,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { useInventario } from '../context/InventarioContext';

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);

function Carrito() {
  const {
    articulos,
    carrito,
    aumentarCantidadCarrito,
    disminuirCantidadCarrito,
    eliminarDelCarrito,
  } = useInventario();
  const [mensajeError, setMensajeError] = useState('');

  const lineasConArticulo = carrito
    .map((linea) => ({
      ...linea,
      articulo: articulos.find((item) => item.id === linea.idArticulo),
    }))
    .filter((linea) => linea.articulo);

  const totalCompra = lineasConArticulo.reduce(
    (total, linea) => total + linea.articulo.precio * linea.cantidad,
    0
  );
  const hayReferenciasInvalidas = lineasConArticulo.length !== carrito.length;

  const mostrarResultado = (resultado) => {
    setMensajeError(
      resultado.ok ? '' : resultado.motivo || 'No se pudo actualizar el carrito.'
    );
  };

  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">COMPRA</p>
      <h1>Mi carrito</h1>

      {mensajeError && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          {mensajeError}
        </Alert>
      )}

      {hayReferenciasInvalidas && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          No se encontraron los datos de uno o más artículos del carrito.
        </Alert>
      )}

      {carrito.length === 0 ? (
        <Paper className="inventario-vacio" elevation={0}>
          <Typography>No hay productos en tu carrito.</Typography>
          <Button
            component={NavLink}
            to="/"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#174d38',
              '&:hover': { backgroundColor: '#103d2b' },
            }}
          >
            Volver al inicio
          </Button>
        </Paper>
      ) : (
        <>
          <TableContainer component={Paper} className="tabla-material">
            <Table aria-label="Productos en mi carrito" sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell align="right">Precio unitario</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lineasConArticulo.map(({ idArticulo, cantidad, articulo }) => (
                  <TableRow key={idArticulo} hover>
                    <TableCell component="th" scope="row">
                      {articulo.nombre}
                    </TableCell>
                    <TableCell>{articulo.marca}</TableCell>
                    <TableCell align="right">
                      {formatearPrecio(articulo.precio)}
                    </TableCell>
                    <TableCell align="center">{cantidad}</TableCell>
                    <TableCell align="right">
                      {formatearPrecio(articulo.precio * cantidad)}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <IconButton
                          aria-label={`Disminuir cantidad de ${articulo.nombre}`}
                          size="small"
                          onClick={() =>
                            mostrarResultado(
                              disminuirCantidadCarrito(idArticulo, 1)
                            )
                          }
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label={`Aumentar cantidad de ${articulo.nombre}`}
                          size="small"
                          onClick={() =>
                            mostrarResultado(
                              aumentarCantidadCarrito(idArticulo, 1)
                            )
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label={`Eliminar ${articulo.nombre} del carrito`}
                          size="small"
                          onClick={() =>
                            mostrarResultado(eliminarDelCarrito(idArticulo))
                          }
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper
            className="tarjeta-resumen"
            elevation={0}
            sx={{ mt: 3, ml: 'auto', maxWidth: 360 }}
          >
            <Typography component="h2" variant="h6">
              Total de la compra
            </Typography>
            <Typography component="p" variant="h5" color="#174d38">
              {formatearPrecio(totalCompra)}
            </Typography>
          </Paper>
        </>
      )}
    </main>
  );
}

export default Carrito;
