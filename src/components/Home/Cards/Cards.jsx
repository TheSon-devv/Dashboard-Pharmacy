import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import classes from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({ totalCheckout, totalCustomer, totalPharmacy ,totalMessage}) => {

    const convertDate = (date) => {
        let todayTime = new Date(date);
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        let year = todayTime.getFullYear();
        let hours = todayTime.getHours();
        let minutes = todayTime.getMinutes();
        let seconds = todayTime.getSeconds();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };
    return (
        <div className={classes.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={4} className={cx(classes.card, classes.totalCheckout)} style={{backgroundColor:"rgba(51, 51, 255, 0.5)"}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tổng đơn hàng 
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalCheckout}
                                duration={2}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">
                            Lần cập nhật cuối cùng : {convertDate(lastUpdate)}
                        </Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cx(classes.card, classes.totalCustomer)} style={{backgroundColor:"rgba(0, 211, 112, 0.5)"}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tổng khách hàng đăng ký tài khoản
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalCustomer}
                                duration={2}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">
                            Lần cập nhật cuối cùng : {convertDate(lastUpdate)}
                        </Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cx(classes.card, classes.totalPharmacy)} style={{backgroundColor:"rgba(255, 47, 47, 0.5)"}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tổng số thuốc có trong kho
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalPharmacy}
                                duration={2}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">
                            Lần cập nhật cuối cùng : {convertDate(lastUpdate)}
                        </Typography> */}
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={4} className={cx(classes.card, classes.totalMessage)} style={{backgroundColor:"rgba(112, 191, 255, 0.5)"}}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            Tổng số bệnh nhân đặt lịch khám tại nhà
                        </Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={totalMessage}
                                duration={2}
                                separator=","
                            />
                        </Typography>
                        {/* <Typography color="textSecondary">
                            Lần cập nhật cuối cùng : {convertDate(lastUpdate)}
                        </Typography> */}
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
