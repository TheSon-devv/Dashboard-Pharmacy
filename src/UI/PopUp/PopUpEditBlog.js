import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { getBlog, updateBlog } from '../../store/actions/blog';


const PopUpEditBlog = (props) => {
    const [data, setData] = useState({
        nameBlog: "",
        adminCreate: localStorage.getItem('userId'),
        information: "",
        blogImage: null,
    });
    const blog = useSelector(state => state.blog.blogList);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateBlog(props.dataEdit, data.nameBlog, data.adminCreate, data.information, data.blogImage));
        setTimeout(() => {
            dispatch(getBlog())
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
                    ...blog.find(x => x._id === props.dataEdit)
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
                                    name="nameBlog"
                                    value={data.nameBlog}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
                                />
                            </div>
                            <div className="col-md-6 col-12">
                                <input type="file"
                                    name="updateFileChanged"
                                    value={data.updateFileChanged}
                                    onChange={updateFileChanged}
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-md-12 col-12">
                                <textarea type="text"
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    name="information"
                                    value={data.information}
                                    onChange={updateHandlerChanged}
                                    required={true}
                                    minLength="1"
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
