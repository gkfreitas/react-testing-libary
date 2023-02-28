import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a pagina NotFound', () => {
  it('Testa se os elementos estão sendo renderizados corretamente', () => {
    renderWithRouter(<NotFound />);

    const errorMessage = 'Page requested not found';
    const errorElement = screen.getByRole('heading', { name: errorMessage });

    expect(errorElement).toBeInTheDocument();

    const imgElement = screen.getByRole('img');
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgElement).toHaveAttribute('src', imgSource);
  });
});
