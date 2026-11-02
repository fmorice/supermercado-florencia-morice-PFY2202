import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useInventario } from '../context/InventarioContext';

function Inventario() {
  const { articulos } = useInventario();

  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">GESTIÓN DE INVENTARIO</p>
      <h1>Inventario</h1>
      <p className="descripcion">
        Artículos disponibles y registrados en el supermercado.
      </p>

      {articulos.length === 0 ? (
        <Paper className="inventario-vacio" elevation={0}>
          <Typography>No hay artículos registrados en el inventario.</Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} className="tabla-material">
          <Table aria-label="Artículos del inventario">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Marca</TableCell>
                <TableCell>Tipo o categoría</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articulos.map((articulo) => (
                <TableRow key={articulo.id} hover>
                  <TableCell component="th" scope="row">
                    {articulo.nombre}
                  </TableCell>
                  <TableCell>{articulo.marca}</TableCell>
                  <TableCell>{articulo.tipo}</TableCell>
                  <TableCell align="right">
                    ${articulo.precio.toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell align="right">{articulo.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}

export default Inventario;