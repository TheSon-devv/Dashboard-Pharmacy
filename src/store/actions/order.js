import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";

export const Success = (data) => {
    return {
        type: actionType.GET_ORDER,
        data: data
    }
}

export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_ORDER,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_ORDER,
        dataDelete: dataDelete
    }
}

export const Update = (id,dataUpdate) => {
    return {
        type: actionType.UPDATE_ORDER,
        payload: {id,...dataUpdate}
    }
}

export const getOrder = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/checkout`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Success(res.data.getCheckout))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addOrder = (nameKH, nameLogin, password, phoneNumber) => {
    return dispatch => {
        const dataCustomer = {
            nameKH: nameKH,
            nameLogin: nameLogin,
            password: password,
            phoneNumber: phoneNumber
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/checkout`, dataCustomer, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Add(res.data.saveCustomer))
                    toast.success('Thêm khách hàng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Thêm khách hàng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const deleteOrder = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/checkout/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('Xóa đơn hàng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Xóa đơn hàng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateOrder = (id, nameKH, nameLogin, password, phoneNumber) => {
    return dispatch => {
        const dataUpdateCustomer = {
            nameKH: nameKH,
            nameLogin: nameLogin,
            password: password,
            phoneNumber: phoneNumber
        }
        axios.put(`${process.env.REACT_APP_BASE_URL}/checkout/${id}`, dataUpdateCustomer, headerAuthorization())
            .then(res => {
                // console.log(res.data)
                if (res.data.code === 200) {
                    dispatch(Update(id,dataUpdateCustomer))
                    toast.success('Sửa thông tin khách hàng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Sửa thông tin khách hàng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}