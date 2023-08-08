import react from 'react'
import Dashboard from './Dashboard';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
function Thirdparty()
{
    return(
        <>
         <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{display:'flex'}}>
            <Dashboard/>
            <Box>
      
            <Card sx={{ minWidth: 275, marginTop: 15 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         this is my card
        </Typography>
        <Typography variant="h5" component="div">
         this my card
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          this is my card
        </Typography>
        <Typography variant="body2">
          
        </Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>


    <Box style={{
        marginLeft:'40px'
    
}}>
    <Card sx={{ minWidth: 275, marginTop: 15 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         this is my card
        </Typography>
        <Typography variant="h5" component="div">
         this my card
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          this is my card
        </Typography>
        <Typography variant="body2">
          
        </Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>

    <Box style={{
        marginLeft:'40px'
    
}}>
    <Card sx={{ minWidth: 275, marginTop: 15 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         this is my card
        </Typography>
        <Typography variant="h5" component="div">
         this my card
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          this is my card
        </Typography>
        <Typography variant="body2">
          
        </Typography>
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
    </Box>
    
            </Box>
           ̌/</ThemeProvider> 
        </>
    )
}


export default Thirdparty;