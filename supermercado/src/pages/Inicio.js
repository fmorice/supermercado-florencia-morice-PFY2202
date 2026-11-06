import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuItem, TextField } from '@mui/material';
import { useInventario } from '../context/InventarioContext';

function Inicio() {
  const { articulos } = useInventario();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const unidadesDisponibles = articulos.reduce(
    (total, articulo) => total + articulo.stock,
    0
  );
  const articulosConPocoStock = articulos.filter(
    (articulo) => articulo.stock <= 5
  ).length;
  const categorias = [...new Set(articulos.map((articulo) => articulo.tipo))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'es'));
  const articulosFiltrados = categoriaSeleccionada
    ? articulos.filter((articulo) => articulo.tipo === categoriaSeleccionada)
    : articulos;

  return (
    <main className="contenido">
      <section className="bienvenida">
        <p className="etiqueta">GESTIÓN DE INVENTARIO</p>
        <h1>¡Bienvenido a SuperMercado!</h1>
        <p>Revisa nuestros productos y consulta el stock disponible.</p>
      </section>

      <section className="resumen">
        <article className="tarjeta-resumen">
          <span>Productos registrados</span>
          <strong>{articulos.length}</strong>
        </article>
        <article className="tarjeta-resumen">
          <span>Unidades disponibles</span>
          <strong>{unidadesDisponibles}</strong>
        </article>
        <article className="tarjeta-resumen">
          <span>Productos con poco stock</span>
          <strong>{articulosConPocoStock}</strong>
        </article>
      </section>

      <section className="seccion-productos">
        <h2>Inventario de productos</h2>
        <p className="descripcion">
          Listado de productos registrados en el supermercado.
        </p>

        <TextField
          select
          label="Filtrar por categoría"
          value={categoriaSeleccionada}
          onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
          size="small"
          sx={{ width: { xs: '100%', sm: 320 }, mb: 2 }}
        >
          <MenuItem value="">Todas las categorías</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </TextField>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {articulosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} role="status">
                    {categoriaSeleccionada
                      ? `No se encontraron artículos en la categoría ${categoriaSeleccionada}.`
                      : 'No se encontraron artículos.'}
                  </td>
                </tr>
              ) : (
                articulosFiltrados.map((articulo) => (
                  <tr key={articulo.id}>
                    <td>
                      <NavLink
                        to={`/detalle/${articulo.id}`}
                        style={{
                          color: '#174d38',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                        }}
                      >
                        {articulo.nombre}
                      </NavLink>
                    </td>
                    <td>{articulo.marca}</td>
                    <td>{articulo.tipo}</td>
                    <td>${articulo.precio.toLocaleString('es-CL')}</td>
                    <td>{articulo.stock}</td>
                    <td>
                      <span
                        className={
                          articulo.stock <= 5
                            ? 'estado bajo'
                            : 'estado disponible'
                        }
                      >
                        {articulo.stock <= 5 ? 'Stock bajo' : 'Disponible'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <NavLink className="enlace-inventario" to="/inventario">
          Ver inventario completo
        </NavLink>
      </section>
    </main>
  );
}

export default Inicio;