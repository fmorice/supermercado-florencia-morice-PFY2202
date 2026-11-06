import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function MenuInferior() {
  return (
    <nav className="menu-inferior" aria-label="Navegación principal">
      <NavLink to="/" end>
        <span aria-hidden="true">⌂</span>
        Inicio
      </NavLink>
      <NavLink to="/tiendas">
        <span aria-hidden="true">⌖</span>
        Nuestras tiendas
      </NavLink>
      <NavLink to="/contacto">
        <span aria-hidden="true">✉</span>
        Contáctanos
      </NavLink>
      <NavLink to="/ingresar-articulo">
        <span aria-hidden="true">＋</span>
        Ingresar artículos
      </NavLink>
      <NavLink to="/inventario">
        <span aria-hidden="true">▤</span>
        Inventario
      </NavLink>
      <NavLink to="/carrito">
        <span aria-hidden="true">
          <ShoppingCartIcon fontSize="inherit" />
        </span>
        Carrito
      </NavLink>
    </nav>
  );
}

export default MenuInferior;