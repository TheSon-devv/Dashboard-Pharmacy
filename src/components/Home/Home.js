import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { headerAuthorization } from '../../header';
import { getOrder } from '../../store/actions/order';

const Home = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({})


    const getSumCheckOut = () => {
        let count = [];
        let nameKH = [];

        axios.get(`${process.env.REACT_APP_BASE_URL}/checkout`, headerAuthorization())
            .then(res => {

                if (res.data.code === 200) {
                    for (const i of res.data.getSumCheckout) {
                        count.push(parseInt(i.count))
                        axios.get(`${process.env.REACT_APP_BASE_URL}/customer/${i._id[0]}`, headerAuthorization())
                            .then(res => {
                                console.log(res.data.getCustomer.email, 'asdas');
                                nameKH.push(res.data.getCustomer.email);
                                setData({
                                    labels: nameKH,
                                    datasets: [
                                        {
                                            data: count,
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                // 'rgba(75, 192, 192, 0.2)',
                                                // 'rgba(153, 102, 255, 0.2)',
                                                // 'rgba(255, 159, 64, 0.2)',
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                // 'rgba(75, 192, 192, 1)',
                                                // 'rgba(153, 102, 255, 1)',
                                                // 'rgba(255, 159, 64, 1)',
                                            ],
                                            borderWidth: 1,
                                        },
                                        // {
                                        //   label: 'Quantity',
                                        //   data: [47, 52, 67, 58, 9, 50],
                                        //   backgroundColor: 'orange',
                                        //   borderColor: 'red',
                                        // },
                                    ],
                                })
                            }).catch(err => console.log(err))
                    }

                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getSumCheckOut()
    }, [])

    return (
        <Pie
            className="py-2 px-3"
            data={data}
            height={350}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
                legend: {
                    labels: {
                        fontSize: 25,
                    },
                },
            }}
        />

    )
}

export default Home
