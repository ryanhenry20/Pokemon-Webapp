import React from 'react'
import Pokemon from '../modules/Pokemon/index'

const Index = ({ allPokemon, allPokemonDetail, typePokemon }) => {
	return (
		<Pokemon
			data={allPokemon}
			pokemonDetail={allPokemonDetail}
			typePokemon={typePokemon}
		/>
	)
}

export default Index

export async function getServerSideProps() {
	try {
		const resAllPokemon = await fetch(
			'https://pokeapi.co/api/v2/pokemon/?limit=25&offset=0'
		)

		const allPokemon = await resAllPokemon.json()

		const allPokemonDetail = await Promise.all(
			allPokemon.results.map(async (allPokemon) => {
				const resPokemon = await fetch(allPokemon.url)
				const pokemonData = await resPokemon.json()
				return pokemonData
			})
		)

		const resTypePokemon = await fetch('https://pokeapi.co/api/v2/type')
		const typePokemon = await resTypePokemon.json()

		console.log('All Pokemon Data', allPokemonDetail)

		console.log('allPokemon', allPokemon)

		return {
			props: {
				allPokemon,
				allPokemonDetail,
				typePokemon: typePokemon.results,
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
