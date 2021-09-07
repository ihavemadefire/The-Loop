import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CancelIcon from '@material-ui/icons/Cancel';

import { COLORS } from '../../styles/colors';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
	venueDetail: {
		alignSelf: "end"
	},
	eventDetail: {
	},
	card: {
		maxWidth: 400,
		marginBottom: 5,
	},
	title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
	content: {
		padding: 10,
		paddingBottom: 10,
		
	},
	type: {
		fontWeight: 500,
		color: COLORS.regRed,
	},
	name: {
		fontWeight: 700,
		color: COLORS.darkBlue,
		fontSize: '1.2rem'
	},
	shortDescription: {
		color: COLORS.darkBlue,
		fontWeight: 300,
		marginBottom: 10,
	},
	inlineInfo: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	subHeading: {
		fontWeight: 300,
	},
	venueLink: {
		fontWeight: 500,
		color: COLORS.darkBlue,
	},
	cardHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	popover: {
		maxWidth: 375,
	},

}));

export default function DetailPop(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
		console.log(props);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      { props.detailType === 'event' &&
				<Button 
					aria-describedby={id}
					variant="outlined"
					color="primary"
					className={classes.eventDetail}
					onClick={handleClick}
				>
					details
				</Button>
			}
			{ props.detailType === 'venue' &&
				<Link
					color="secondary"
					href="#"
					onClick={handleClick}
				>
					{props.details.name}
				</Link>
			}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.popover}>
					{ props.detailType === 'event' &&
					<div className={classes.content}>
						<div className={classes.cardHeader}>
							<div>
								<div className={classes.type}>{props.venue.type[0].type}</div>
								<div className={classes.name}>{props.venue.name}</div>
							</div>
							<IconButton
								onClick={handleClose}
								color="primary"
								className={classes.iconButton}
							>
								<CancelIcon/>
							</IconButton>
						</div>
						<div className={classes.shortDescription}>{props.venue.description}</div>
					</div>
					}
					{ props.detailType === 'venue' &&
						<div className={classes.content}>
							<div className={classes.cardHeader}>
								<div>
									<div className={classes.type}>{props.details.type.type}</div>
									<div className={classes.name}>{props.details.name}</div>
								</div>
								<IconButton
									onClick={handleClose}
									color="primary"
									className={classes.iconButton}
								>
									<CancelIcon/>
								</IconButton>
							</div>
							<div className={classes.shortDescription}>{props.details.description}</div>
							{/* <div className={classes.inlineInfo}>
								<div className={classes.subHeading}>Amenities:</div>
								{ props.details.amenities.map((amenity) => (
									<div key={amenity.id}>{amenity.amenity}</div>
								)) }
							</div> */}
							<div className={classes.inlineInfo}>
								<div className={classes.subHeading}>Address:</div>
								<div className={classes.subInfo}>{props.details.address}</div>
							</div>
							<div className={classes.inlineInfo}>
								<div className={classes.subHeading}>Phone:</div>
								<div className={classes.subInfo}>{props.details.phoneNumber}</div>
							</div>
					</div>
						
					}
				</div>
      </Popover>
    </div>
  );
}
