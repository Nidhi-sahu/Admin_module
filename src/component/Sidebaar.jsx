import { React, useMemo } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PeopleIcon from '@mui/icons-material/People';
import ThreePIcon from '@mui/icons-material/ThreeP';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import {useNavigate} from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';


const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function Sidebaar({ open, setOpen }) {
 
  const navigate = useNavigate()

  return (
    <>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>

            <ChevronLeftIcon />

          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {/* <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

              {/* </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>  */}

        </List>
        <Divider />


          <List>
{/* ---------------------------------------------------------------dashboard--------------------------------------------------------------- */}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/dashboard")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                
              <  DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* ----------------------------------------------------------------------roles------------------------------------------------------ */}
           <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/role")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                
                < AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* -------------------------------------------------------------------------------users------------------------------------------------ */}
             <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/user")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* -------------------------------------------------------------------------------- */}
             <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => {navigate("/category ")}} >
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Category" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
   {/* -------------------------------------------------------------------------------------subcategory----------------------------------- */}

             <ListItem disablePadding sx={{ display: 'block' }}   onClick={() => {navigate("/subcategory ")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Subcategory" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* --------------------------------------------------------------------------Reatiler-------------------------------------- */}
             <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/retailer")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <StorefrontIcon  />
                </ListItemIcon>
                <ListItemText primary="Retailer" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* -------------------------------------------------------------------------Customer----------------------------------------- */}
             <ListItem disablePadding sx={{ display: 'block' }}  onClick={() => {navigate("/customer")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customer" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>

{/* ----------------------------------------------------------------------------------------Offer----------------------------------------------- */}
             <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/offer")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <LocalOfferIcon/>
                </ListItemIcon>
                <ListItemText primary="Offer" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
{/* ---------------------------------------------------------------------------third-party------------------------------------------------- */}
<ListItem disablePadding sx={{ display: 'block' }} onClick={() => {navigate("/thirdparty")}}>
               <ListItemButton
                 sx={{
                   minHeight: 48,
                   justifyContent: open ? 'initial' : 'center',
                   px: 2.5,
                }}
              >
                <ListItemIcon
                   sx={{
                    minWidth: 0,
                   mr: open ? 3 : 'auto',
                   justifyContent: 'center',
                  }}
                >
                 <ThreePIcon />
                </ListItemIcon>
                <ListItemText primary="third-party" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
             </ListItem>
        </List>  
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

      </Box>

    </>

  );
}
export default Sidebaar;