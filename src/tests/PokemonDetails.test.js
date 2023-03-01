import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a pagina PokemonDetails', () => {
  const { name, summary, foundAt } = pokemonList[0];
  const detailsPage = '/pokemon/25';
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(detailsPage);
    });

    const pokemonName = screen.getByText(`${name} Details`);
    expect(pokemonName).toBeVisible();

    const linkToDetails = screen.queryByText('More details');
    expect(linkToDetails).not.toBeInTheDocument();

    const summaryH2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryH2).toBeInTheDocument();

    const resumeSummary = screen.getByText(summary);
    expect(resumeSummary).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(detailsPage);
    });
    const locationsH2 = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationsH2).toBeInTheDocument();

    for (let i = 0; i < foundAt.length; i += 1) {
      const { location, map } = foundAt[i];

      const locationImg = screen.getAllByAltText(`${name} location`);
      expect(locationImg[i]).toBeInTheDocument();
      expect(locationImg[i]).toHaveAttribute('src', map);

      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
    }
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(detailsPage);
    });
    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toBeVisible();

    userEvent.click(favoriteCheck);
    expect(favoriteIcon).not.toBeVisible();
  });
});
