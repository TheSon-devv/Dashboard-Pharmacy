import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";

export const Success = (data) => {
    return {
        type: actionType.GET_BOOKING,
        data: data
    }
}
export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_BOOKING,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_BOOKING,
        dataDelete: dataDelete
    }
}

export const Update = (id, dataUpdate) => {
    return {
        type: actionType.UPDATE_BOOKING,
        payload: { id, ...dataUpdate }
    }
}

export const getBooking = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/message`)
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    dispatch(Success(res.data.getMessage))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addBooking = (nameCustomer, phone, information, doctor) => {
    return dispatch => {
        const dataBooking = {
            nameCustomer,
            phone,
            information,
            doctor
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/message`, dataBooking, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Add(res.data.saveCustomer))
                    toast.success('Thêm lịch khám thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Thêm lịch khám thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const deleteBooking = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/message/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('Xóa lịch khám thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Xóa lịch khám thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateBooking = (id,nameCustomer, phone, information, doctor,status,address) => {
    return dispatch => {
        const dataUpdateBooking = {
            nameCustomer,
            phone,
            information,
            doctor,
            status,
            address
        }
        axios.put(`${process.env.REACT_APP_BASE_URL}/message/${id}`, dataUpdateBooking, headerAuthorization())
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                    dispatch(Update(id, dataUpdateBooking))
                    toast.success('Đã xác nhận lịch khám !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Xác nhận lịch khám thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}