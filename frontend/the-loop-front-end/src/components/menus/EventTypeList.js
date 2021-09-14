import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { setEventTypeFilterList, addEventTypeFilterList, delEventTypeFilterList } from '../../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto 1rem 2rem 1rem',
    position: 'relative',
    bottom: '0px'
  }
}));

const EventTypeList = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleClear = () => {
    setChecked([0]);
    props.delEventTypeFilterList();
    props.updateSearchParams(eventTypes);
  };

  const handleResults = () => {
    //console.log(checked);
    props.addEventTypeFilterList(checked);
    props.updateSearchParams(checked);
  }
  
  const eventTypes = ['concerts', 'live music', 'community events', 'art and museums', 'live sports', 'activities',
                      'happy hours'];

  return (
    <>
      <List className={classes.root}>
        {eventTypes.map((value) => (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': `checkbox-list-label-${value}` }}
                />
            </ListItemIcon>
            <ListItemText id={`checkbox-list-label-${value}`} primary={`${value}`} />
          </ListItem>
        ))}
      </List>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleResults()}
          >
          show results
        </Button>
        <Button 
          color="primary"
          onClick={() => handleClear()}
          >
          clear filters
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    eventTypeFilters: state.eventTypeFilters,
  };
};

export default connect(mapStateToProps, { setEventTypeFilterList, addEventTypeFilterList, delEventTypeFilterList })(EventTypeList);
