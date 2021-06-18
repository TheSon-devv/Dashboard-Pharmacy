
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpAddCustomer from '../../UI/PopUp/PopUpAddCustomer'
import ResultTableCustomer from '../../components/content/ResultTableCustomer'
import { CSVLink } from "react-csv";

const ManageCustomer = () => {
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)
    const dispatch = useDispatch()
    const dataCustomer = useSelector(state => state.customer.customerList)

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <button className="btn btn-success" onClick={() => setShow(true)}>Thêm khách hàng</button>
                {
                    show ? (
                        <PopUpAddCustomer
                            open={show}
                            closeModal={closeModal}
                            title="Thêm khách hàng"
                        />
                    ) : null
                }
                <CSVLink data={dataCustomer} className="btn btn-info" style={{marginLeft:15}}>
                    Thống kê CSV 
                </CSVLink>
                <ResultTableCustomer />
            </div>
        </div>
    )
}

export default ManageCustomer
