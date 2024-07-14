import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ControlPanel({ valoresperado }: any) {

    {/* Variable de estado y función de actualización */ }

    let [, setSelected] = useState(-1)

    {/* Datos de los elementos del Select */ }

    let items = [
        "Todas",
        "Temperatura",
        "Sensación Térmica",
        "Humedad"
    ]

    let options = items.map((item, key) => <MenuItem key={key} value={key}>{item}</MenuItem>)

    {/* Manejador de eventos */ }

    const handleChange = (event: SelectChangeEvent) => {

        let idx = parseInt(event.target.value)
        setSelected(idx);

        {/* Modificación*/ }

        valoresperado(items[idx])

    };

    {/* JSX */ }

    return (
        <Box sx={{ minWidth: 120 }}>

            <FormControl fullWidth>

                <InputLabel id="simple-select-label">Variables</InputLabel>

                <Select labelId="simple-select-label" id="simple-select" label="Variables" defaultValue='-1' onChange={handleChange}>
                    <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>
                    {options}
                </Select>

            </FormControl>

        </Box>
    )
}