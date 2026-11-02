import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Contacto from './pages/Contacto';
import IngresarArticulo from './pages/IngresarArticulo';
import Inicio from './pages/Inicio';
import Inventario from './pages/Inventario';
import Tiendas from './pages/Tiendas';
import MenuInferior from './components/MenuInferior';
import './App.css';

function NoEncontrada() {
  return (
    <main className="contenido pagina-informativa">
      <h1>Página no encontrada</h1>
      <p>La dirección que ingresaste no existe.</p>
      <NavLink className="boton-inicio" to="/">
        Volver al inicio
      </NavLink>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="aplicacion">
        <header className="encabezado">
          <NavLink to="/" className="marca">
            <span className="marca-icono">S</span>
            <span>SuperMercado</span>
          </NavLink>

          <span className="texto-encabezado">
            Administración de inventario
          </span>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/tiendas" element={<Tiendas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/ingresar-articulo" element={<IngresarArticulo />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>

        <MenuInferior />
      </div>
    </BrowserRouter>
  );
}

export default App;
