
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PopUpAddDoctor from '../../UI/PopUp/PopUpAddDoctor'
import ResultTableDoctor from '../content/ResultTableDoctor'

const ManageDoctor = () => {
    const [show, setShow] = useState(false)
    const [showType, setShowType] = useState(false)
    const closeModal = () => setShow(false)
    const closeModalType = () => setShowType(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <div >
                    <button className="btn btn-success" onClick={() => setShow(true)}>Thêm bác sỹ</button>
                </div>
                {
                    show ? (
                        <PopUpAddDoctor
                            open={show}
                            closeModal={closeModal}
                            title="Thêm bác sỹ mới"
                        />
                    ) : null
                }
                <ResultTableDoctor />
            </div>
        </div>
    )
}

export default ManageDoctor

