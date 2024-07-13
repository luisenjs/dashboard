import Config from "../interfaces/Config"
import Typography from '@mui/material/Typography';

export default function Indicator(config: Config) {
    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {config.title}
            </Typography>
            <Typography component="p" variant="h4">
                {config.value.toString()}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {config.subtitle}
            </Typography>
        </>
    )
}