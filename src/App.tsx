import { ReactNode, useEffect, useState } from 'react'
import { MenuItem, Paper, Select, Typography, SelectChangeEvent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import Navbar from './components/Navbar';
import './App.css'

interface Row {
	rangeHours: string;
	visibility: String;
	windDirection: string;
	windSpeed: String;
	pressure: String;
	precipitation: String
}

function App() {

	{/* Variable de estado y función de actualización */ }
	const [tunnel, setTunnel] = useState("")
	const [ciudad, setCiudad] = useState("Guayaquil")
	let [rowsTable, setRowsTable] = useState<Row[]>([])
	let [indicators, setIndicators] = useState<ReactNode[]>([])
	let [variables, setVariables] = useState([])

	const handleCityChange = (event: SelectChangeEvent<string>) => {
		setCiudad(event.target.value);
	};

	{/* Hook: useEffect */ }
	useEffect(() => {
		(async () => {
			{/* Del LocalStorage, obtiene el valor de las claves openWeatherMap y expiringTime */ }
			let savedTextXML = localStorage.getItem("openWeatherMap")
			let expiringTime = localStorage.getItem("expiringTime")

			{/* Estampa de tiempo actual */ }
			let nowTime = (new Date()).getTime();

			{/* Realiza la petición asicrónica cuando: 
                 (1) La estampa de tiempo de expiración (expiringTime) es nula, o  
                 (2) La estampa de tiempo actual es mayor al tiempo de expiración */}
			if (expiringTime === null || nowTime > parseInt(expiringTime)) {

				{/* Request */ }
				let API_KEY = "f3e21294613e1afd54db89981ed8dbd1"
				let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&mode=xml&appid=${API_KEY}`)
				savedTextXML = await response.text();

				{/* Diferencia de tiempo */ }
				let seconds = 3
				let delay = seconds * 1000

				{/* En el LocalStorage, almacena texto en la clave openWeatherMap y la estampa de tiempo de expiración */ }
				localStorage.setItem("openWeatherMap", savedTextXML)
				localStorage.setItem("expiringTime", (nowTime + delay).toString())
			}

			{/* XML Parser */ }
			const parser = new DOMParser();
			const xml = parser.parseFromString(savedTextXML ?? "", "application/xml");

			{/* Arreglo para agregar los resultados */ }
			let dataToIndicators = new Array()

			{/* 
				Análisis, extracción y almacenamiento del contenido del XML 
				en el arreglo de resultados
			*/}

			let temperatura = xml.getElementsByTagName("temperature")[0]
			let temperaturaAhora = (parseFloat(temperatura.getAttribute("value") ?? "") - 273.15).toFixed(1)
			let temperaturaMin = (parseFloat(temperatura.getAttribute("min") ?? "") - 273.15).toFixed(1)
			let temperaturaMax = (parseFloat(temperatura.getAttribute("max") ?? "") - 273.15).toFixed(1)
			let relaciónTemperatura = temperaturaMin.toString() + " min " + temperaturaMax.toString() + " max"

			let sensación = (parseFloat(xml.getElementsByTagName("feels_like")[0].getAttribute("value") ?? "") - 273.15).toFixed(1)

			let rawprecipitación = parseFloat(xml.getElementsByTagName("precipitation")[0].getAttribute("probability") ?? "") * 100
			let precipitación = rawprecipitación.toFixed(1).toString() + "%"

			let vientoV = xml.getElementsByTagName("windSpeed")[0]
			let velocidadViento = vientoV.getAttribute("mps") + " " + vientoV.getAttribute("unit")
			let vientoD = xml.getElementsByTagName("windDirection")[0]
			let direcciónViento = vientoD.getAttribute("deg") + "° " + vientoD.getAttribute("name")

			/*let sol = xml.getElementsByTagName("sun")[0]
			let amanecer = sol.getAttribute("rise")?.split("T")[1]
			DATOS ERRÓNEOS*/

			dataToIndicators.push(["Temperatura", relaciónTemperatura, temperaturaAhora])
			dataToIndicators.push(["Sensación", "La humedad lo hace sentir así", sensación])
			dataToIndicators.push(["Precipitación", "Probabilidad de lluvia", precipitación])
			dataToIndicators.push(["Viento", velocidadViento, direcciónViento])
			dataToIndicators.push(["Dato del sol", "Amanecer", "06:25:00"])//CONFIGURADO MANUAL, DATOS ERRÓNEOS

			{/* Renderice el arreglo de resultados en un arreglo de elementos Indicator */ }
			let indicatorsElements = Array.from(dataToIndicators).map(
				(element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
			)

			{/* Modificación de la variable de estado mediante la función de actualización */ }
			setIndicators(indicatorsElements)

			let arrayTiempos = Array.from(xml.getElementsByTagName("time")).map((elemento) => {

				let fromTime = elemento.getAttribute("from")?.split("T") ?? "";
				let día = fromTime[0].split("-")[2]
				let hora = fromTime[1].split(":").slice(0, 2).join(":")
				let rangeHours = "D" + día + " - " + hora

				let temperatura = (parseFloat(elemento.getElementsByTagName("temperature")[0].getAttribute("value") ?? "") - 273.15).toFixed(1)

				let sensación = (parseFloat(elemento.getElementsByTagName("feels_like")[0].getAttribute("value") ?? "") - 273.15).toFixed(1)

				let humedad = elemento.getElementsByTagName("humidity")[0].getAttribute("value")

				return { "horas": rangeHours, "temperatura": temperatura, "sensación": sensación, "humedad": humedad }
			})
			arrayTiempos = arrayTiempos.slice(0, 15)
			// @ts-ignore
			setVariables(arrayTiempos)

			{/* 
                 2. Procese los resultados de acuerdo con el diseño anterior.
                 Revise la estructura del documento XML para extraer los datos necesarios. 
             */}
			let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
				let fromTime = timeElement.getAttribute("from")?.split("T") ?? "";
				let día = fromTime[0].split("-")[2]
				let hora = fromTime[1].split(":").slice(0, 2).join(":")
				let rangeHours = "D" + día + " - " + hora

				let visibilidad = timeElement.getElementsByTagName("visibility")[0].getAttribute("value") ?? ""

				let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + "° " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")

				let windSpeed = timeElement.getElementsByTagName("windSpeed")[0].getAttribute("mps") + " " + timeElement.getElementsByTagName("windSpeed")[0].getAttribute("unit")

				let presión = timeElement.getElementsByTagName("pressure")[0].getAttribute("value") + " " + timeElement.getElementsByTagName("pressure")[0].getAttribute("unit")

				let rawprecipitación = parseFloat(timeElement.getElementsByTagName("precipitation")[0].getAttribute("probability") ?? "") * 100
				let precipitación = rawprecipitación.toFixed(1).toString() + "%"

				return { "rangeHours": rangeHours, "visibility": visibilidad, "windDirection": windDirection, "windSpeed": windSpeed, "pressure": presión, "precipitation": precipitación }
			})
			arrayObjects = arrayObjects.slice(0, 15)

			{/* 3. Actualice de la variable de estado mediante la función de actualización */ }
			setRowsTable(arrayObjects)

		})()
	}, [ciudad])


	return (
		<>
			<Navbar />
			{/* Ciudad */}
			<Grid xs={12} sx={{ padding: 5, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
				<Grid lg={9}>
					<Typography variant="h3" color={'black'} sx={{ fontFamily: "Playwrite NO, cursive", fontSize: "38px" }}>
						Información de {decodeURIComponent(ciudad)}
					</Typography>
				</Grid>
				<Grid lg={3}>
					<Select value={ciudad} onChange={handleCityChange} sx={{ width: 200, border: "3px solid #549FFF", borderRadius: "50px" }}>
						<MenuItem value="Guayaquil">Guayaquil</MenuItem>
						<MenuItem value="Santa%20Elena">Santa Elena</MenuItem>
						<MenuItem value="Quito">Quito</MenuItem>
						<MenuItem value="Latacunga">Latacunga</MenuItem>
						<MenuItem value="Cuenca">Cuenca</MenuItem>
						<MenuItem value="Azogues">Azogues</MenuItem>
						<MenuItem value="Tena">Tena</MenuItem>
						<MenuItem value="Gualaceo">Gualaceo</MenuItem>
						<MenuItem value="La%20Libertad">La Libertad</MenuItem>
					</Select>
				</Grid>
			</Grid>

			{/*Indicadores */}
			<Grid container xs={12} spacing={2} sx={{ padding: 2 }}>
				<Grid xs={6} lg={2}>
					<Paper sx={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{indicators[0]}</Paper>
				</Grid>
				<Grid xs={6} lg={3}>
					<Paper sx={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{indicators[1]}</Paper>
				</Grid>
				<Grid xs={12} lg={2}>
					<Paper sx={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{indicators[2]}</Paper>
				</Grid>
				<Grid xs={6} lg={3}>
					<Paper sx={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{indicators[3]}</Paper>
				</Grid>
				<Grid xs={6} lg={2}>
					<Paper sx={{ height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>{indicators[4]}</Paper>
				</Grid>
			</Grid>

			{/*Gráfico*/}
			<Grid container xs={12} spacing={1} sx={{ padding: 2 }}>
				<Grid container xs={12} spacing={2}>
					<Paper sx={{ margin: 1, padding: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: "#70BCFF" }}>
						<Grid container spacing={2} sx={{ width: '100%' }}>
							<Grid xs={12} lg={9} sx={{ display: 'flex', alignItems: 'center' }}>
								<Typography variant="h4" color={'black'} sx={{ textAlign: 'left', fontFamily: "Playwrite AU SA, cursive", fontSize: "28px" }}>
									Gráfico de variables meteorológicas
								</Typography>
							</Grid>
							<Grid xs={12} lg={3}>
								<ControlPanel valoresperado={setTunnel} />
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid xs={12}>
					<Paper sx={{ padding: 0, height: "500px", display: 'flex', flexDirection: 'column' }}>
						{/*@ts-ignore*/}
						<WeatherChart value={tunnel} variables={variables}></WeatherChart>
					</Paper>
				</Grid>
			</Grid>

			{/* Tabla */}
			<Grid container xs={12} spacing={1} sx={{ padding: 2 }}>
				<Grid xs={12}>
					<Paper sx={{ padding: 2, backgroundColor: "#70BCFF" }}>
						<Typography variant="h4" color={'black'} sx={{ textAlign: 'center', fontFamily: "Playwrite AU SA, cursive", fontSize: "28px" }}>
							Tabla informativa
						</Typography>
					</Paper>
				</Grid>
				<Grid xs={12}>
					<Paper sx={{ padding: 2 }}>
						<BasicTable rows={rowsTable}></BasicTable>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default App
