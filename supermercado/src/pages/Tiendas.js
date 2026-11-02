function Tiendas() {
  return (
    <main className="contenido pagina-informativa">
      <p className="etiqueta">ESTAMOS CERCA DE TI</p>
      <h1>Nuestras tiendas</h1>
      <p className="descripcion">
        Visítanos en nuestras sucursales. Estos datos son de ejemplo para el
        proyecto académico.
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

export default Tiendas;