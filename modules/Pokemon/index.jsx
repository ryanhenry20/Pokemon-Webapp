import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
	pokemon: {
		justifyContent: 'center',
		textAlign: 'center',
	},
}))

const Pokemon = ({ data, pokemonDetail }) => {
	const classes = useStyles()
	console.log('Data', data)
	console.log('pokemonDetail', pokemonDetail)

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
		<Grid
			container
			className={classes.pokemon}
			spacing={{ xs: 2, md: 3 }}
			columns={{ xs: 2, sm: 8, md: 12 }}
		>
			{renderListPokemon(pokemonDetail)}
		</Grid>
	)
}

export default Pokemon
