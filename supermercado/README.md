# Supermercado - Desarrollo Frontend II

## Descripción

Aplicación web desarrollada con React para administrar el inventario de un supermercado. El proyecto forma parte de la asignatura **Desarrollo Frontend II**.

La interfaz permite consultar el inventario y gestionar artículos desde distintas páginas. Las sucursales y los datos de contacto son ejemplos utilizados con fines académicos.

## Funcionalidades

- Página de inicio con un resumen del inventario.
- Visualización de productos y sus niveles de stock.
- Sección Nuestras tiendas con información de ejemplo sobre dos sucursales.
- Sección Contáctanos con información de contacto de ejemplo.
- Formulario para ingresar nuevos artículos, con validación de campos obligatorios.
- Tabla para visualizar todos los artículos registrados.
- Actualización del inventario compartido entre el formulario y las páginas.
- Persistencia de los artículos mediante `localStorage`.
- Navegación entre las secciones con React Router DOM.
- Diseño adaptable a pantallas de computador y dispositivos móviles.

## Tecnologías utilizadas

- React.
- JavaScript.
- React Router DOM para la navegación.
- React Context API para la gestión del estado global.
- `useState` y `useContext`.
- Material UI para los componentes visuales.
- CSS para los estilos.
- `localStorage` para conservar los datos en el navegador.

## Gestión del inventario

React Context API comparte los artículos entre el formulario de ingreso y la página de inventario. Los cambios se guardan en `localStorage`, por lo que los artículos se conservan después de recargar el navegador en el mismo dispositivo y navegador.

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

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Publicación

El proyecto está configurado para GitHub Pages en la siguiente dirección:

[https://fmorice.github.io/supermercado-florencia-morice-PFY2202/](https://fmorice.github.io/supermercado-florencia-morice-PFY2202/)

## Observaciones

Los datos se guardan localmente en el navegador y no en una base de datos ni en un servidor. El inventario guardado no se comparte entre dispositivos o navegadores.

Asignatura: Desarrollo Frontend II
