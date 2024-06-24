//import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Indicator from './components/Indicator';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
	//const [count, setCount] = useState(0)

	return (
		<Grid
			container
			spacing={5}
			justifyContent="space-between"
		>
			<Grid xs={0} sm={0} md={1} lg={2}></Grid>
			<Grid xs={12} sm={6} md={5} lg={4}>
				<Indicator title="Precipitación" subtitle="Probabilidad" value={0.13} />
			</Grid>
			<Grid xs={12} sm={6} md={5} lg={4}>
				<Summary></Summary>
			</Grid>
			<Grid xs={0} sm={0} md={1} lg={2}></Grid>
			<Grid xs={12} sm={12} md={12} lg={12}>
				<BasicTable />
			</Grid>
			<Grid xs={12} lg={10}>
				<WeatherChart></WeatherChart>
			</Grid>
			<Grid xs={12} lg={2}>
				<ControlPanel />
			</Grid>
		</Grid>
	)
}

export default App
