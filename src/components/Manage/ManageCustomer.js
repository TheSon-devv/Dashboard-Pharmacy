
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
                <ResultTableCustomer />
            </div>
        </div>
    )
}

export default ManageCustomer
