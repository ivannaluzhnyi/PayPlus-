/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import {
  Briefcase as BriefcaseIcon,
  Calendar as CalendarIcon,
  ShoppingCart as ShoppingCartIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  AlertCircle as AlertCircleIcon,
  Trello as TrelloIcon,
  User as UserIcon,
  Layout as LayoutIcon,
  Edit as EditIcon,
  DollarSign as DollarSignIcon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  PieChart as PieChartIcon,
  Share2 as ShareIcon,
  Users as UsersIcon
} from 'react-feather';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LoopIcon from '@material-ui/icons/Loop';
import Logo from 'src/components/Logo';
import { ROLE } from 'src/constants';
import Label from 'src/components/Label';
import NavItem from './NavItem';

const navConfigByRole = role => {
  switch (role) {
    case ROLE.ADMIN:
      return [
        {
          subheader: 'Reports',
          items: [
            {
              title: 'Dashboard',
              icon: PieChartIcon,
              href: '/app/reports/dashboard'
            },
            {
              title: 'Dashboard Alternative',
              icon: BarChartIcon,
              href: '/app/reports/dashboard-alternative'
            }
          ]
        },
        {
          subheader: 'Gestion',
          items: [
            {
              title: 'Utilisateurs',
              icon: UsersIcon,
              href: '/app/management/users',
              items: [
                {
                  title: 'List Utilisateurs',
                  href: '/app/management/users'
                }
              ]
            },
            {
              title: 'Marchands',
              icon: StorefrontIcon,
              href: '/app/management/merchants',
              items: [
                {
                  title: 'List Marchands',
                  href: '/app/management/merchants'
                }
              ]
            },
            {
              title: 'Transactions',
              icon: LoopIcon,
              href: '/app/management/products',
              items: [
                {
                  title: 'List Products',
                  href: '/app/management/products'
                },
                {
                  title: 'Create Product',
                  href: '/app/management/products/create'
                }
              ]
            },
            {
              title: 'Orders',
              icon: FolderIcon,
              href: '/app/management/orders',
              items: [
                {
                  title: 'List Orders',
                  href: '/app/management/orders'
                },
                {
                  title: 'View Order',
                  href: '/app/management/orders/1'
                }
              ]
            },
            {
              title: 'Invoices',
              icon: ReceiptIcon,
              href: '/app/management/invoices',
              items: [
                {
                  title: 'List Invoices',
                  href: '/app/management/invoices'
                },
                {
                  title: 'View Invoice',
                  href: '/app/management/invoices/1'
                }
              ]
            }
          ]
        },
        {
          subheader: 'Utilisateur',
          href: '/app/pages',
          items: [
            {
              title: 'Account',
              href: '/app/account',
              icon: UserIcon
            }
          ]
        }
      ];
    case ROLE.MERCHANT:
      return [
        {
          subheader: 'Reports',
          items: [
            {
              title: 'Dashboard',
              icon: PieChartIcon,
              href: '/app/reports/dashboard'
            },
            {
              title: 'Dashboard Alternative',
              icon: BarChartIcon,
              href: '/app/reports/dashboard-alternative'
            }
          ]
        },
        {
          subheader: 'Gestion',
          items: [
            {
              title: 'Marchands',
              icon: StorefrontIcon,
              href: '/app/management/merchants',
              items: [
                {
                  title: 'List Marchands',
                  href: '/app/management/merchants'
                }
              ]
            },
            {
              title: 'Transactions',
              icon: LoopIcon,
              href: '/app/management/transactions',
              items: [
                {
                  title: 'List Transactions',
                  href: '/app/management/transactions'
                }
              ]
            },
            {
              title: 'Invoices',
              icon: ReceiptIcon,
              href: '/app/management/invoices',
              items: [
                {
                  title: 'List Invoices',
                  href: '/app/management/invoices'
                },
                {
                  title: 'View Invoice',
                  href: '/app/management/invoices/1'
                }
              ]
            }
          ]
        },
        {
          subheader: 'Utilisateur',
          href: '/app/pages',
          items: [
            {
              title: 'Account',
              href: '/app/account',
              icon: UserIcon
            }
          ]
        }
      ];

    default:
      return [];
  }
};

