import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addTypeProduct, getProduct } from '../../store/actions/product';


const PopUpAddTypeProduct = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const typeProduct = useSelector(state => state.product.typeProduct)

    const onSubmit = (data) => {
        dispatch(addTypeProduct(data.namePharmacy))
        // setTimeout(() => {
        //     dispatch(getProduct())
        // }, 1000)
    }
    return (
        <div className="container px-3">
            <Popup open={props.open} closeOnDocumentClick onClose={props.closeModal} modal>
                <div className="py-3 mx-3">
                    <h3 className="font-weight-bold text-dark">
                        {props.title}
                    </h3>
                </div>
                <div className="px-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row py-2">
                            <div className="col-md-12 col-12">
                                <input type="text" placeholder="Tên loại thuốc" {...register("namePharmacy", { required: true, maxLength: 50 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="50"
                                />
                            </div>
                            
                        </div>

                        <div className="py-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn btn-info">Xác nhận</button>
                            <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={props.closeModal}>Hủy</button>
                        </div>
                    </form>
                </div>
            </Popup>
        </div>
    )
}

export default PopUpAddTypeProduct
