import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { headerAuthorization } from '../../header';
import { getOrder } from '../../store/actions/order';
import Cards from './Cards/Cards';

const Home = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const [checkout, setCheckout] = useState(0)
    const [customer, setCustomer] = useState(0)
    const [pharmacy, setPharmacy] = useState(0)
    const [message, setMessage] = useState(0)
    const [dataDaily, setDataDaily] = useState([])

    // const convertDate = (date) => {
    //     let todayTime = new Date(date);
    //     let month = todayTime.getMonth() + 1;
    //     let day = todayTime.getDate();
    //     let year = todayTime.getFullYear();
    //     let hours = todayTime.getHours();
    //     let minutes = todayTime.getMinutes();
    //     let seconds = todayTime.getSeconds();
    //     if (day < 10) {
    //         day = "0" + day;
    //     }
    //     if (month < 10) {
    //         month = "0" + month;
    //     }
    //     if (hours < 10) {
    //         hours = "0" + hours;
    //     }
    //     if (minutes < 10) {
    //         minutes = "0" + minutes;
    //     }
    //     if (seconds < 10) {
    //         seconds = "0" + seconds;
    //     }
    //     return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    // };


    const getSumCheckOut = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/checkout`, headerAuthorization())
            .then(res => {
                console.log(res.data, 'data')
                console.log(res.data.getTotalPriceDay, 'getTotalPriceDay')
                setDataDaily(res.data.getTotalPriceDay)
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err));
        axios.get(`${process.env.REACT_APP_BASE_URL}/statistical`)
            .then(res => {
                setCheckout(res.data.checkout);
                setCustomer(res.data.customer);
                setPharmacy(res.data.pharmacy);
                setMessage(res.data.totalMessage);
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getSumCheckOut()
    }, [])

    return (
        <>
            <Cards totalCheckout={checkout} totalCustomer={customer} totalPharmacy={pharmacy} totalMessage={message} />

            <Line
                data={{
                    labels: dataDaily.map(({ _id }) => _id),
                    datasets: [{
                        data: dataDaily.map(({ totalAmount }) => totalAmount),
                        label: 'Tổng tiền thu được theo ngày',
                        borderColor: 'rgba(0, 211, 112, 0.5)',
                        fill: true,
                        backgroundColor: 'rgba(0, 211, 112, 0.5)',
                    }]
                }}
            />

        </>

    )
}

export default Home
