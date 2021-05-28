import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addProduct, getProduct } from '../../store/actions/product';


const PopUpAdd = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const typeProduct = useSelector(state => state.product.typeProduct)

    const onSubmit = (data) => {
        dispatch(addProduct(data.namePharmacy, data.typePharmacy, data.pricePharmacy, data.status, data.promotion, data.information, data.pharmacyImage[0]));
        setTimeout(() => {
            dispatch(getProduct())
        }, 1000)
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
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Tên sản phẩm" {...register("namePharmacy", { required: true, maxLength: 50 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="50"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Đơn giá ex : 7 $" {...register("pricePharmacy", { required: true, maxLength: 11 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="2"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <select {...register("status", { required: true, maxLength: 11 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                >
                                    <option value="New">Mới</option>
                                    <option value="Old">Cũ</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-12">
                                <select {...register("promotion")}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                >
                                    <option value="">Khuyến mãi</option>
                                    <option value="5">5%</option>
                                    <option value="10">10%</option>
                                    <option value="15">15%</option>
                                    <option value="20">20%</option>
                                    <option value="25">25%</option>
                                    <option value="30">30%</option>
                                </select>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <textarea placeholder="Thông tin sản phẩm" {...register("information", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <select {...register("typePharmacy", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                >
                                    <option value="">Loại thuốc</option>
                                    {
                                        typeProduct.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.nameTypePharmacy}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="row py-2">
                            <div className="col-md-12 col-12">
                                <input type="file" {...register("pharmacyImage", { required: true })}
                                // className="w-100 form-control focus-remove-shadow"
                                // style={{ boxShadow: "none !important" }}
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

export default PopUpAdd
