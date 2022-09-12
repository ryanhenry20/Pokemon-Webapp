import React, { useState } from 'react';
import _ from 'lodash';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	'@media (max-width: 400px)': {
		width: 400,
	},
	width: 600,
	bgcolor: 'background.paper',
	boxShadow: 24,
	'&:focus-visible': {
		outline: 'none',
	},
	p: 4,
};

const ModalComponent = ({ isModalOpen, handleModalClose, pokemonInfo }) => {
	const pokemontype = _.get(pokemonInfo, 'types', []).map((type) => {
		// console.log('type', type)

		return `${type.slot === 1 ? type.type.name : ''}${
			type.slot === 2 ? `,${type.type.name}` : ''
		}
			 `;
	});

	const pokemonAbilities = _.get(pokemonInfo, 'abilities', []).map(
		(ability) => {
			return `${ability.ability.name} `;
		}
	);

	const pokemonStats = _.get(pokemonInfo, 'stats', []).map((stat) => {
		return (
			<Typography id="transition-modal-description" sx={{ mt: 2 }}>
				{stat.stat.name}: {stat.base_stat}
			</Typography>
		);
	});

	const renderPokemonImage = () => {
		return (
			<>
				<img
					src={
						pokemonInfo &&
						pokemonInfo.sprites &&
						pokemonInfo.sprites.front_default
					}
					alt={pokemonInfo && pokemonInfo.name}
					style={{ width: 200, height: 200 }}
				/>
				<img
					src={
						pokemonInfo &&
						pokemonInfo.sprites &&
						pokemonInfo.sprites.back_default
					}
					alt={pokemonInfo && pokemonInfo.name}
					style={{ width: 200, height: 200 }}
				/>
			</>
		);
	};

	return (
		<div>
			{/* <Button onClick={handleOpen}>Open modal</Button> */}
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={isModalOpen}
				onClose={handleModalClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={isModalOpen}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Pokemon Information
						</Typography>
						<Grid container spacing={{ xs: 2, md: 10, sm: 10 }}>
							<Grid item xs={6} md={6} sm={6}>
								{renderPokemonImage()}
							</Grid>
							<Grid item xs={12} md={6} sm={6}>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Name: {pokemonInfo && pokemonInfo.name}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Base Expirence: {pokemonInfo && pokemonInfo.base_experience}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Type {pokemontype}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Height {pokemonInfo && pokemonInfo.height}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Weight {pokemonInfo && pokemonInfo.weight}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Ablities: {pokemonAbilities}
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									Stats:
								</Typography>
								<Typography id="transition-modal-description" sx={{ mt: 2 }}>
									{pokemonStats}
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default ModalComponent;
