import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import { GET_WELLNESS_SCORE } from '../graphql/queries'
import { GET_LINECHART_SCORES } from '../graphql/queries'
import Paper from '@material-ui/core/Paper'

const Dashboard = (props) => {
	const [barChartData, setBarChartData] = useState()
	const barChart = () => {
		setBarChartData({
			labels: ['Work Load', 'Peer Relations', 'Impact', 'Leader Support', 'Development', 'Autonomy'],
			datasets: [
				{
					label: 'Category Scores',
					data: [props.workLoad, props.peerRelations, props.impact, props.leaderSupport, props.development, props.autonomy],
					backgroundColor: [
						'rgba(179, 205, 224, 0.8)',
						'rgba(100, 151, 177, 0.8)',
						'rgba(0, 91, 150, 0.8)',
						'rgba(3, 57, 108, 0.8)',
						'rgba(1, 31, 75, 0.8)',
						'rgba(0, 25, 46, 0.8)'
					],
					borderWidth: 4
				}
			]
		})
	}
	const [lineChartData, setLineChartData] = useState()
	const lineChart = () => {
		setLineChartData({
			labels: props.date,
			datasets: [
				{
					label: 'Wellness Score',
					data: props.label,
					backgroundColor: [
						'rgba(7, 55, 92, 0.75)'
					],
					borderColor: 'rgb(7, 55, 92, 0.9)',
					borderWidth: 4
				}
			]
		})
	}

	useEffect(() => {
		barChart()
		lineChart()
	}, [])

	return (
		<div className="Dashboard" style={{ margin: 'auto', padding: '0%', marginRight:'17%', marginTop: '5px'}}>
			<Paper elevation={24} square={false} style={{ display: 'inline-block', margin: '25px', padding: '20px', marginTop:'10%', marginBottom: '3%', textAlign: 'center', verticalAlign: 'middle'}}>
				<h1 style={{color:'dimgray'}}>Current Wellness Score: {props.wellnessScore}</h1>
			</Paper>
			<Paper elevation={24} style={{ float: 'right', width: '500px', margin:'auto', marginTop: '5%', marginRight: '20px', padding:'25px'}}>
				<div>
					<Bar data={barChartData} options={{
						responsive: true,
						title: {
							text: 'Topic Breakdown',
							display: true,
							fontSize: 25,
							fontStyle: 'bold'
						},
						layout: {
							padding: 5
						},
						scales: {
							yAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Score Range'
									},
									ticks: {
										beginAtZero: true
									}
								}
							],
							xAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Categories'
									}
								}
							]
						}
					}} />
				</div>
			</ Paper>
			<Paper elevation={24} style={{ margin:'auto', padding:'auto', marginTop:'13%'}}>
				<div>
					<Line data={lineChartData} options={{
						responsive: true,
						title: {
							text: 'Weekly Wellness Score Trend',
							display: true,
							fontSize: 25,
							fontStyle: 'bold'
						},
						layout: {
							padding: 50
						},
						scales: {
							yAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Score Range'
									},
									ticks: {
										beginAtZero: true
									}
								}
							],
							xAxes: [
								{
									scaleLabel: {
										display: true,
										labelString: 'Last Survey from this Week'
									}
								}
							]
						}
					}} />
				</div>
			</ Paper>
		</div>
	)
}

const AllScores = () => {
	const { currentUser } = useAuth()
	const email = currentUser.email
	var label = []
	var items = []
	var i, ws, wl, pr, im, ls, dv, ay
	
	const { loading: loadingR, error: errorR, data: dataR } = useQuery(GET_LINECHART_SCORES, {
		variables: { email }
	})

	const { loading: loadinG, error: erroR, data: datA } = useQuery(GET_WELLNESS_SCORE, {
		variables: { email }
	})
	var check= datA

	if (loadingR) return <div>Loading...</div>
	if (loadinG) return <div>Loading...</div>
	if (errorR) return `Error! ${errorR.message}`
	if (erroR) return `Error! ${errorR.message}`
	
	if (Object.keys(check.UserTests).length==0){
		ws, wl, pr, im, ls, dv, ay = 0
		label = [0]
	} 
	else{
		ws=Math.round(datA['UserTests'][0]['Test'].score)
		wl=datA['UserTests'][0]['Test'].work_load_score
		pr=datA['UserTests'][0]['Test'].peer_relations_score
		im=datA['UserTests'][0]['Test'].impact_score
		ls=datA['UserTests'][0]['Test'].leader_support_score
		dv=datA['UserTests'][0]['Test'].development_score
		ay=datA['UserTests'][0]['Test'].autonomy_score
		label = dataR['UserTests'].map(score => {
			return score.Test.score
		})
	}

	for (i=0; i <label.length;i++){
		items.push(i+1)
	}

	return <Dashboard wellnessScore={ws}
		workLoad={wl}
		peerRelations={pr}
		impact={im}
		leaderSupport={ls}
		development={dv}
		autonomy={ay}
		label={label}
		date={items}
	/>
}
export default AllScores