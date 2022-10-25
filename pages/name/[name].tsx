
import { useEffect, useState } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Grid, Card, Button, Text, Container, Image } from '@nextui-org/react';
import { Layout } from '../../components/layouts/';
import { getPokemonInfo, localFavorites } from '../../utils';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import confetti from 'canvas-confetti';
import pokeApi from '../../api/pokeApi';

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage:NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState( false )

    const onToggleFavorite = () => {
      console.log(pokemon)
      localFavorites.toggleFavorite( pokemon.id )
      setIsInFavorites(!isInFavorites)

      if(!isInFavorites) {
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin:{
            x: 1,
            y: 0
          }
        })
      }

    }

    useEffect(() => {
      setIsInFavorites( localFavorites.existInFavorites(pokemon.id))
    }, [])
    
  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
          <Grid xs={ 12 } sm={ 4 } >
            <Card isHoverable css={{ padding: '30px'}}>
              <Card.Body>
                <Card.Image
                  src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                  alt={ pokemon.name }
                  width='100%'
                  height={ 200 } 
                />
              </Card.Body>

            </Card>
          </Grid>

          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
                <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                <Button
                  color='gradient'
                  ghost={ !isInFavorites }
                  onClick={onToggleFavorite}
                >
                  {
                    isInFavorites ? 'En Favoritos' : 'Guardar en favoritos'
                  }
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction='row' display='flex' gap={ 0 }>
                  <Image
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.front_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

    return {
        paths: data.results.map(({ name }) => ({
            params: {
                name
            }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string }

    const pokemon = await getPokemonInfo(name)

    if( !pokemon ) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400
    }
}


export default PokemonByNamePage 
