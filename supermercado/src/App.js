
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

const productos = [
  { id: 1, nombre: 'Arroz', categoria: 'Abarrotes', precio: 1290, stock: 25 },
  { id: 2, nombre: 'Leche', categoria: 'Lácteos', precio: 1190, stock: 18 },
  { id: 3, nombre: 'Pan integral', categoria: 'Panadería', precio: 1990, stock: 12 },
  { id: 4, nombre: 'Manzanas', categoria: 'Frutas y verduras', precio: 1590, stock: 30 },
  { id: 5, nombre: 'Aceite', categoria: 'Abarrotes', precio: 2490, stock: 4 },
  { id: 6, nombre: 'Yogur', categoria: 'Lácteos', precio: 890, stock: 2 },
];

function Inicio() {
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
          <strong>{productos.length}</strong>
        </article>
        <article className="tarjeta-resumen">
          <span>Unidades disponibles</span>
          <strong>{productos.reduce((total, p) => total + p.stock, 0)}</strong>
        </article>
        <article className="tarjeta-resumen">
          <span>Productos con poco stock</span>
          <strong>{productos.filter((p) => p.stock <= 5).length}</strong>
        </article>
      </section>

      <section className="seccion-productos">
        <h2>Inventario de productos</h2>
        <p className="descripcion">Listado de productos registrados en el supermercado.</p>

        <div className="tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>${producto.precio.toLocaleString('es-CL')}</td>
                  <td>{producto.stock}</td>
                  <td>
                    <span className={producto.stock <= 5 ? 'estado bajo' : 'estado disponible'}>
                      {producto.stock <= 5 ? 'Stock bajo' : 'Disponible'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Tiendas() {
  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">ESTAMOS CERCA DE TI</p>
      <h1>Nuestras tiendas</h1>
      <p className="descripcion">
        Visítanos en nuestras sucursales. Estos datos son de ejemplo para el proyecto académico.
      </p>

      <div className="tarjetas-tiendas">
        <article className="tarjeta">
          <div className="icono-tienda">🏪</div>
          <h2>Local Centro</h2>
          <p>Dirección: Avenida Principal 123</p>
          <p>Horario: lunes a sábado, 09:00 a 20:00</p>
        </article>

        <article className="tarjeta">
          <div className="icono-tienda">🛒</div>
          <h2>Local Norte</h2>
          <p>Dirección: Calle Los Aromos 456</p>
          <p>Horario: lunes a domingo, 09:00 a 21:00</p>
        </article>
      </div>
    </main>
  );
}

function Contacto() {
  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">ESTAMOS PARA AYUDARTE</p>
      <h1>Contáctanos</h1>
      <p className="descripcion">
        Si tienes consultas sobre nuestros productos o tiendas, puedes comunicarte con nosotros.
      </p>

      <section className="tarjeta contacto">
        <p><strong>Correo:</strong> contacto@supermercado.cl</p>
        <p><strong>Teléfono:</strong> +56 2 2345 6789</p>
        <p><strong>Horario de atención:</strong> lunes a viernes, 09:00 a 18:00</p>
        <p className="nota">Información de ejemplo para esta actividad académica.</p>
      </section>
    </main>
  );
}

function NoEncontrada() {
  return (
    <main className="contenido pagina-informativa">
      <h1>Página no encontrada</h1>
      <p>La dirección que ingresaste no existe.</p>
      <NavLink className="boton-inicio" to="/">Volver al inicio</NavLink>
    </main>
  );
}

function MenuInferior() {
  return (
    <nav className="menu-inferior" aria-label="Navegación principal">
      <NavLink to="/" end>
        <span>⌂</span>
        Inicio
      </NavLink>
      <NavLink to="/tiendas">
        <span>⌖</span>
        Nuestras tiendas
      </NavLink>
      <NavLink to="/contacto">
        <span>✉</span>
        Contáctanos
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="aplicacion">
        <header className="encabezado">
          <NavLink to="/" className="marca">
            <span className="marca-icono">S</span>
            <span>SuperMercado</span>
          </NavLink>
          <span className="texto-encabezado">Administración de inventario</span>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>

        <MenuInferior />
      </div>
    </BrowserRouter>
  );
}

export default App;
