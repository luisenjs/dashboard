import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Icono from "../assets/weather-svgrepo-com.svg";
import Github from "../assets/github-svgrepo-com.svg";
import OpenWeatherMapIcon from "../assets/openweathermap-removebg-preview.png";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "../App.css"

export default function Navbar() {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <img src={Icono} alt="Icono climático" style={{ width: '100px', height: '100px' }} />
                    <Typography variant="h3" sx={{ flexGrow: 1, padding: 3, textAlign: "left", fontFamily: "Playwrite IT Moderna, cursive", fontSize: "42px"}}>
                        Dashboard meteorológico
                    </Typography>
                    <Grid sx={{ padding: 1 }}>
                        <Paper elevation={5} sx={{borderRadius: "30px"}}>
                            <Button component="a" href="https://github.com/luisenjs/dashboard" target="_blank" rel="noopener noreferrer" >
                                <img src={Github} alt="Repositorio" style={{ width: '30px', height: '30px' }} />
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid sx={{ padding: 1 }}>
                        <Paper elevation={5} sx={{borderRadius: "30px"}}>
                            <Button component="a" href="https://openweathermap.org" target="_blank" rel="noopener noreferrer" >
                                <img src={OpenWeatherMapIcon} alt="OpenWatherMap" style={{ width: '30px', height: '30px' }} />
                            </Button>
                        </Paper>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};
