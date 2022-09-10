import React, { useState, useEffect, useMemo, useCallback } from 'react'
import _ from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PopOver from '../../components/PopOver.js'

const Pokemon = ({ data, pokemonDetail, typePokemon }) => {
	// const classes = useStyles()
	const [result, setResult] = useState(data)
	const [pokemon, setPokemon] = useState(pokemonDetail)
	const [hoverPokemon, setHoverPokemon] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	// console.log('Data', data)
	// console.log('pokemonDetail', pokemonDetail)
	// console.log('typePokemon', typePokemon)

	const fetchPokemon = async () => {
		// console.log('next', data && data.next)

		setTimeout(async () => {
			const res = await fetch(result.next)
			const dataPokemon = await res.json()
			setResult(dataPokemon)
			const pokemonDetail = await Promise.all(
				dataPokemon.results.map(async (pokemon) => {
					const res = await fetch(pokemon.url)
					const pokemonData = await res.json()
					console.log('thor', pokemonData)
					setPokemon((pokemon) => [...pokemon, pokemonData])
					return pokemonData
				})
			)
			return pokemonDetail
		}, 1000)
	}

	const fetchPokemonMemo = useMemo(() => fetchPokemon, [typePokemon])

	const fetchPokemonByType = async (type) => {
		let arr = []
		const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
		const data = await res.json()
		const pokemonDetail = await Promise.all(
			data.pokemon.map(async (pokemon) => {
				const res = await fetch(pokemon.pokemon.url)
				const pokemonData = await res.json()

				return pokemonData
			})
		)

		setPokemon(pokemonDetail)

		return pokemonDetail
	}

	const fetchPokemonByTypeMemo = useMemo(() => fetchPokemonByType, [pokemon])

	const renderButtonFilter = useCallback(() => {
		return typePokemon.map((type) => {
			return (
				<Button
					key={type.name}
					onClick={() => {
						const filterPokemon = pokemon.filter((pokemon) => {
							return pokemon.types.find((typePokemon) => {
								return typePokemon.type.name === type.name
							})
						})
						setPokemon(filterPokemon)
					}}
				>
					{type.name}
				</Button>
			)
		})
	}, [typePokemon])

	const renderButtonFilterFromAPI = () => {
		return typePokemon.map((type) => {
			return (
				<Button
					key={type.name}
					onClick={async () => {
						const resp = await fetchPokemonByTypeMemo(type.name)
					}}
				>
					{type.name}
				</Button>
			)
		})
	}

	const handlePopoverOpen = (event, pokemon) => {
		setAnchorEl(event.currentTarget)
		setHoverPokemon(pokemon)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	const renderListPokemon = (data) => {
		return (
			data &&
			data.map((pokemon, index) => {
				const imagesPokemon = _.get(
					pokemon,
					'sprites.other.dream_world.front_default',
					'/images/pokemon.png'
				)

				return (
					<Grid item xs={8} sm={3} key={index}>
						<div className="pokemon">
							<div className="pokemon__image">
								<img
									src={imagesPokemon}
									alt={`${pokemon.name}-image`}
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
		)
	}

	return (
		<Grid
			container
			rowSpacing={10}
			sx={{
				padding: '24px',
				justifyContent: 'center',
				textAlign: 'center',
			}}
		>
			<Grid item xs={12} sm={12} md={12}>
				<Typography
					variant="h1"
					sx={{
						fontWeight: 'bold',
						marginBottom: '48px',
					}}
				>
					Pokemon List
				</Typography>
				<div
					style={{
						marginBottom: '36px',
					}}
				>
					<Typography variant="h4">Filter</Typography>
					{/* {renderButtonFilter()} */}
					{renderButtonFilterFromAPI()}
					<Button onClick={() => setPokemon(pokemonDetail)}>Reset</Button>
				</div>
			</Grid>
			<div>
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
			</div>
		</Grid>
	)
}

export default Pokemon
