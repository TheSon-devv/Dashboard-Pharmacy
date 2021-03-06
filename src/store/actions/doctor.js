import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";
require('dotenv').config()

export const Success = (data) => {
    return {
        type: actionType.GET_DOCTOR,
        data: data
    }
}

export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_DOCTOR,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_DOCTOR,
        dataDelete: dataDelete
    }
}

export const Update = (id, dataUpdate) => {
    return {
        type: actionType.UPDATE_DOCTOR,
        payload: { id, ...dataUpdate }
    }
}

export const getDoctor = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/doctor`)
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Success(res.data.getDoctor))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addDoctor = (nameDoctor, workplace, experience, details, education, experienceYear, doctorImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("nameDoctor", nameDoctor);
        formData.append("workplace", workplace);
        formData.append("experience", experience);
        formData.append("details", details);
        formData.append("education", education);
        formData.append("experienceYear", experienceYear);
        formData.append("doctorImage", doctorImage);
        // console.log(...formData)
        axios.post(`${process.env.REACT_APP_BASE_URL}/doctor`, formData, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Add(res.data.saveDoctor))
                    toast.success('Th??m b??c s??? th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                if (res.data.code === 401 || res.data.code === 400 || res.data.code === 500) {
                    toast.error('Th??m b??c s??? th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const deleteDoctor = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/doctor/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('X??a b??c s??? th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('X??a b??c s??? th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateDoctor = (id, nameDoctor, workplace, experience, details, education, experienceYear, doctorImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("nameDoctor", nameDoctor);
        formData.append("workplace", workplace);
        formData.append("experience", experience);
        formData.append("details", details);
        formData.append("education", education);
        formData.append("experienceYear", experienceYear);
        formData.append("doctorImage", doctorImage);
        // console.log(...formData)
        axios.put(`${process.env.REACT_APP_BASE_URL}/doctor/${id}`, formData, headerAuthorization())
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                    dispatch(Update(id, formData))
                    toast.success('S???a th??ng tin b??c s??? th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('S???a th??ng tin b??c s??? th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}