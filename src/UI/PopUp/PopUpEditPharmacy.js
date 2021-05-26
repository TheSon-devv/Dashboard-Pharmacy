import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { getProduct, updateProduct } from '../../store/actions/product';


const PopUpEditPharmacy = (props) => {
    const [data, setData] = useState({
        namePharmacy: "",
        typePharmacy: "",
        pricePharmacy: "",
        information: "",
        status: "",
        promotion: "",
        pharmacyImage: null,
    });
    const product = useSelector(state => state.product.productList);
    const typeProduct = useSelector(state => state.product.typeProduct)
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateProduct(props.dataEdit, data.namePharmacy, data.pricePharmacy, data.status, data.promotion, data.information, data.pharmacyImage));
        setTimeout(() => {
            dispatch(getProduct())
        }, 1000)
    }

    const updateHandlerChanged = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const updateFileChanged = (e) => {
        setData({
            ...data,
            pharmacyImage: e.target.files[0]
        })
    }
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (props.dataEdit !== 0) {
                setData({
                    ...product.find(x => x._id === props.dataEdit)
                })
            }
        }
        return () => (isSubscribed = false)
    }, [props.dataEdit])
    console.log(props)
    return (
        <div className="container px-3">
            <Popup open={props.open} closeOnDocumentClick onClose={props.closeModal} modal>
                <div className="py-3 mx-3">
                    <h3 className="font-weight-bold text-dark">
                        {props.title}
                    </h3>
                </div>
                <div className="px-3">
                    <form onSubmit={onSubmit}>
                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="namePharmacy"
                                    value={data.namePharmacy}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="50"
                                />
                            </div>
                            <div className="col-md-6 col-12">

                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="pricePharmacy"
                                    value={data.pricePharmacy}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="50"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <select
                                    name="status"
                                    value={data.status}
                                    onChange={updateHandlerChanged}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                >
                                    <option value="New">Mới</option>
                                    <option value="Old">Cũ</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-12">

                                <select
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="promotion"
                                    value={data.promotion}
                                    onChange={updateHandlerChanged}
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
                                <textarea type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="information"
                                    value={data.information}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="file"
                                    name="updateFileChanged"
                                    value={data.updateFileChanged}
                                    onChange={updateFileChanged}
                                    required={true}
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

export default PopUpEditPharmacy
