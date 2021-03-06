import React from 'react';
import clsx from 'clsx';
import { Avatar, Box, Card, Typography, makeStyles } from '@material-ui/core';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Label from 'src/components/Label';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  }
}));

const CountProducts = ({ number }) => {
  const classes = useStyles();
  const data = {
    value: 12,
    difference: -10
  };

  return (
    <Card className={clsx(classes.root)}>
      <Box flexGrow={1}>
        <Typography
          component="h3"
          gutterBottom
          variant="overline"
          color="textSecondary"
        >
          Nombre de produits
        </Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          <Typography variant="h3" color="textPrimary">
            {number}
          </Typography>
        </Box>
      </Box>
      <Avatar className={classes.avatar}>
        <StorefrontIcon />
      </Avatar>
    </Card>
  );
};

export default CountProducts;
