import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { COLORS } from '../styles/colors';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${COLORS.regRed}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: COLORS.darkBlue,
    overflowY: 'auto',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  name: {
    fontSize: '1.2rem',
    margin: '.9rem 0 .9rem 0'
  },
  linkIcon: {
    marginLeft: '1rem',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
  },
  p: {
    fontSize: '.8rem',
  },
  aLinks: {
    color: COLORS.darkBlue,
    display: 'block',
    textDecoration: 'none'
  }
}));

const FooterModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} color="secondary" className={classes.button}>
        about this project
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">The Loop?</h2>
            <p className={classes.p} id="transition-modal-description">
              Why am I reading this? Great question. You couldn't have known, but YES, this website will directly impact your happiness.
            </p>
            <p className={classes.p}>
              What if there was a single place you could look to find everything happening near you?
            </p>
            <p className={classes.p}>This is it...well, sorta. 😉</p>
            <p className={classes.p}>
              The Loop is a pilot project by three guys who met at <a href='http://www.holbertonschool.com'>Holberton School</a>. 
              We're (slowly) building a curated database of things to do and places to go all within the inner dispersal loop (IDL) of downtown Tulsa. 
              Hence, the cute name! The goal is to have helpful, current, and vetted info served up to you to sort however you’d like.</p>
            <p className={classes.p}>
              <b>Now back to you.</b> Let's face it—you're spending waaaay too much time looking for interesting stuff to do. 
              Whether you're new in town or have been here forever, the Loop will finally help you know (once and for all) 
              what there is to do and when in this beautiful city. And, you'll have lots of great opportunities to give your 
              hard-earned money to local businesses.
            </p>
            <p className={classes.p}>Knowing what there is to do + doing it = You. Happy.</p>
            <p className={classes.p}>Thanks for checking us out!</p>
            <div className={classes.contactInfo}>
              <p className={classes.name}><b>Travis Bearden</b></p>
              <a className={classes.aLinks} href='http://linkedin.com/in/travisbearden'><LinkedInIcon className={classes.linkIcon}/></a>
              <a className={classes.aLinks} href='http://github.com/Beardocracy'><GitHubIcon className={classes.linkIcon}/></a>
            </div>
            <div className={classes.contactInfo}>
              <p className={classes.name}><b>Jacob Ide</b></p>
              <a className={classes.aLinks} href='http://www.linkedin.com/in/jacobide/'><LinkedInIcon className={classes.linkIcon}/></a>
              <a className={classes.aLinks} href='http://github.com/ihavemadefire'><GitHubIcon className={classes.linkIcon}/></a>
            </div>
            <div className={classes.contactInfo}>
              <p className={classes.name}><b>Colson Scott</b></p>
              <a className={classes.aLinks} href='http://linkedin.com/in/colson-scott'><LinkedInIcon className={classes.linkIcon}/></a>
              <a className={classes.aLinks} href='http://github.com/OctopusHugz'><GitHubIcon className={classes.linkIcon}/></a>
            </div>
            <div className={classes.button}>
              <Button 
                variant='outlined'
                color="primary"
                onClick={() => handleClose()}
                >
                close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default FooterModal;