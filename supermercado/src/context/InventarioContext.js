import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

const InventarioContext = createContext(null);
const CLAVE_INVENTARIO = 'supermercado-inventario';

const articulosIniciales = [
  { id: 1, nombre: 'Arroz', marca: 'Miraflores', tipo: 'Abarrotes', precio: 1290, stock: 25 },
  { id: 2, nombre: 'Leche', marca: 'Colun', tipo: 'Lácteos', precio: 1190, stock: 18 },
  { id: 3, nombre: 'Pan integral', marca: 'Ideal', tipo: 'Panadería', precio: 1990, stock: 12 },
  { id: 4, nombre: 'Manzanas', marca: 'Huerto Fresco', tipo: 'Frutas y verduras', precio: 1590, stock: 30 },
  { id: 5, nombre: 'Aceite', marca: 'Chef', tipo: 'Abarrotes', precio: 2490, stock: 4 },
  { id: 6, nombre: 'Yogur', marca: 'Soprole', tipo: 'Lácteos', precio: 890, stock: 2 },
];

const estadoInicial = { articulos: articulosIniciales, carrito: [] };

function esObjetoValido(valor) {
  return valor !== null && typeof valor === 'object' && !Array.isArray(valor);
}

function sonDatosArticuloValidos(articulo) {
  if (!esObjetoValido(articulo)) return false;

  return (
    typeof articulo.nombre === 'string' &&
    articulo.nombre.trim() !== '' &&
    typeof articulo.marca === 'string' &&
    articulo.marca.trim() !== '' &&
    typeof articulo.tipo === 'string' &&
    articulo.tipo.trim() !== '' &&
    Number.isFinite(articulo.precio) &&
    articulo.precio >= 0 &&
    Number.isInteger(articulo.stock) &&
    articulo.stock >= 0
  );
}

function articulosValidos(articulos) {
  if (!Array.isArray(articulos)) return false;

  const todosValidos = articulos.every(
    (articulo) =>
      esObjetoValido(articulo) &&
      Number.isInteger(articulo.id) &&
      articulo.id > 0 &&
      sonDatosArticuloValidos(articulo)
  );
  if (!todosValidos) return false;

  const ids = articulos.map(({ id }) => id);
  return new Set(ids).size === ids.length;
}

function carritoValido(carrito, articulos) {
  if (!Array.isArray(carrito) || !articulosValidos(articulos)) return false;

  const todasLasLineasValidas = carrito.every(
    (linea) =>
      esObjetoValido(linea) &&
      Number.isInteger(linea.idArticulo) &&
      linea.idArticulo > 0 &&
      Number.isInteger(linea.cantidad) &&
      linea.cantidad > 0
  );
  if (!todasLasLineasValidas) return false;

  const idsArticulos = new Set(articulos.map(({ id }) => id));
  const idsCarrito = carrito.map(({ idArticulo }) => idArticulo);

  return (
    idsCarrito.every((idArticulo) => idsArticulos.has(idArticulo)) &&
    new Set(idsCarrito).size === idsCarrito.length
  );
}

function cargarEstadoInicial() {
  if (typeof window === 'undefined') return estadoInicial;

  try {
    const datosGuardados = window.localStorage.getItem(CLAVE_INVENTARIO);
    if (datosGuardados === null) return estadoInicial;

    const datos = JSON.parse(datosGuardados);

    // Los datos antiguos guardaban solamente el arreglo de artículos.
    if (Array.isArray(datos)) {
      return articulosValidos(datos)
        ? { articulos: datos, carrito: [] }
        : estadoInicial;
    }

    if (
      datos &&
      articulosValidos(datos.articulos) &&
      carritoValido(datos.carrito, datos.articulos)
    ) {
      return { articulos: datos.articulos, carrito: datos.carrito };
    }
  } catch {
    return estadoInicial;
  }

  return estadoInicial;
}

function resultadoFallido(estado, motivo) {
  return { estado, resultado: { ok: false, motivo } };
}

