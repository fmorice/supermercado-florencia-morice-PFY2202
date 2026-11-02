import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { InventarioProvider } from './context/InventarioContext';

function renderApp() {
  return render(
    <InventarioProvider>
      <App />
    </InventarioProvider>
  );
}

test('mantiene las páginas iniciales y muestra los seis artículos', () => {
  renderApp();

  expect(screen.getByRole('heading', { name: /bienvenido a supermercado/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /nuestras tiendas/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contáctanos/i })).toBeInTheDocument();
  expect(screen.getByText('Pan integral')).toBeInTheDocument();
  expect(screen.getByText('Soprole')).toBeInTheDocument();
});

test('agrega artículos al inventario global desde el formulario', () => {
  renderApp();

  fireEvent.click(screen.getByRole('link', { name: /ingresar artículos/i }));
  fireEvent.change(screen.getByLabelText(/nombre del artículo/i), {
    target: { value: 'Avena' },
  });
  fireEvent.change(screen.getByLabelText('Marca'), {
    target: { value: 'GranCampo' },
  });
  fireEvent.mouseDown(screen.getByRole('combobox', { name: /tipo o categoría/i }));
  fireEvent.click(screen.getByRole('option', { name: 'Abarrotes' }));
  fireEvent.change(screen.getByLabelText('Precio'), {
    target: { value: '1590' },
  });
  fireEvent.change(screen.getByLabelText('Stock'), {
    target: { value: '14' },
  });
  fireEvent.click(screen.getByRole('button', { name: /guardar artículo/i }));

  expect(screen.getByText(/artículo agregado correctamente/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/nombre del artículo/i)).toHaveValue('');

  fireEvent.click(screen.getByRole('link', { name: /^inventario$/i }));
  expect(screen.getByRole('table', { name: /artículos del inventario/i })).toBeInTheDocument();
  expect(screen.getByText('Avena')).toBeInTheDocument();
  expect(screen.getByText('GranCampo')).toBeInTheDocument();
});
