import {FC, ReactNode} from 'react';

import Head from 'next/head';

import { Navbar } from '../ui';

interface Props {
  title?: string,
  children: ReactNode
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout:FC<Props> = ({children, title}) => {

  return (
    <>
        <Head>
            <title>{title || 'PokemonApp'}</title>
            <meta name='author' content='Anthony Moreno' />
            <meta name='description' content={`Informacion sobre el pokemon ${ title }`} />
            <meta name='keywords' content={`${title}, pokemon, pokedex`} />

            <meta property="og:title" content={`${ title } information`} />
            <meta property="og:description" content={`this is the page about ${ title }`} />
            <meta property="og:image" content={`${ origin }/img/banner.png`} />
        </Head>
        <Navbar />
        <main style={{
          padding: '0px 20px'
        }}>
            {children}
        </main>
    </>
  )
}
