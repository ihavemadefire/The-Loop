import React from 'react';
import { connect } from 'react-redux';
import { setEventSearch, setPlaceSearch } from '../../actions';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
		width: '120px',
		borderBottom: '1px solid',
		borderTop: '1px solid',
		marginRight: '3px'
	},
	typography: {

	}
}));

const MenuListType = (props) => {
  console.log(props);
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

	const currentSearch = () => {
		if (props.searchType === 'events') {
			return 'things to do';
		} else {
			return 'places to go';
		}
	}

  const handleClose = (event) => {
    
		const selection = event.target.firstChild.data;
		if (selection === 'places to go') {
			props.setPlaceSearch();
			console.log('You want places');
		} else if (selection === 'things to do') {
			props.setEventSearch();
			console.log('You want events');
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
          <Typography className={classes.typography}>{currentSearch()}</Typography>
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
                    <MenuItem onClick={handleClose}>things to do</MenuItem>
                    <MenuItem onClick={handleClose}>places to go</MenuItem>
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
	return { searchType: state.searchType };
};

export default connect(mapStateToProps, { setEventSearch, setPlaceSearch })(MenuListType);