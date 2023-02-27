import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a o componente App', () => {
  it('Verica se o texto dos links estão certos', () => {
    renderWithRouter(<App />);

    const appLinks = screen.getAllByRole('link');

    expect(appLinks[0]).toHaveTextContent('Home');
    expect(appLinks[1]).toHaveTextContent('About');
    expect(appLinks[2]).toHaveTextContent('Favorite Pokémon');
  });

  it('Verifica se os links estão redirecionando corretamente', () => {
    const { history } = renderWithRouter(<App />);
    // const { location: { pathname } } = history;

    const appLinks = screen.getAllByRole('link');

    const homeLink = appLinks[0];
    const aboutLink = appLinks[1];
    const favoriteLink = appLinks[2];

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    act(() => {
      history.push('/url-desconhecida');
    });

    const NotFoundText = screen.getByText('Page requested not found');

    expect(NotFoundText).toBeInTheDocument();
  });
});
