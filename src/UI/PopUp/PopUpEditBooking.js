import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { getBooking, updateBooking } from '../../store/actions/booking';


const PopUpEditBlog = (props) => {
    const [data, setData] = useState({
        nameCustomer: "",
        phone: "",
        information: "",
        doctor: "",
        status: 0,
        address: ""
    });
    const booking = useSelector(state => state.booking.bookingList);
    const doctorList = useSelector(state => state.doctor.doctorList);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateBooking(props.dataEdit, data.nameCustomer, data.phone, data.information, data.doctor, parseInt(data.status) ,data.address));
        setTimeout(() => {
            dispatch(getBooking())
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
            blogImage: e.target.files[0]
        })
    }
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (props.dataEdit !== 0) {
                setData({
                    ...booking.find(x => x._id === props.dataEdit)
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
                                    name="nameCustomer"
                                    value={data.nameCustomer}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="phone"
                                    value={data.phone}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-6 col-12">
                                <select
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="doctor"
                                    value={data.doctor}
                                    onChange={updateHandlerChanged}
                                >
                                    {
                                        doctorList.map(item => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.nameDoctor}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 col-12">
                                <select
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="status"
                                    value={data.status}
                                    onChange={updateHandlerChanged}
                                >
                                    <option value="0">Chưa xác nhận</option>
                                    <option value="1">Xác nhận</option>
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
                                    rows="10"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <textarea type="text"
                                    placeholder="Địa chỉ nhà"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="address"
                                    value={data.address}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    rows="10"
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

export default PopUpEditBlog