const navConfig = [
  {
    subheader: 'Reports',
    items: [
      {
        title: 'Dashboard',
        icon: PieChartIcon,
        href: '/app/reports/dashboard'
      },
      {
        title: 'Dashboard Alternative',
        icon: BarChartIcon,
        href: '/app/reports/dashboard-alternative'
      }
    ]
  },
  {
    subheader: 'Management',
    items: [
      {
        title: 'Customers',
        icon: UsersIcon,
        href: '/app/management/merchants',
        items: [
          {
            title: 'List Customers',
            href: '/app/management/merchants'
          },
          {
            title: 'View Customer',
            href: '/app/management/merchants/1'
          },
          {
            title: 'Edit Customer',
            href: '/app/management/merchants/1/edit'
          }
        ]
      },
      {
        title: 'Products',
        icon: ShoppingCartIcon,
        href: '/app/management/products',
        items: [
          {
            title: 'List Products',
            href: '/app/management/products'
          },
          {
            title: 'Create Product',
            href: '/app/management/products/create'
          }
        ]
      },
      {
        title: 'Orders',
        icon: FolderIcon,
        href: '/app/management/orders',
        items: [
          {
            title: 'List Orders',
            href: '/app/management/orders'
          },
          {
            title: 'View Order',
            href: '/app/management/orders/1'
          }
        ]
      },
      {
        title: 'Invoices',
        icon: ReceiptIcon,
        href: '/app/management/invoices',
        items: [
          {
            title: 'List Invoices',
            href: '/app/management/invoices'
          },
          {
            title: 'View Invoice',
            href: '/app/management/invoices/1'
          }
        ]
      }
    ]
  },
  {
    subheader: 'Applications',
    items: [
      {
        title: 'Projects Platform',
        href: '/app/projects',
        icon: BriefcaseIcon,
        items: [
          {
            title: 'Overview',
            href: '/app/projects/overview'
          },
          {
            title: 'Browse Projects',
            href: '/app/projects/browse'
          },
          {
            title: 'Create Project',
            href: '/app/projects/create'
          },
          {
            title: 'View Project',
            href: '/app/projects/1'
          }
        ]
      },
      {
        title: 'Social Platform',
        href: '/app/social',
        icon: ShareIcon,
        items: [
          {
            title: 'Profile',
            href: '/app/social/profile'
          },
          {
            title: 'Feed',
            href: '/app/social/feed'
          }
        ]
      },
      {
        title: 'Kanban',
        href: '/app/kanban',
        icon: TrelloIcon
      },
      {
        title: 'Mail',
        href: '/app/mail',
        icon: MailIcon,
        info: () => <Chip color="secondary" size="small" label="Updated" />
      },
      {
        title: 'Chat',
        href: '/app/chat',
        icon: MessageCircleIcon,
        info: () => <Chip color="secondary" size="small" label="Updated" />
      },
      {
        title: 'Calendar',
        href: '/app/calendar',
        icon: CalendarIcon
      }
    ]
  },
  {
    subheader: 'Pages',
    href: '/app/pages',
    items: [
      {
        title: 'Account',
        href: '/app/account',
        icon: UserIcon
      },
      {
        title: 'Error',
        href: '/404',
        icon: AlertCircleIcon
      },
      {
        title: 'Pricing',
        href: '/pricing',
        icon: DollarSignIcon
      }
    ]
  },
  {
    subheader: 'Extra',
    items: [
      {
        title: 'Charts',
        href: '/app/extra/charts',
        icon: BarChartIcon,
        items: [
          {
            title: 'Apex Charts',
            href: '/app/extra/charts/apex'
          }
        ]
      },
      {
        title: 'Forms',
        href: '/app/extra/forms',
        icon: EditIcon,
        items: [
          {
            title: 'Formik',
            href: '/app/extra/forms/formik'
          },
          {
            title: 'Redux Forms',
            href: '/app/extra/forms/redux'
          }
        ]
      },
      {
        title: 'Editors',
        href: '/app/extra/editors',
        icon: LayoutIcon,
        items: [
          {
            title: 'DraftJS Editor',
            href: '/app/extra/editors/draft-js'
          },
          {
            title: 'Quill Editor',
            href: '/app/extra/editors/quill'
          }
        ]
      }
    ]
  }
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  userState: {
    marginTop: '10px'
  }
}));

const labelColors = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  BANNIE: 'error'
};

const NavBar = ({ openMobile, onMobileClose }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector(state => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar alt="User" className={classes.avatar} src={user.avatar} />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none"
            >
              {user.first_name} {user.last_name}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfigByRole(user.role).map(config => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: config.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius="borderRadius" bgcolor="background.dark">
            <Typography variant="h6" color="textPrimary">
              Besoin d'aide ?
            </Typography>
            <Link
              variant="subtitle1"
              color="secondary"
              component={RouterLink}
              to="/docs"
            >
              Consultez nos documents
            </Link>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;