
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PopUpAddCustomer from '../../UI/PopUp/PopUpAddCustomer'
import ResultTableOrder from '../../components/content/ResultTableOrder'

const ManageOrder = () => {
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                {/* <button className="btn btn-success" onClick={() => setShow(true)}>Thêm đơn</button> */}
                {
                    show ? (
                        <PopUpAddCustomer
                            open={show}
                            closeModal={closeModal}
                            title="Thêm khách hàng"
                        />
                    ) : null
                }
                <ResultTableOrder />
            </div>
        </div>
    )
}

export default ManageOrder
