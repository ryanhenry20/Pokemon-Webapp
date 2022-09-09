import React from 'react'
import Pokemon from '../modules/Pokemon'

const PokemonPage = ({ allPokemon, allPokemonDetail }) => {
	return <Pokemon data={allPokemon} pokemonDetail={allPokemonDetail} />
}

export default PokemonPage

export async function getServerSideProps() {
	try {
		const resAllPokemon = await fetch(
			'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=1'
		)

		const allPokemon = await resAllPokemon.json()

		const allPokemonDetail = await Promise.all(
			allPokemon.results.map(async (allPokemon) => {
				const resPokemon = await fetch(allPokemon.url)
				const pokemonData = await resPokemon.json()
				return pokemonData
			})
		)

		console.log('All Pokemon Data', allPokemonDetail)

		console.log('allPokemon', allPokemon)

		return {
			props: {
				allPokemon,
				allPokemonDetail,
			},
		}
	} catch (error) {
		return {
			props: {
				data: [],
			},
		}
	}
}
