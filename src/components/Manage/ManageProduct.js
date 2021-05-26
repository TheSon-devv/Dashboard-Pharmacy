
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PopUpAddProduct from '../../UI/PopUp/PopUpAddProduct'
import PopUpAddTypeProduct from '../../UI/PopUp/PopUpAddTypeProduct'
import ResultTableProduct from '../content/ResultTableProduct'

const ManageProduct = () => {
    const [show, setShow] = useState(false)
    const [showType, setShowType] = useState(false)
    const closeModal = () => setShow(false)
    const closeModalType = () => setShowType(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <div style={{ display: 'flex' }}>
                    <button className="btn btn-success" onClick={() => setShow(true)}>Thêm sản phẩm</button>
                    <div style={{marginLeft:20}}>
                        <button className="btn btn-success" onClick={() => setShowType(true)}>Thêm loại thuốc</button>
                    </div>
                </div>
                {
                    show ? (
                        <PopUpAddProduct
                            open={show}
                            closeModal={closeModal}
                            title="Thêm sản phẩm thuốc"
                        />
                    ) : null
                }
                {
                    showType ? (
                        <PopUpAddTypeProduct
                            open={showType}
                            closeModal={closeModalType}
                            title="Thêm loại thuốc"
                        />
                    ) : null
                }
                <ResultTableProduct />
            </div>
        </div>
    )
}

export default ManageProduct

