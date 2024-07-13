import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Row {
  rangeHours: string;
  visibility: String;
  windDirection: string;
  windSpeed: String;
  pressure: String;
  precipitation: String
}

{/* 3. Declare la interfaz del prop de entrada */ }

interface Config {
  rows: Row[];
}

export default function BasicTable(data: Config) {

  {/* 
         4. Declare la variable de estado (rows) y la función de actualización (setRows).
         Use el mismo identificador de la variable con valores fijos (rows)
     */}

  let [rows, setRows] = useState<Row[]>([])

  {/* 
         5. Agregue el hook useEffect, controlado por el prop del componente (data), y
         Dentro del hook, invoque al métdo de actualización con el valor del prop (data.rows).
     */}

  useEffect(() => {

    (() => {

      setRows(data.rows)

    })()

  }, [data])


  {/* JSX */ }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Modifique la cabecera de la tabla con los títulos adecuados */}
            <TableCell align="center">Rango de horas</TableCell>
            <TableCell align="center">Visibilidad</TableCell>
            <TableCell align="center">Dirección del viento</TableCell>
            <TableCell align="center">Velocidad del viento</TableCell>
            <TableCell align="center">Presión</TableCell>
            <TableCell align="center">Precipitación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.rangeHours} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" component="th" scope="row">{row.rangeHours}</TableCell>
              <TableCell align="center">{row.visibility}</TableCell>
              <TableCell align="center">{row.windDirection}</TableCell>
              <TableCell align="center">{row.windSpeed}</TableCell>
              <TableCell align="center">{row.pressure}</TableCell>
              <TableCell align="center">{row.precipitation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
