import { useState } from 'react';
import { Alert, Button, MenuItem, Snackbar, TextField } from '@mui/material';
import { useInventario } from '../context/InventarioContext';

const formularioInicial = {
  nombre: '',
  marca: '',
  tipo: '',
  precio: '',
  stock: '',
};

const categorias = [
  'Abarrotes',
  'Lácteos',
  'Panadería',
  'Frutas y verduras',
  'Bebidas',
  'Congelados',
  'Otro',
];

function IngresarArticulo() {
  const { agregarArticulo } = useInventario();
  const [formulario, setFormulario] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [confirmacionAbierta, setConfirmacionAbierta] = useState(false);

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: '' }));
  };

  const guardarArticulo = (evento) => {
    evento.preventDefault();
    const nuevosErrores = {};

    ['nombre', 'marca', 'tipo', 'precio', 'stock'].forEach((campo) => {
      if (!String(formulario[campo]).trim()) {
        nuevosErrores[campo] = 'Este campo es obligatorio.';
      }
    });

    if (formulario.precio !== '' && Number(formulario.precio) < 0) {
      nuevosErrores.precio = 'El precio no puede ser negativo.';
    }
    if (formulario.precio !== '' && !Number.isFinite(Number(formulario.precio))) {
      nuevosErrores.precio = 'Ingresa un precio válido.';
    }
    if (formulario.stock !== '' && Number(formulario.stock) < 0) {
      nuevosErrores.stock = 'El stock no puede ser negativo.';
    }
    if (formulario.stock !== '' && !Number.isInteger(Number(formulario.stock))) {
      nuevosErrores.stock = 'El stock debe ser un número entero.';
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    agregarArticulo({
      nombre: formulario.nombre.trim(),
      marca: formulario.marca.trim(),
      tipo: formulario.tipo,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
    });
    setFormulario(formularioInicial);
    setConfirmacionAbierta(true);
  };

  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">GESTIÓN DE INVENTARIO</p>
      <h1>Ingresar artículo</h1>
      <p className="descripcion">
        Completa los datos para agregar un artículo al inventario.
      </p>

      <form className="formulario-articulo" onSubmit={guardarArticulo} noValidate>
        <div className="campos-formulario">
          <TextField
            label="Nombre del artículo"
            name="nombre"
            value={formulario.nombre}
            onChange={actualizarCampo}
            error={Boolean(errores.nombre)}
            helperText={errores.nombre}
            required
            fullWidth
          />
          <TextField
            label="Marca"
            name="marca"
            value={formulario.marca}
            onChange={actualizarCampo}
            error={Boolean(errores.marca)}
            helperText={errores.marca}
            required
            fullWidth
          />
          <TextField
            select
            label="Tipo o categoría"
            name="tipo"
            value={formulario.tipo}
            onChange={actualizarCampo}
            error={Boolean(errores.tipo)}
            helperText={errores.tipo}
            required
            fullWidth
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Precio"
            name="precio"
            type="number"
            value={formulario.precio}
            onChange={actualizarCampo}
            error={Boolean(errores.precio)}
            helperText={errores.precio}
            slotProps={{ htmlInput: { min: 0, step: 'any' } }}
            required
            fullWidth
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formulario.stock}
            onChange={actualizarCampo}
            error={Boolean(errores.stock)}
            helperText={errores.stock}
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
            required
            fullWidth
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#174d38', '&:hover': { backgroundColor: '#103d2b' } }}
        >
          Guardar artículo
        </Button>
      </form>

      <Snackbar
        open={confirmacionAbierta}
        autoHideDuration={4000}
        onClose={() => setConfirmacionAbierta(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setConfirmacionAbierta(false)}
          severity="success"
          variant="filled"
        >
          Artículo agregado correctamente al inventario.
        </Alert>
      </Snackbar>
    </main>
  );
}

export default IngresarArticulo;