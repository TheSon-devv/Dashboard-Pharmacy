import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";

export const Success = (data) => {
    return {
        type: actionType.GET_CUSTOMER,
        data: data
    }
}

export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_CUSTOMER,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_CUSTOMER,
        dataDelete: dataDelete
    }
}

export const Update = (id,dataUpdate) => {
    return {
        type: actionType.UPDATE_CUSTOMER,
        payload: {id,...dataUpdate}
    }
}

export const getCustomer = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/customer`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    // console.log(res.data)
                    dispatch(Success(res.data.getCustomer))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addCustomer = (nameKH, nameLogin, password, phoneNumber) => {
    return dispatch => {
        const dataCustomer = {
            nameKH: nameKH,
            nameLogin: nameLogin,
            password: password,
            phoneNumber: phoneNumber
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/customer`, dataCustomer, headerAuthorization())
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


export const deleteCustomer = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/customer/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('Xóa khách hàng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Xóa khách hàng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateCustomer = (id, nameKH, email, password, phoneNumber) => {
    return dispatch => {
        const dataUpdateCustomer = {
            nameKH: nameKH,
            email: email,
            password: password,
            phoneNumber: phoneNumber
        }
        axios.put(`${process.env.REACT_APP_BASE_URL}/customer/${id}`, dataUpdateCustomer, headerAuthorization())
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