function aplicarAccion(estado, accion) {
  if (accion.type === 'AGREGAR_ARTICULO') {
    if (!sonDatosArticuloValidos(accion.articulo)) {
      return resultadoFallido(estado, 'Los datos del artículo no son válidos.');
    }

    const siguienteId =
      Math.max(0, ...estado.articulos.map(({ id }) => Number(id) || 0)) + 1;
    const articuloNuevo = { ...accion.articulo, id: siguienteId };

    return {
      estado: { ...estado, articulos: [...estado.articulos, articuloNuevo] },
      resultado: { ok: true, id: siguienteId },
    };
  }

  if (
    accion.type === 'AGREGAR_AL_CARRITO' ||
    accion.type === 'AUMENTAR_CANTIDAD'
  ) {
    const { idArticulo, cantidad } = accion;
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      return resultadoFallido(estado, 'La cantidad debe ser un entero positivo.');
    }

    const articulo = estado.articulos.find(({ id }) => id === idArticulo);
    if (!articulo) {
      return resultadoFallido(estado, 'El artículo no existe en el inventario.');
    }

    const lineaCarrito = estado.carrito.find(
      (linea) => linea.idArticulo === idArticulo
    );
    if (accion.type === 'AUMENTAR_CANTIDAD' && !lineaCarrito) {
      return resultadoFallido(estado, 'El artículo no está en el carrito.');
    }
    if (cantidad > articulo.stock) {
      return resultadoFallido(estado, 'No hay stock suficiente.');
    }

    const carrito = lineaCarrito
      ? estado.carrito.map((linea) =>
          linea.idArticulo === idArticulo
            ? { ...linea, cantidad: linea.cantidad + cantidad }
            : linea
        )
      : [...estado.carrito, { idArticulo, cantidad }];

    return {
      estado: {
        articulos: estado.articulos.map((item) =>
          item.id === idArticulo ? { ...item, stock: item.stock - cantidad } : item
        ),
        carrito,
      },
      resultado: { ok: true },
    };
  }

  if (accion.type === 'DISMINUIR_CANTIDAD') {
    const { idArticulo, cantidad } = accion;
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      return resultadoFallido(estado, 'La cantidad debe ser un entero positivo.');
    }

    const lineaCarrito = estado.carrito.find(
      (linea) => linea.idArticulo === idArticulo
    );
    if (!lineaCarrito) {
      return resultadoFallido(estado, 'El artículo no está en el carrito.');
    }
    if (cantidad > lineaCarrito.cantidad) {
      return resultadoFallido(
        estado,
        'La cantidad solicitada supera la cantidad del carrito.'
      );
    }

    const cantidadRestante = lineaCarrito.cantidad - cantidad;
    return {
      estado: {
        articulos: estado.articulos.map((articulo) =>
          articulo.id === idArticulo
            ? { ...articulo, stock: articulo.stock + cantidad }
            : articulo
        ),
        carrito:
          cantidadRestante === 0
            ? estado.carrito.filter((linea) => linea.idArticulo !== idArticulo)
            : estado.carrito.map((linea) =>
                linea.idArticulo === idArticulo
                  ? { ...linea, cantidad: cantidadRestante }
                  : linea
              ),
      },
      resultado: { ok: true },
    };
  }

  if (accion.type === 'ELIMINAR_DEL_CARRITO') {
    const lineaCarrito = estado.carrito.find(
      (linea) => linea.idArticulo === accion.idArticulo
    );
    if (!lineaCarrito) {
      return resultadoFallido(estado, 'El artículo no está en el carrito.');
    }

    return {
      estado: {
        articulos: estado.articulos.map((articulo) =>
          articulo.id === accion.idArticulo
            ? { ...articulo, stock: articulo.stock + lineaCarrito.cantidad }
            : articulo
        ),
        carrito: estado.carrito.filter(
          (linea) => linea.idArticulo !== accion.idArticulo
        ),
      },
      resultado: { ok: true },
    };
  }

  return { estado, resultado: { ok: false, motivo: 'Operación desconocida.' } };
}

function inventarioReducer(estado, accion) {
  return aplicarAccion(estado, accion).estado;
}

export function InventarioProvider({ children }) {
  const [estado, dispatch] = useReducer(
    inventarioReducer,
    undefined,
    cargarEstadoInicial
  );
  const estadoPendiente = useRef(estado);
  estadoPendiente.current = estado;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(estado));
    } catch {
      // La aplicación sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }, [estado]);

  const ejecutarAccion = (accion) => {
    const transicion = aplicarAccion(estadoPendiente.current, accion);
    if (!transicion.resultado.ok) return transicion.resultado;

    estadoPendiente.current = transicion.estado;
    dispatch(accion);
    return transicion.resultado;
  };

  const agregarArticulo = (articulo) =>
    ejecutarAccion({ type: 'AGREGAR_ARTICULO', articulo });

  const agregarAlCarrito = (idArticulo, cantidad = 1) =>
    ejecutarAccion({ type: 'AGREGAR_AL_CARRITO', idArticulo, cantidad });

  const aumentarCantidadCarrito = (idArticulo, cantidad = 1) =>
    ejecutarAccion({ type: 'AUMENTAR_CANTIDAD', idArticulo, cantidad });

  const disminuirCantidadCarrito = (idArticulo, cantidad = 1) =>
    ejecutarAccion({ type: 'DISMINUIR_CANTIDAD', idArticulo, cantidad });

  const eliminarDelCarrito = (idArticulo) =>
    ejecutarAccion({ type: 'ELIMINAR_DEL_CARRITO', idArticulo });

  return (
    <InventarioContext.Provider
      value={{
        articulos: estado.articulos,
        agregarArticulo,
        carrito: estado.carrito,
        agregarAlCarrito,
        aumentarCantidadCarrito,
        disminuirCantidadCarrito,
        eliminarDelCarrito,
      }}
    >
      {children}
    </InventarioContext.Provider>
  );
}

export function useInventario() {
  const contexto = useContext(InventarioContext);

  if (!contexto) {
    throw new Error('useInventario debe utilizarse dentro de InventarioProvider.');
  }

  return contexto;
}