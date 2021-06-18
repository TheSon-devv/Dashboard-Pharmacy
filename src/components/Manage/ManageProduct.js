
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpAddProduct from '../../UI/PopUp/PopUpAddProduct'
import PopUpAddTypeProduct from '../../UI/PopUp/PopUpAddTypeProduct'
import ResultTableProduct from '../content/ResultTableProduct'
import { CSVLink } from "react-csv";

const ManageProduct = () => {
    const [show, setShow] = useState(false)
    const [showType, setShowType] = useState(false)
    const closeModal = () => setShow(false)
    const closeModalType = () => setShowType(false)
    const dispatch = useDispatch()
    const product = useSelector(state => state.product.productList);

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <div style={{ display: 'flex' }}>
                    <button className="btn btn-success" onClick={() => setShow(true)}>Thêm sản phẩm</button>
                    <div style={{ marginLeft: 20 }}>
                        <button className="btn btn-success" onClick={() => setShowType(true)}>Thêm loại thuốc</button>
                    </div>
                    <CSVLink data={product} className="btn btn-info" style={{ marginLeft: 15 }}>
                        Thống kê CSV
                    </CSVLink>
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

