import React, { useState, useEffect, useMemo, useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import PopOver from '../../components/PopOver'

const Pokemon = ({ data, pokemonDetail }) => {
	// const classes = useStyles()
	const [result, setResult] = useState(data)
	const [pokemon, setPokemon] = useState(pokemonDetail)
	const [hoverPokemon, setHoverPokemon] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	// console.log('Data', data)
	// console.log('pokemonDetail', pokemonDetail)

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

	const handlePopoverOpen = (event, pokemon) => {
		setAnchorEl(event.currentTarget)
		setHoverPokemon(pokemon)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

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
								// onClick={handlePopoverOpen}
								onMouseEnter={(event) => handlePopoverOpen(event, pokemon)}
								onMouseLeave={handlePopoverClose}
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
		<>
			<InfiniteScroll
				dataLength={pokemon.length}
				next={fetchPokemonMemo}
				hasMore={true}
				loader={<h4>Loading...</h4>}
			>
				<Grid
					container
					sx={{
						justifyContent: 'center',
						textAlign: 'center',
					}}
					rowSpacing={10}
					columnSpacing={{ xs: 2, sm: 8, md: 12 }}

					// spacing={{ xs: 2, md: 3 }}
				>
					{renderListPokemon(pokemon)}
				</Grid>
				<PopOver anchorEl={anchorEl} hoverPokemon={hoverPokemon} />
			</InfiniteScroll>
		</>
	)
}

export default Pokemon
