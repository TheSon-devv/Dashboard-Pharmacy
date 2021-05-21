import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { getCustomer, updateCustomer } from '../../store/actions/customers';


const PopUpEditCustomer = (props) => {
    const [data, setData] = useState({
        nameKH: "",
        nameLogin: "",
        password: "",
        phoneNumber: ""
    });
    const customer = useSelector(state => state.customer.customerList);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateCustomer(props.dataEdit, data.nameKH, data.nameLogin, data.password, data.phoneNumber));
        setTimeout(() => {
            dispatch(getCustomer())
        },1000)
    }
    const updateHandlerChanged = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (props.dataEdit !== 0) {
                setData({
                    ...customer.find(x => x._id === props.dataEdit)
                })
            }
        }
        return () => (isSubscribed = false)
    }, [props.dataEdit])
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
                                    name="nameKH"
                                    value={data.nameKH}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="5"
                                />
                            </div>
                            <div className="col-md-6 col-12">

                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="nameLogin"
                                    value={data.nameLogin}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="50"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="password"
                                    value={data.password}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="11"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="phoneNumber"
                                    value={data.phoneNumber}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="11"
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

export default PopUpEditCustomer
