import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import { GET_WELLNESS_SCORE } from '../graphql/queries'
import { GET_LINECHART_SCORES } from '../graphql/queries'

const Dashboard = (props) => {
	const [barChartData, setBarChartData] = useState()
	const barChart = () => {
		setBarChartData({
			labels: ['Work Load', 'Peer Relations', 'Impact', 'Leader Support', 'Development', 'Autonomy'],
			datasets: [
				{
					label: 'Scores',
					data: [props.workLoad, props.peerRelations, props.impact, props.leaderSupport, props.development, props.autonomy],
					backgroundColor: [
						'rgba(75, 192, 192, 0.6)',
						'rgba(55, 92, 12, 0.6)',
						'rgba(95, 2, 19, 0.6)',
						'rgba(25, 19, 92, 0.6)',
						'rgba(45, 9, 2, 0.6)',
						'rgba(35, 192, 86, 0.6)'
					],
					borderWidth: 4
				}
			]
		})
	}
	const [lineChartData, setLineChartData] = useState()
	const lineChart = () => {
		setLineChartData({
			labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
			datasets: [
				{
					label: 'Scores',
					data: props.label,
					backgroundColor: [
						'rgba(75, 192, 192, 0.6)',
					],
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
		<div className="Dashboard">
			<h1 style={{ borderRadius: 100, borderWidth: 10, borderColor: 'black' }}>Wellness Score: {props.wellnessScore}</h1>
			<div style={{ float: 'right', width: '500px', }}>
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
								ticks: {
									beginAtZero: true
								}
							}
						]
					}
				}} />
			</div>
			<div style={{ width: '900px' }}>
				<Line data={lineChartData} options={{
					responsive: true,
					title: {
						text: 'Wellness Score Trend',
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
								ticks: {
									beginAtZero: true
								}
							}
						]
					}
				}} />
			</div>

		</div>

	)
}

const AllScores = () => {
	const { currentUser } = useAuth()
	const email = currentUser.email
	var label = []
	const { loading: loadingR, error: errorR, data: dataR } = useQuery(GET_LINECHART_SCORES, {
		variables: { email }
	})

	const { loading: loadinG, error: erroR, data: datA } = useQuery(GET_WELLNESS_SCORE, {
		variables: { email }
	})

	if (loadingR) return <div>Loading...</div>
	if (loadinG) return <div>Loading...</div>
	if (errorR) return `Error! ${errorR.message}`
	if (erroR) return `Error! ${errorR.message}`
	label = dataR['Users'].map(score => {
		return score.user_tests_rel[0].Test.score
	})
	console.log(label)
	return <Dashboard wellnessScore={datA['Users'][0]['user_tests_rel'][0]['Test']['score']}
		workLoad={datA['Users'][0]['user_tests_rel'][0]['Test']['work_load_score']}
		peerRelations={datA['Users'][0]['user_tests_rel'][0]['Test']['peer_relations_score']}
		impact={datA['Users'][0]['user_tests_rel'][0]['Test']['impact_score']}
		leaderSupport={datA['Users'][0]['user_tests_rel'][0]['Test']['leader_support_score']}
		development={datA['Users'][0]['user_tests_rel'][0]['Test']['development_score']}
		autonomy={datA['Users'][0]['user_tests_rel'][0]['Test']['autonomy_score']}
		label={label}
	/>
}
export default AllScores