import * as React from 'react';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography  from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Roles from "./Roles"
import { Brightness4, Brightness7, Home, Menu } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import Sidebaar from '../component/Sidebaar';
import { ThemeProvider } from '@emotion/react';
import { Tooltip } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import  { useEffect } from 'react';
import { Group, MapsHomeWork } from '@mui/icons-material';
import Paper from '@mui/material/Paper';



const drawerWidth = 240;



const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));



export default function Dashboard() {
    //   const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(true);

    const darkTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: dark ? 'dark' : 'light',
                },
            }),
        [dark]
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const navigate = useNavigate()
    return (
       <>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                       
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            ADMIN
                        </Typography>
                        <IconButton onClick={() => setDark(!dark)}>
                            {dark ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Sidebaar {...{ open, setOpen }} />
            </Box>

{/* =============================================== */}


 {/* <div>
            <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">
          10
          </Typography>
        </Box>

      </Paper>
       <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Rooms</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">
            20
            </Typography>
        </Box> 
      </Paper> 
      
      </Box>  
      </div> */}



        </ThemeProvider>
       

    
      </> 
 )
};
