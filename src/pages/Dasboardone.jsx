import react from 'react'
import Dashboard from './Dashboard';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import { Group, MapsHomeWork } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Chart from './Piechart';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Areacharts from './Areachart';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 2),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
    

   
  ];


function Dashboardone()
{
    return(
        <>
        <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Box sx={{display:'flex'}}>
            <Dashboard/>
           
            <Box
    sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
        marginTop:'100px'
       
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Customer</Typography>
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
        <Typography variant="h4">Total Retailer</Typography>
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
      
        {/* <Paper elevation={3} sx={{ p: 3 }}>
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

      </Paper>   */}

 {/* --------------------------------------------------------------------------------table--------------------------------------------------- */}
 <Paper elevation={3} sx={{ p: 2,gridColumn:3, gridRow:'1/4'}}>
<Box>
<TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Paper>

{/* ----------------------------chart--------------------- */}

 <Paper elevation={3} sx={{p:2, gridColumn:'1/3'}}>
<Chart/>
 </Paper>

 <Paper elevation={3} sx={{p:2, gridColumn:'1/3'}}>
 <Areacharts/>
 </Paper>


      </Box>
      </Box>
    </ThemeProvider>
        </>
    )
}
export default Dashboardone;































