import { NextPage, GetStaticProps } from 'next'

import { pokeApi } from '../api';
import { Grid } from '@nextui-org/react';
import { Layout } from '../components/layouts/Layout';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { PokemonCard } from '../components/pokemon';
interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Pokemon List'>
      <Grid.Container gap={2} justify='flex-start'>
      {
        pokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps:GetStaticProps =  async(ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151')

  const pokemons = data.results.map((pokemon, idx) => ({
    name: pokemon.name,
    id: idx + 1,
    url: pokemon,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
  }))

  return {
    props: {
      pokemons: pokemons
    }
  }
}


export default HomePage
