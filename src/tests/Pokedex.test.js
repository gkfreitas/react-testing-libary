import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a o componente Pokedex', () => {
  const textIdName = 'pokemon-name';
  const textIdNext = 'next-pokemon';
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const encounteredH2 = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(encounteredH2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByTestId(textIdNext);
    const pokemonName = screen.getByTestId(textIdName);
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toHaveTextContent('Próximo Pokémon');

    expect(pokemonName).toHaveTextContent('Pikachu');

    for (let i = 0; i < pokemonList.length; i += 1) {
      expect(screen.getByTestId(textIdName)).toHaveTextContent(pokemonList[i].name);
      userEvent.click(nextButton);
    }
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId(textIdName);
    const nextButton = screen.getByTestId(textIdNext);

    for (let i = 0; i < pokemonList.length; i += 1) {
      expect(pokemonName).toHaveLength(1);
      expect(screen.getByTestId(textIdName)).toHaveTextContent(pokemonList[i].name);
      userEvent.click(nextButton);
    }
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    for (let i = 0; i < pokemonTypes.length; i += 1) {
      expect(filterButton[i]).toHaveTextContent(pokemonTypes[i]);

      const typeElement = screen.getByTestId('pokemon-type');

      userEvent.click(filterButton[i]);
      expect(typeElement).toHaveTextContent(pokemonTypes[i]);

      const buttonAll = screen.getByRole('button', { name: 'All' });
      userEvent.click(buttonAll);
      const nextButton = screen.getByTestId(textIdNext);
      expect(nextButton).not.toHaveAttribute('disabled');
    }
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const nextButton = screen.getByTestId(textIdNext);

    for (let i = 0; i < pokemonList.length; i += 1) {
      const pokemonName = screen.getAllByTestId(textIdName);
      expect(pokemonName).toHaveLength(1);
      expect(screen.getByTestId(textIdName)).toHaveTextContent(pokemonList[i].name);
      userEvent.click(nextButton);
    }
  });
});
