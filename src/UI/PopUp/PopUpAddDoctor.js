import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addDoctor, getDoctor } from '../../store/actions/doctor';


const PopUpAddDoctor = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addDoctor(data.nameDoctor, data.workplace, data.experience, data.details, data.education, data.experienceYear, data.doctorImage[0]));
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
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Tên bác sỹ" {...register("nameDoctor", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="150"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Chuyên ngành" {...register("workplace", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="150"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <textarea placeholder="Kinh nghiệm" {...register("experience", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    rows="10"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <textarea placeholder="Bằng cấp" {...register("details", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    rows="10"
                                />
                            </div>

                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Học vấn" {...register("education", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="500"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text" placeholder="Số năm kinh nghiệm" {...register("experienceYear", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="2"
                                />
                            </div>

                        </div>
                        <div className="row py-2">
                            <div className="col-md-12 col-12">
                                <input type="file" {...register("doctorImage", { required: true })}
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

export default PopUpAddDoctor
