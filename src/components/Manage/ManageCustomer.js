
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getArea } from '../../store/actions/area'
import PopUpAddCustomer from '../../UI/PopUp/PopUpAddCustomer'
import ResultTableCustomer from '../../components/content/ResultTableCustomer'

const ManageCustomer = () => {
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <button className="btn btn-success" onClick={() => setShow(true)}>Show add</button>
                {
                    show ? (
                        <PopUpAddCustomer
                            open={show}
                            closeModal={closeModal}
                            title="Thêm khách hàng"
                        />
                    ) : null
                }
                <ResultTableCustomer />
            </div>
        </div>
    )
}

export default ManageCustomer
