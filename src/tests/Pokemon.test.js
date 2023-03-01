import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const { averageWeight, name, type, image, id } = pokemonList[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const pokemonAverageWeight = screen.getByTestId('pokemon-weight');

    const averageWeightText = `${averageWeight.value} ${averageWeight.measurementUnit}`;
    expect(pokemonAverageWeight).toHaveTextContent(averageWeightText);

    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toBeVisible();
    expect(pokemonImg).toHaveAttribute('src', image);

    const linkToDetails = screen.getByText('More details');
    expect(linkToDetails).toBeVisible();
    expect(linkToDetails).toHaveAttribute('href', `/pokemon/${id}`);

    userEvent.click(linkToDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemon/${id}`);

    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);

    const favoriteIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toBeVisible();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
