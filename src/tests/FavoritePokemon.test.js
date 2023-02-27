import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a o componente FavoritePokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notPokemonFound = screen.getByText('No favorite Pokémon found');
    expect(notPokemonFound).toBeInTheDocument();
  });

  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });

    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteInput).toBeInTheDocument();
    userEvent.click(favoriteInput);
    act(() => {
      history.push('/favorites');
    });

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
