import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditCustomer from '../../UI/PopUp/PopUpEditCustomer';
import { getOrder, deleteOrder } from '../../store/actions/order';

const ResultTableOrder = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const order = useSelector(state => state.order.orderList);
    const dispatch = useDispatch();
    let sttAcc = 0;

    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa hóa đơn này ?")) {
            dispatch(deleteOrder(id))
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
                                <th className="font-weight-bold">Id hóa đơn</th>
                                <th className="font-weight-bold">Danh sách sản phẩm</th>
                                <th className="font-weight-bold">Số lượng</th>
                                <th className="font-weight-bold">Tổng tiền</th>
                                <th className="font-weight-bold">Khách hàng</th>
                                <th className="font-weight-bold"></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item) => {
                                sttAcc++;
                                return (
                                    <tr key={sttAcc}>
                                        <td>{sttAcc}</td>
                                        <td>{item._id}</td>
                                        <td>{item.details.map(i => {
                                            return (
                                                <div key={i._id}>
                                                    {i.pharmacyId.map(e => {
                                                        return (
                                                            <div key={e._id}>
                                                                {e.namePharmacy}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )
                                        })
                                        }</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.userId.map(user => {
                                            return (
                                                <div key={user._id}>
                                                    {user.nameKH ? (
                                                        <div>{user.nameKH}</div>
                                                    ) : (
                                                        <div>{user.email}</div>
                                                    )
                                                    }
                                                </div>
                                            )
                                        })}</td>
                                        <td>
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

export default ResultTableOrder
