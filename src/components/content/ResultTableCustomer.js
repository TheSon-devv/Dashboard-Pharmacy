import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { deleteCustomer, getCustomer } from '../../store/actions/customers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditCustomer from '../../UI/PopUp/PopUpEditCustomer';

const ResultTableCustomer = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const customer = useSelector(state => state.customer.customerList);
    const dispatch = useDispatch();
    let sttAcc = 0;

    useEffect(() => {
        dispatch(getCustomer());
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa khách hàng này ?")) {
            dispatch(deleteCustomer(id))
        }
    }
    const onUpdate = (data) => {
        setShow(true);
        setDataEdit(data)
    }
    return (
        <div className="row py-2">
            <div className="col-sm-12 ">
                <div className="w-100 boxTable">
                    <table className="table table-hover datatable-column-search-inputs " >
                        <thead className="table-bordered table-active ">
                            <tr>
                                <th className="font-weight-bold">STT</th>
                                <th className="font-weight-bold">ID khách hàng</th>
                                <th className="font-weight-bold">Tên khách hàng</th>
                                <th className="font-weight-bold">Tên đăng nhập</th>
                                <th className="font-weight-bold">Số điện thoại</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customer.map((item) => {
                                sttAcc++;
                                return (
                                    <tr key={sttAcc}>
                                        <td >{sttAcc}</td>
                                        <td>{item._id}</td>
                                        <td>{item.nameKH}</td>
                                        <td>{item.nameLogin}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td style={{ width: '5%' }}>
                                            <ButtonGroup>
                                                <Button>
                                                    <EditIcon color="primary" onClick={() => onUpdate(item._id)} />
                                                </Button>
                                                <Button>
                                                    <DeleteIcon color="secondary"
                                                        onClick={() => onDelete(item._id)}
                                                    />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
            <ToastContainer style={{ marginTop: 50 }} />
            {
                show ? (
                    <PopUpEditCustomer
                        open={show}
                        closeModal={closeModal}
                        title="Sửa thông tin khách hàng"
                        dataEdit={dataEdit}
                    />
                ) : null
            }
        </div>
    )
}

export default ResultTableCustomer
