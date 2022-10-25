import { useState, useEffect } from 'react';
import { NextPage } from 'next';

import { Layout } from '../../components/layouts/Layout';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils';
import { FavoritePokemons } from '../../components/pokemon';

const FavoritesPage:NextPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])  

  return (
    <Layout title='Favorite - Pokemons'>

      {
        favoritePokemons.length === 0 
          ? ( <NoFavorites /> )
          : ( <FavoritePokemons favoritePokemons={favoritePokemons} /> )
      }
    </Layout>
  )
}

export default FavoritesPage