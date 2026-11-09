# Supermercado - Desarrollo Frontend II

## Descripción

Aplicación web desarrollada con React para administrar el inventario de un supermercado. El proyecto forma parte de la asignatura **Desarrollo Frontend II**.

La aplicación permite registrar artículos, consultar el inventario, filtrar productos por categoría, revisar el detalle de cada artículo y gestionar un carrito de compras con actualización automática del stock disponible.

Las sucursales y los datos de contacto son ejemplos utilizados con fines académicos.

## Funcionalidades

### Gestión del inventario

- Página de inicio con un resumen del inventario.
- Visualización de los productos registrados con su nombre, marca, categoría, precio, stock y estado.
- Formulario para ingresar nuevos artículos, con validación de campos obligatorios.
- Tabla para visualizar todos los artículos registrados.
- Actualización del inventario compartido entre las distintas páginas.
- Persistencia de los datos mediante `localStorage`.

### Filtro por categoría

- Filtro dinámico que permite seleccionar una categoría y visualizar solamente los artículos correspondientes.
- Actualización de la visualización sin modificar ni perder los datos originales del inventario.
- Opción para volver a visualizar todos los artículos.

### Detalle de artículos

- Acceso a la pantalla de detalle al seleccionar un producto del inventario.
- Visualización del nombre, marca, categoría, precio y stock disponible.
- Selección de la cantidad de unidades que se desean agregar al carrito.
- Validación de la cantidad solicitada según el stock disponible.

### Carrito de compras

- Pantalla para visualizar los artículos agregados al carrito.
- Visualización de cantidades, precios, subtotales y total de la compra.
- Opción para aumentar o disminuir la cantidad de cada artículo.
- Opción para eliminar artículos del carrito.
- Actualización automática del inventario al agregar, aumentar, disminuir o eliminar productos.
- Validación para impedir que se agreguen cantidades superiores al stock disponible.

### Otras secciones

- Sección Nuestras tiendas con información de ejemplo sobre dos sucursales.
- Sección Contáctanos con información de contacto de ejemplo.
- Navegación entre las distintas secciones mediante React Router DOM.
- Diseño adaptable a pantallas de computador y dispositivos móviles.

## Tecnologías utilizadas

- **React:** desarrollo de la interfaz de usuario.
- **JavaScript:** lógica y funcionalidades de la aplicación.
- **React Router DOM:** navegación entre páginas y rutas de detalle.
- **React Context API:** gestión y distribución del estado global.
- **useState y useContext:** manejo y acceso al estado de los componentes.
- **useReducer:** gestión de las acciones del inventario y del carrito.
- **Material UI (MUI):** biblioteca de componentes visuales para React.
- **CSS:** estilos y presentación de la aplicación.
- **localStorage:** almacenamiento de los datos en el navegador.

## Gestión del inventario y del carrito

React Context API permite compartir el estado del inventario y del carrito entre las distintas páginas de la aplicación.

Mediante `useReducer` se gestionan las operaciones de agregar artículos, aumentar y disminuir cantidades y eliminar productos del carrito.

Cuando un artículo se agrega al carrito, las unidades disponibles se descuentan del inventario. Si se disminuye o elimina un producto del carrito, las unidades correspondientes se devuelven al stock.

Los datos se guardan en `localStorage`, permitiendo conservar el estado de la aplicación después de recargar la página en el mismo navegador y dispositivo.

## Instalación y ejecución

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/fmorice/supermercado-florencia-morice-PFY2202.git
   ```

2. Ingresa a la carpeta del proyecto React:

   ```bash
   cd supermercado-florencia-morice-PFY2202/supermercado
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

5. Abre en el navegador:

   `http://localhost:3000/supermercado-florencia-morice-PFY2202/`

## Publicación

El proyecto está publicado mediante GitHub Pages y se puede acceder desde la siguiente dirección:

https://fmorice.github.io/supermercado-florencia-morice-PFY2202/

## Repositorio

https://github.com/fmorice/supermercado-florencia-morice-PFY2202

## Observaciones

Los datos se guardan localmente en el navegador y no en una base de datos ni en un servidor. El inventario guardado no se comparte entre dispositivos o navegadores.

Asignatura: **Desarrollo Frontend II**.
