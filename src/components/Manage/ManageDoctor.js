
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpAddDoctor from '../../UI/PopUp/PopUpAddDoctor'
import ResultTableDoctor from '../content/ResultTableDoctor'
import { CSVLink } from "react-csv";

const ManageDoctor = () => {
    const [show, setShow] = useState(false)
    const [showType, setShowType] = useState(false)
    const closeModal = () => setShow(false)
    const closeModalType = () => setShowType(false)
    const dispatch = useDispatch()
    const doctor = useSelector(state => state.doctor.doctorList);

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <button className="btn btn-success" onClick={() => setShow(true)}>Thêm bác sỹ</button>
                {
                    show ? (
                        <PopUpAddDoctor
                            open={show}
                            closeModal={closeModal}
                            title="Thêm bác sỹ mới"
                        />
                    ) : null
                }
                <CSVLink data={doctor} className="btn btn-info" style={{ marginLeft: 15 }}>
                    Thống kê CSV
                </CSVLink>
                <ResultTableDoctor />
            </div>
        </div>
    )
}

export default ManageDoctor

