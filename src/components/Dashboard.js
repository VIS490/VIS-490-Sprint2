import React, { useEffect, useState, createContext, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth()
    const email=currentUser.email
    
    const condition = ' where: {email: {_eq: ' + '"' + email + '"' + '}}'
    const queryStringLine = `
		query  {
            Users(limit: 1,
                ` + condition + `
                ) {
			        UserTests(order_by: {created_at: asc_nulls_first}) {
                    Test {
                        score
                    }
                }
			}
        }`
    
    const GET_LINEGRAPH_SCORE = gql`${queryStringLine}`

    const queryStringBar = `
		query  {
            Users(` + condition + `) {
			    UserTests(order_by: {created_at: desc_nulls_last}, limit: 1) {
                    Test {
                        work_load_score
                        peer_relations_score
                        leader_support_score
                        impact_score
                        development_score
                        autonomy_score
                    }
                }
			}
        }`
    const GET_BARGRAPH_SCORE = gql`${queryStringBar}`

    const queryStringWellness = `
	query  {
        Users(` + condition + `) {
			UserTests(order_by: {created_at: desc_nulls_last}, limit: 1) {
                Test {
                    score
                }
            }
		}
    }`
    
    const GET_WELLNES_SCORE = gql`${queryStringWellness}`

    const setUserName = async () => {
		const { data } = await useQuery(GET_WELLNES_SCORE)
		//let name = data['Users'][0].name
        //setName(name)
        console.log(data)
	}

	setUserName()
    
    //console.log(JSON.stringify(da))
    //const email = currentUser.
    //const [wellTodo] = useQuery(GET_WELLNESS_SCORE)
    //const [barTodo] = useQuery(GET_BARGRAPH_SCORES)
    //const [lineTodo] = useQuery(GET_LINEGRAPH_SCORES)

    const [barChartData, setBarChartData] = useState()
    const barChart = () => {
        setBarChartData({
            labels: ['Work Load', 'Independence', 'Leader Support', 'Peer Relationships', 'Contribution and Impact', 'Development'],
            datasets: [
                {
                    label: 'Scores',
                    data: [32, 45, 12, 76, 69, 50],
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
			<h1 style={{ borderRadius: 100, borderWidth: 10, borderColor: 'black' }}>Wellness Score: 89</h1>
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

export default Dashboard