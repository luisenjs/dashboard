import { Chart } from "react-google-charts";
import Config from "../interfaces/Config";

export default function WeatherChart(info: Config) {

    {/* Configuración */ }

    let nombre = info.value?.toString()

    let options = {
        curveType: "function",
        legend: { position: "bottom" },
    }

    {/* Datos de las variables meteorológicas */ }

    const data = [
        ["Hora", "Precipitación", "Humedad", "Nubosidad"],
        ["03:00", 13, 78, 75],
        ["06:00", 4, 81, 79],
        ["09:00", 7, 82, 69],
        ["12:00", 3, 73, 62],
        ["15:00", 4, 66, 75],
        ["18:00", 6, 64, 84],
        ["21:00", 5, 77, 99]
    ];

    const variableMap: { [key: string]: number } = {
        "Todas": 0,
        "Precipitación": 1,
        "Humedad": 2,
        "Nubosidad": 3
    };

    const variableIndex = variableMap[nombre ?? ""] ?? 0;

    let datosFiltrados;

    if (variableIndex != 0) {
        datosFiltrados = data.map((row, index) => {
            if (index === 0) return [row[0], row[variableIndex]];
            return [row[0], row[variableIndex]];
        });
    } else {
        datosFiltrados = data
    }

    {/* JSX */ }

    return (
        <>
            <Chart
                chartType="LineChart"
                width="100%"
                height="100%"
                data={datosFiltrados}
                options={options}
            />
        </>
    )
}	