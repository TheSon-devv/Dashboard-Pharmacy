
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { addTypeProduct, deleteTypeProduct } from '../../store/actions/product';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from '@material-ui/core';


const PopUpAddTypeProduct = (props) => {
    // , formState: { errors }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const typeProduct = useSelector(state => state.product.typeProduct)

    const onSubmit = (data) => {
        dispatch(addTypeProduct(data.namePharmacy))
        // setTimeout(() => {
        //     dispatch(getProduct())
        // }, 1000)
    }
    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa loại sản phẩm này ?")) {
            dispatch(deleteTypeProduct(id))
        }
    }
    let sttAcc = 0;
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
                            <div className="col-md-12 col-12">
                                <input type="text" placeholder="Tên loại thuốc" {...register("namePharmacy", { required: true, maxLength: 50 })}
                                    className="w-100 form-control focus-remove-shadow"
                                    style={{ boxShadow: "none !important" }}
                                    maxLength="50"
                                />
                            </div>

                        </div>

                        <div className="py-3" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" className="btn btn-info">Xác nhận</button>
                            <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={props.closeModal}>Hủy</button>
                        </div>
                    </form>
                </div>
                <div style={{ height: '400px', overflow: 'auto', padding: '10px' }}>
                    <div className="col-sm-12 ">
                        <div className="w-100 boxTable">
                            <table className="table table-hover datatable-column-search-inputs " >
                                <thead className="table-bordered table-active ">
                                    <tr>
                                        <th className="font-weight-bold">STT</th>
                                        <th className="font-weight-bold">Tên loại thuốc</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        typeProduct.map(item => {
                                            sttAcc++;
                                            return (
                                                <tr key={item._id}>
                                                    <td>{sttAcc}</td>
                                                    <td>{item.nameTypePharmacy}</td>
                                                    <td style={{ width: '1%' }}>
                                                        <Button>
                                                            <DeleteIcon color="secondary"
                                                                onClick={() => onDelete(item._id)}
                                                            />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>
            </Popup>
        </div>
    )
}

export default PopUpAddTypeProduct
