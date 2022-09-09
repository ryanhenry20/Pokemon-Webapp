import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import InfiniteScroll from 'react-infinite-scroll-component'

const useStyles = makeStyles(() => ({
	pokemon: {
		justifyContent: 'center',
		textAlign: 'center',
	},
}))

const Pokemon = ({ data, pokemonDetail }) => {
	const classes = useStyles()
	const [result, setResult] = useState(data)
	const [pokemon, setPokemon] = useState(pokemonDetail)
	console.log('Data', data)
	console.log('pokemonDetail', pokemonDetail)

	const fetchPokemon = async () => {
		console.log('next', data && data.next)

		setTimeout(async () => {
			const res = await fetch(result.next)
			const dataPokemon = await res.json()
			setResult(dataPokemon)
			const pokemonDetail = await Promise.all(
				dataPokemon.results.map(async (pokemon) => {
					const res = await fetch(pokemon.url)
					const pokemonData = await res.json()
					setPokemon((pokemon) => [...pokemon, pokemonData])
					return pokemonData
				})
			)
			return pokemonDetail
		}, 1000)
	}

	const fetchPokemonMemo = useMemo(() => fetchPokemon, [pokemon])

	const renderListPokemon = (data) => {
		return data.map((pokemon, index) => {
			return (
				<Grid item xs={8} sm={3} key={index}>
					<div className="pokemon">
						<div className="pokemon__image">
							<Image
								src={pokemon.sprites.other.dream_world.front_default}
								alt="Picture of the author"
								width={200}
								height={200}
							/>
						</div>
						<div className="pokemon__name">
							<p>{pokemon.name}</p>
						</div>
					</div>
				</Grid>
			)
		})
	}

	return (
		<InfiniteScroll
			dataLength={pokemon.length}
			next={fetchPokemonMemo}
			hasMore={true}
			loader={<h4>Loading...</h4>}
		>
			<Grid
				container
				className={classes.pokemon}
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 2, sm: 8, md: 12 }}
			>
				{renderListPokemon(pokemon)}
			</Grid>
		</InfiniteScroll>
	)
}

export default Pokemon
