import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addBlog, getBlog } from '../../store/actions/blog';


const PopUpAdd = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const adminCreate = localStorage.getItem('userId');
    const onSubmit = (data) => {
        dispatch(addBlog(data.nameBlog, data.information, adminCreate, data.blogImage[0]));
        setTimeout( () => {
            dispatch(getBlog())
        },1000)
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
                                <input type="text" placeholder="Tiêu đề bài đăng" {...register("nameBlog", { required: true, maxLength: 50 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="50"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="file" {...register("blogImage", { required: true })}
                                // className="w-100 form-control focus-remove-shadow"
                                // style={{ boxShadow: "none !important" }}
                                />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-md-12 col-12">
                                <textarea {...register("information", { required: true })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
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
