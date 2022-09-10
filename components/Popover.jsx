import React, { useState } from 'react'
import _ from 'lodash'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

const PopOver = ({ anchorEl, hoverPokemon }) => {
	const open = Boolean(anchorEl)

	// console.log('hoverPokemon', hoverPokemon)

	const renderPokemonInformation = (hoverPokemon) => {
		const pokemontype = _.get(hoverPokemon, 'types', []).map((type) => {
			// console.log('type', type)

			return `${type.slot === 1 ? type.type.name : ''}${
				type.slot === 2 ? `,${type.type.name}` : ''
			}
			 `
		})
		return (
			<div
				style={{
					padding: 16,
				}}
			>
				<Typography>Name: {hoverPokemon && hoverPokemon.name}</Typography>
				<Typography>
					Base Expirence: {hoverPokemon && hoverPokemon.base_experience}
				</Typography>
				<Typography>Type: {pokemontype} </Typography>
				<Typography>Height: {hoverPokemon && hoverPokemon.height}</Typography>
				<Typography>Weight: {hoverPokemon && hoverPokemon.weight}</Typography>
			</div>
		)
	}

	return (
		<div>
			<Popover
				id="mouse-over-popover"
				sx={{
					pointerEvents: 'none',
					boxShadow: 1,
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				disableRestoreFocus
			>
				{renderPokemonInformation(hoverPokemon)}
			</Popover>
		</div>
	)
}

export default PopOver
