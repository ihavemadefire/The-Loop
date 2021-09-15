import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { setTimeNow, setTimeAny, setTimeLater, setTimeAll } from '../../actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
	button: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		//width: '90px',
		borderBottom: '1px solid',
		borderTop: '1px solid',
		marginRight: 10,
	},
	typography: {

	}
}));

const MenuListTime = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const currentTime = () => {
		if (props.timeFrame === 'now') {
			return now;
		} else if (props.timeFrame === 'any') {
			return any;
		} else if (props.timeFrame === 'later') {
			return later;
		} else if (props.timeFrame === 'all') {
      return allThings;
    }
	};

  const now = 'happening now';
  const later = 'happening today';
  const any = 'for the future';
  const allThings = 'show it all';

	const handleClose = (event) => {

		const selection = event.target.firstChild.data;
		if (selection === now) {
			props.setTimeNow();
      props.updateTimeParam('now')
		} else if (selection === later) {
      props.setTimeLater();
      props.updateTimeParam('later')
		} else if (selection === any) {
      props.setTimeAny();
      props.updateTimeParam('anytime')
		} else if (selection === allThings) {
      props.setTimeAll();
      props.updateTimeParam('all');
    }
    
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
					className={classes.button}
        >
          <Typography className={classes.typography}>{currentTime()}</Typography>
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>{now}</MenuItem>
                    <MenuItem onClick={handleClose}>{later}</MenuItem>
                    <MenuItem onClick={handleClose}>{any}</MenuItem>
                    <MenuItem onClick={handleClose}>{allThings}</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
	return { timeFrame: state.timeFrame };
};

export default connect(mapStateToProps, { setTimeAny, setTimeNow, setTimeLater, setTimeAll })(MenuListTime);