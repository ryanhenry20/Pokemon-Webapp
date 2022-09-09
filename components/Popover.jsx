import React, { useState } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'

const PopOver = ({ handlePopoverClose, anchorEl }) => {
	// const [anchorEl, setAnchorEl] = useState(null)

	// const handlePopoverOpen = (event) => {
	// 	setAnchorEl(event.currentTarget)
	// }

	// const handlePopoverClose = () => {
	// 	setAnchorEl(null)
	// }

	const open = Boolean(anchorEl)

	return (
		<div>
			{/* <Typography
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				Hover with a Popover.
			</Typography> */}
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
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				{/* <Typography
					sx={{ p: 1, boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.2);' }}
				>
					I use Popover.
				</Typography> */}
				<p>RUBBYYY</p>
			</Popover>
		</div>
	)
}

export default PopOver
