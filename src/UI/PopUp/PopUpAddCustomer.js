import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addCustomer, getCustomer } from '../../store/actions/customers';


const PopUpAdd = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        await dispatch(addCustomer(data.nameKH, data.nameLogin, data.password, data.phoneNumber));
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
                                <input type="text" placeholder="Tên Khách Hàng" {...register("nameKH", { required: true, maxLength: 10 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="10"
                                />
                            </div>
                            <div className="col-md-6 col-12">

                                <input type="text" placeholder="Tên đăng nhập" {...register("nameLogin", { required: true, maxLength: 50 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="50"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <input type="password" placeholder="Password" {...register("password", { required: true, maxLength: 11 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="11"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Điện thoại" {...register("phoneNumber", { required: true, maxLength: 11 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
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

export default PopUpAdd
