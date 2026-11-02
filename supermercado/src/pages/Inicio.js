import { NavLink } from 'react-router-dom';
import { useInventario } from '../context/InventarioContext';

function Inicio() {
  const { articulos } = useInventario();
  const unidadesDisponibles = articulos.reduce(
    (total, articulo) => total + articulo.stock,
    0
  );
  const articulosConPocoStock = articulos.filter(
    (articulo) => articulo.stock <= 5
  ).length;

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
              {articulos.map((articulo) => (
                <tr key={articulo.id}>
                  <td>{articulo.nombre}</td>
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
              ))}
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