import { createContext, useContext, useEffect, useState } from 'react';

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

function cargarArticulos() {
  if (typeof window === 'undefined') return articulosIniciales;

  try {
    const inventarioGuardado = window.localStorage.getItem(CLAVE_INVENTARIO);
    if (inventarioGuardado === null) return articulosIniciales;

    const articulosGuardados = JSON.parse(inventarioGuardado);
    return Array.isArray(articulosGuardados)
      ? articulosGuardados
      : articulosIniciales;
  } catch {
    return articulosIniciales;
  }
}

export function InventarioProvider({ children }) {
  const [articulos, setArticulos] = useState(cargarArticulos);

  useEffect(() => {
    try {
      window.localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(articulos));
    } catch {
      // La aplicación sigue funcionando aunque el navegador bloquee el almacenamiento.
    }
  }, [articulos]);

  const agregarArticulo = (articulo) => {
    setArticulos((actuales) => {
      const siguienteId = Math.max(0, ...actuales.map(({ id }) => Number(id) || 0)) + 1;
      return [...actuales, { ...articulo, id: siguienteId }];
    });
  };

  return (
    <InventarioContext.Provider value={{ articulos, agregarArticulo }}>
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