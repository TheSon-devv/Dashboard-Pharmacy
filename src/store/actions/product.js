import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";
require('dotenv').config()

export const Success = (data) => {
    return {
        type: actionType.GET_PRODUCT,
        data: data
    }
}
export const TypeProduct = (payload) => {
    return {
        type: actionType.GET_TYPE_PRODUCT,
        payload
    }
}
export const AddTypeProduct = (payload) => {
    return {
        type: actionType.ADD_TYPE_PRODUCT,
        payload
    }
}

export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_PRODUCT,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_PRODUCT,
        dataDelete: dataDelete
    }
}

export const DeleteTypeProduct = (dataDelete) => {
    return {
        type: actionType.DELETE_TYPE_PRODUCT,
        dataDelete: dataDelete
    }
}

export const Update = (id, dataUpdate) => {
    return {
        type: actionType.UPDATE_PRODUCT,
        payload: { id, ...dataUpdate }
    }
}

export const getProduct = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/pharmacy`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Success(res.data.getPharmacy))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}
export const getTypeProduct = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/typePharmacy`)
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(TypeProduct(res.data.getTypePharmacy))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addTypeProduct = (nameTypePharmacy) => {
    return dispatch => {
        const formData = {
            nameTypePharmacy : nameTypePharmacy
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/typePharmacy`, formData, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(AddTypeProduct(res.data.saveTypePharmacy))
                    toast.success('Th??m lo???i thu???c th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                if (res.data.code === 401 || res.data.code === 400 || res.data.code === 500) {
                    toast.error('Th??m lo???i thu???c th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}

export const addProduct = (namePharmacy, typePharmacy, pricePharmacy, status, promotion, information, pharmacyImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("namePharmacy", namePharmacy);
        formData.append("typePharmacy", typePharmacy);
        formData.append("pricePharmacy", pricePharmacy);
        formData.append("information", information);
        formData.append("promotion", promotion);
        formData.append("status", status);
        formData.append("pharmacyImage", pharmacyImage);
        // console.log(...formData)
        axios.post(`${process.env.REACT_APP_BASE_URL}/pharmacy`, formData, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Add(res.data.savePharmacy))
                    toast.success('Th??m s???n ph???m thu???c th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                if (res.data.code === 401 || res.data.code === 400 || res.data.code === 500) {
                    toast.error('Th??m s???n ph???m thu???c th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const deleteProduct = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/pharmacy/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('X??a s???n ph???m th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('X??a s???n ph???m th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}

export const deleteTypeProduct = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/typePharmacy/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(DeleteTypeProduct(id))
                    toast.success('X??a lo???i s???n ph???m th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('X??a lo???i s???n ph???m th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateProduct = (id, namePharmacy, pricePharmacy, status, promotion, information, pharmacyImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("namePharmacy", namePharmacy);
        formData.append("pricePharmacy", pricePharmacy);
        formData.append("information", information);
        formData.append("promotion", promotion);
        formData.append("status", status);
        formData.append("pharmacyImage", pharmacyImage);
        // console.log(...formData)
        axios.put(`${process.env.REACT_APP_BASE_URL}/pharmacy/${id}`, formData, headerAuthorization())
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                    dispatch(Update(id, formData))
                    toast.success('S???a th??ng tin s???n ph???m th??nh c??ng !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('S???a th??ng tin s???n ph???m th???t b???i !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}