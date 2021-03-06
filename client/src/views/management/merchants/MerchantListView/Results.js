/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  makeStyles
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';
import { labelColorsUserStatus } from 'src/constants';

const tabs = [
  {
    value: 'ALL',
    label: 'Tous'
  },
  {
    value: 'CONFIRMED',
    label: 'CONFIRMÉ'
  },
  {
    value: 'PENDING',
    label: 'EN ATTENTE'
  },
  {
    value: 'BANNED',
    label: 'BANNIE'
  }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Dernière mise à jour (les plus récentes en premier)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Dernière mise à jour (la plus ancienne en premier)'
  },
  {
    value: 'createdAt|desc',
    label: 'Dernière création (les plus récentes en premier)'
  },
  {
    value: 'createdAt|asc',
    label: 'Dernière création (la plus ancienne en premier)'
  }
];

function applyFilters(customers, query, filters) {
  return customers.filter(customer => {
    let matches = true;

    if (query) {
      const properties = [
        'email',
        'name',
        'phone',
        'address',
        'country',
        'city',
        'createdAt',
        'updatedAt'
      ];
      let containsQuery = false;

      properties.forEach(property => {
        if (customer[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach(key => {
      const value = filters[key];

      if (value && customer[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(customers, page, limit) {
  return customers.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

const Results = ({ merchants }) => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('ALL');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);

  const [filters, setFilters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null,
    state: undefined
  });

  const handleTabsChange = (event, value) => {
    const updatedFilters = {
      ...filters,
      isProspect: null,
      isReturning: null,
      acceptsMarketing: null
    };

    updatedFilters.state = value === 'ALL' ? undefined : value;

    setFilters(updatedFilters);
    setSelectedCustomers([]);
    setCurrentTab(value);
  };

  const handleQueryChange = event => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = event => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllCustomers = event => {
    setSelectedCustomers(
      event.target.checked ? merchants.map(customer => customer.id) : []
    );
  };

  const handleSelectOneCustomer = (event, customerId) => {
    if (!selectedCustomers.includes(customerId)) {
      setSelectedCustomers(prevSelected => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers(prevSelected =>
        prevSelected.filter(id => id !== customerId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredCustomers = applyFilters(merchants, query, filters);
  const sortedCustomers = applySort(filteredCustomers, sort);
  const paginatedCustomers = applyPagination(sortedCustomers, page, limit);
  const enableBulkOperations = selectedCustomers.length > 0;
  const selectedSomeCustomers =
    selectedCustomers.length > 0 && selectedCustomers.length < merchants.length;
  const selectedAllCustomers = selectedCustomers.length === merchants.length;

  return (
    <Card className={classes.root}>
      <Tabs
        onChange={handleTabsChange}
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>
      <Divider />
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Rechercher des marchands"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Trier par"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCustomers}
              indeterminate={selectedSomeCustomers}
              onChange={handleSelectAllCustomers}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant="outlined" className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllCustomers}
                    indeterminate={selectedSomeCustomers}
                    onChange={handleSelectAllCustomers}
                  />
                </TableCell>
                <TableCell>Nom marchand</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Créé</TableCell>
                <TableCell>Modifié</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedCustomers.map(merchant => {
                const isCustomerSelected = selectedCustomers.includes(
                  merchant.id
                );

                return (
                  <TableRow
                    hover
                    key={merchant.id}
                    selected={isCustomerSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isCustomerSelected}
                        onChange={event =>
                          handleSelectOneCustomer(event, merchant.id)
                        }
                        value={isCustomerSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          className={classes.avatar}
                          src={merchant.avatar}
                        >
                          {getInitials(merchant.name)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/app/management/merchants/${merchant.id}`}
                            variant="h6"
                          >
                            {merchant.name}
                          </Link>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {merchant.address} {merchant.city} {merchant.zip_code}{' '}
                      {merchant.country}{' '}
                    </TableCell>
                    <TableCell>
                      <Label color={labelColorsUserStatus[merchant.state]}>
                        {merchant.state}
                      </Label>
                    </TableCell>
                    <TableCell>
                      {moment(merchant.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {moment(merchant.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/merchants/${merchant.id}/edit`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/merchants/${merchant.id}`}
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredCustomers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  merchants: PropTypes.array
};

Results.defaultProps = {
  merchants: []
};

export default Results;
