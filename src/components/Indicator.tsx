import Config from "../interfaces/Config"
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import temperatura from "../assets/forecast-medium-season-svgrepo-com.svg"
import sensación from "../assets/forecast-high-season-svgrepo-com.svg"
import precipitación from "../assets/climate-cloud-forecast-svgrepo-com.svg"
import viento from "../assets/blowing-climate-forecast-svgrepo-com.svg"
import sol from "../assets/day-forecast-hot-svgrepo-com.svg"
import "../App.css"

export default function Indicator(config: Config) {

    const obtenerIcono = () => {
        switch (config.title) {
            case 'Temperatura':
                return temperatura;
            case 'Sensación':
                return sensación;
            case 'Precipitación':
                return precipitación;
            case 'Viento':
                return viento;
            case 'Sol':
                return sol;
            default:
                return sol;
        }
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center" sx={{padding: 2}}>
                <Grid item xs={9}>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{padding: 1, fontFamily: "Playwrite CO, cursive", fontSize: "20px"}} >
                        {config.title}
                    </Typography>
                    <Typography component="p" variant="h4" sx={{padding: 1, fontFamily: "Playwrite DE Grund", fontSize: "20px"}} >
                        {config.value.toString()}
                    </Typography>
                    <Typography color="text.secondary" sx={{fontFamily: "Playwrite CO, cursive", fontSize: "16px"}} >
                        {config.subtitle}
                    </Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="flex-end">
                    <img src={obtenerIcono()} alt={`Icono de ${config.title}`} style={{ width: '50px', height: '50px' }} />
                </Grid>
            </Grid>
        </>
    )
}