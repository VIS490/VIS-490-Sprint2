import React, { useEffect, useState, createContext, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import { GET_WELLNESS_SCORE } from '../graphql/queries';

const Dashboard = (props) => {

    const [barChartData, setBarChartData] = useState()
    const barChart = () => {
        setBarChartData({
            labels: ['Work Load', 'Independence', 'Leader Support', 'Peer Relationships', 'Contribution and Impact', 'Development'],
            datasets: [
                {
                    label: 'Scores',
                    data: [3, 6, 8, 10, 9, 5],
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
                    data: [32, 45, 12, 76, 69, 50],
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
						text: 'Weekly Trend',
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

const WellnessScore = () => {
	const { currentUser } = useAuth()
	const email = currentUser.email
	const {loading ,error,data} = useQuery(GET_WELLNESS_SCORE,{
		variables:{email}
	})
	if(loading) return <div>'Loading...'</div>
	if (error) return `Error! ${error.message}`
	return <Dashboard wellnessScore = {data['Users'][0]['UserTests'][0]['Test']['score']}/>
}

export default WellnessScore