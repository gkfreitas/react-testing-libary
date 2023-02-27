import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testes para a o About', () => {
  it('Verifica se as informações sobre a pokedex está sendo renderizadas corretamente', () => {
    renderWithRouter(<About />);

    const pokedexInfoText1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const pokedexInfoText2 = 'One can filter Pokémon by type, and see more details for each one of them';
    const pokedexInfo1 = screen.getByText(pokedexInfoText1);
    const pokedexInfo2 = screen.getByText(pokedexInfoText2);

    expect(pokedexInfo1).toBeInTheDocument();
    expect(pokedexInfo2).toBeInTheDocument();

    const pokedexHeading = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(pokedexHeading).toBeInTheDocument();

    const pokedexImage = screen.getByRole('img');
    const urlImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage).toHaveAttribute('src', urlImage);
  });
});
