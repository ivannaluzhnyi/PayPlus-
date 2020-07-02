import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Link,
  Portal,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 600,
    position: 'fixed',
    bottom: 0,
    left: 0,
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    outline: 'none',
    zIndex: 2000
  },
  action: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black
  }
}));

const CookiesNotification = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    Cookies.set('consent', 'true');
    setOpen(false);
  };

  useEffect(() => {
    const consent = Cookies.get('consent');

    if (!consent) {
      setOpen(true);
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div className={classes.root}>
        <Typography variant="body1" color="inherit">
          Nous utilisons des cookies pour nous assurer que nous vous offrons la
          meilleure expérience possible sur notre site web. Lisez notre{' '}
          <Link
            component="a"
            color="inherit"
            underline="always"
            href="#"
            target="_blank"
          >
            Privacy Policy
          </Link>
          .
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.action}
          >
            Je suis d'accord
          </Button>
        </Box>
      </div>
    </Portal>
  );
};

export default CookiesNotification;
