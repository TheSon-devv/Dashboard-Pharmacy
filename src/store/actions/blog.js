import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";
import { toast } from "react-toastify";
require('dotenv').config()

export const Success = (data) => {
    return {
        type: actionType.GET_BLOG,
        data: data
    }
}

export const Add = (dataAdd) => {
    return {
        type: actionType.ADD_BLOG,
        dataAdd: dataAdd
    }
}

export const Delete = (dataDelete) => {
    return {
        type: actionType.DELETE_BLOG,
        dataDelete: dataDelete
    }
}

export const Update = (id, dataUpdate) => {
    return {
        type: actionType.UPDATE_BLOG,
        payload: { id, ...dataUpdate }
    }
}

export const getBlog = () => {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/blog`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    dispatch(Success(res.data.getBlog))
                }
                if (res.data.code === 401) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err))
    }
}

export const addBlog = (nameBlog, information, adminCreate, blogImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("nameBlog", nameBlog);
        formData.append("information", information);
        formData.append("adminCreate", adminCreate);
        formData.append("blogImage", blogImage);
        // console.log(...formData)
        axios.post(`${process.env.REACT_APP_BASE_URL}/blog`, formData, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data)
                    dispatch(Add(res.data.saveBlog))
                    toast.success('Thêm bài đăng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                if (res.data.code === 401 || res.data.code === 400 || res.data.code === 500) {
                    toast.error('Thêm bài đăng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const deleteBlog = (id) => {
    return dispatch => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/blog/${id}`, headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(Delete(id))
                    toast.success('Xóa bài đăng thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Xóa bài đăng thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}


export const updateBlog = (id, nameBlog, information, adminCreate, blogImage) => {
    return dispatch => {
        const formData = new FormData();
        formData.append("nameBlog", nameBlog);
        formData.append("information", information);
        formData.append("adminCreate", adminCreate);
        formData.append("blogImage", blogImage);
        console.log(...formData)
        axios.put(`${process.env.REACT_APP_BASE_URL}/blog/${id}`, formData, headerAuthorization())
            .then(res => {
                console.log(res.data)
                if (res.data.code === 200) {
                    dispatch(Update(id, formData))
                    toast.success('Sửa thông tin sản phẩm thành công !', { position: toast.POSITION.TOP_RIGHT })
                }
                else {
                    toast.error('Sửa thông tin sản phẩm thất bại !', { position: toast.POSITION.TOP_RIGHT })
                }
            })
            .catch(err => console.log(err))
    }
}