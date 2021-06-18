
import React from 'react';
import { CSVLink } from "react-csv";
import { useSelector } from 'react-redux';
import ResultTableOrder from '../../components/content/ResultTableOrder';

const ManageOrder = () => {
    const order = useSelector(state => state.order.orderList);

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <CSVLink data={order} className="btn btn-info" style={{ marginLeft: 15 }}>
                    Thống kê CSV
                </CSVLink>
                <ResultTableOrder />
            </div>
        </div>
    )
}

export default ManageOrder
