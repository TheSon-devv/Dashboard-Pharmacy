
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PopUpAddProduct from '../../UI/PopUp/PopUpAddProduct'
import ResultTableProduct from '../content/ResultTableProduct'

const ManageProduct = () => {
    const [show, setShow] = useState(false)
    const closeModal = () => setShow(false)
    const dispatch = useDispatch()

    return (
        <div className="container-fluid mt-2">
            <div className="content">
                <button className="btn btn-success" onClick={() => setShow(true)}>Add Food</button>
                {
                    show ? (
                        <PopUpAddProduct
                            open={show}
                            closeModal={closeModal}
                            title="Thêm sản phẩm thuốc"
                        />
                    ) : null
                }
                <ResultTableProduct />
            </div>
        </div>
    )
}

export default ManageProduct

