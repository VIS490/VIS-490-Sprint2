import React, { useEffect, useState, createContext, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const [wellnessScore,setWellnessScore]=useState(0)
    const [autonomyScore,setAutonomyScore]=useState(0)
    const [developmentScore,setDevelopmentScore]=useState(0)
    const [impactScore,setImpactScore]=useState(0)
    const [leaderSupportScore,setLeaderSupportScore]=useState(0)
    const [peerRelationsScore,setPeerRelationsScore]=useState(0)
    const [workLoadScore,setWorkLoadScore]=useState(0)
    const [lineScore, setLineScore]=useState(0)
    const { currentUser } = useAuth()
    const email=currentUser.email

    const queryStringLine = gql`
    query ($email:String!){
        Tests(where: {
            User:{
              email:{
                _eq:$email
              }
            }
          }){
            score
          }
        }`
    
    const queryStringWellness = gql`
    query ($email:String!){
        Tests(where: {
              User:{
                email:{
                  _eq:$email
                }
              }
            }){
              
              autonomy_score
              development_score
              impact_score
              leader_support_score
              peer_relations_score
              work_load_score
              score
            
            }
          }`
    

    const Score = async () => {
        try{
            const { loading, error, data } = await useQuery(queryStringWellness,{variables:{email:email}})
            if (loading) return null;
            if (error) return `Error! ${error}`;
            console.log(autonomyScore)
            console.log(wellnessScore)
            setAutonomyScore(data.Tests[0].autonomy_score)
            //setDevelopmentScore(data.Tests[0].development_score)
            // setImpactScore(data.Tests[0].impact_score)
            // setLeaderSupportScore(data.Tests[0].leader_support_score)
            // setPeerRelationsScore(data.Tests[0].peer_relations_score)
            // setWorkLoadScore(data.Tests[0].work_load_score)
            setWellnessScore(data.Tests[0].score)
            // //function ListScore(props){
                //const Tests=data.Tests;
                //const scoreList = Tests.map((scOre.score));
                //console.log(scoreList)
            //}

        }
        catch(e){
            console.log("this")
            setWellnessScore(0)
            setAutonomyScore(0)
            setDevelopmentScore(0)
            setImpactScore(0)
            setLeaderSupportScore(0)
            setPeerRelationsScore(0)
            setWorkLoadScore(0)
            setLineScore(0)
        }

	}
    Score()

    
    
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
			<h1 style={{ borderRadius: 100, borderWidth: 10, borderColor: 'black' }}>Wellness Score: {wellnessScore}</h1>
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