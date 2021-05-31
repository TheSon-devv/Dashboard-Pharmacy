import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { updateDoctor,getDoctor } from '../../store/actions/doctor';


const PopUpEditPharmacy = (props) => {
    const [data, setData] = useState({
        nameDoctor: "",
        workplace: "",
        experience: "",
        details: "",
        education: "",
        experienceYear: "",
        doctorImage: null
    });
    const doctor = useSelector(state => state.doctor.doctorList);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateDoctor(props.dataEdit, data.nameDoctor, data.workplace, data.experience, data.details, data.education, data.experienceYear, data.doctorImage));
        setTimeout(() => {
            dispatch(getDoctor())
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
            doctorImage: e.target.files[0]
        })
    }
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            if (props.dataEdit !== 0) {
                setData({
                    ...doctor.find(x => x._id === props.dataEdit)
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
                                    name="nameDoctor"
                                    value={data.nameDoctor}
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
                                    name="workplace"
                                    value={data.workplace}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="150"
                                />
                            </div>
                        </div>


                        <div className="row py-2">

                            <div className="col-md-6 col-12">
                                <textarea type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="experience"
                                    value={data.experience}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    rows="10"
                                />
                            </div>

                            <div className="col-md-6 col-12">
                                <textarea type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="details"
                                    value={data.details}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    rows="10"
                                />
                            </div>

                        </div>

                        <div className="row py-2">

                            <div className="col-md-6 col-12">
                                <input type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="education"
                                    value={data.education}
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
                                    name="experienceYear"
                                    value={data.experienceYear}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                    maxLength="150"
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-12 col-12">
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
