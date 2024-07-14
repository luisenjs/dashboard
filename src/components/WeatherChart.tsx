import { Chart } from "react-google-charts";

interface Config {
    value: String;
    variables: [];
  }

export default function WeatherChart(info: Config) {

    {/* Configuración */ }

    let nombre = info.value?.toString()

    let options = {
        curveType: "function",
        legend: { position: "bottom" },
    }

    {/* Datos de las variables meteorológicas */ }

    let data = [
        ["Hora", "Temperatura", "Sensación Térmica", "Humedad"]
    ];
    
    info.variables.forEach((datos) => {
        let lista = [datos["horas"], parseFloat(datos["temperatura"]), parseFloat(datos["sensación"]), parseInt(datos["humedad"])]
        // @ts-ignore
        data.push(lista)
    })

    const variableMap: { [key: string]: number } = {
        "Todas": 0,
        "Temperatura": 1,
        "Sensación Térmica": 2,
        "Humedad": 3
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