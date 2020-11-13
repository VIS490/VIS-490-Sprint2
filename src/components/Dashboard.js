import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';


const Dashboard = () => {
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
            <h1>Wellness Score: 89</h1>
            <div style={{ float: "right", width: "500px", }}>
                <Bar data={barChartData} options={{

                    responsive: true,
                    title: { text: 'Topic Breakdown', display: true },
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
            <div style={{ width: "900px" }}>
                <Line data={lineChartData} options={{
                    responsive: true,
                    title: { text: 'Weekly Trend', display: true },
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