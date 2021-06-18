import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditCustomer from '../../UI/PopUp/PopUpEditCustomer';
import { getOrder, deleteOrder } from '../../store/actions/order';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableOrder = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const order = useSelector(state => state.order.orderList);
    const dispatch = useDispatch();
    let sttAcc = 0;
    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

     const convertDate = (date) => {
        let todayTime = new Date(date);
        let month = todayTime.getMonth() + 1;
        let day = todayTime.getDate();
        let year = todayTime.getFullYear();
        let hours = todayTime.getHours();
        let minutes = todayTime.getMinutes();
        let seconds = todayTime.getSeconds();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        dispatch(getOrder());
        dispatch(getPage(1))
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

    const resultData = () => {
        dispatch(totalPage(Math.ceil(order.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = order.slice(indexFirstPost, indexLastPost)
        if (order && order.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td>{sttAcc}</td>
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
                        <td>{Number(item.totalPrice).toFixed(2)} $</td>
                        <td>{item.nameCustomer}</td>
                        <td>{item.phone ? item.phone : <a href="https://www.sandbox.paypal.com/myaccount/summary" target="_blank">Xem chi tiết đơn</a>}</td>
                        <td>{item.address ? item.address : <a href="https://www.sandbox.paypal.com/myaccount/summary" target="_blank">Xem chi tiết đơn</a>}</td>
                        <td>
                            {
                                item.checkoutPaypal ? (
                                    <span>{item.checkoutPaypal}</span>
                                ) : (
                                    <span>Thanh toán khi nhận hàng</span>
                                )
                            }
                        </td>
                        <td>{convertDate(item.dateCreate)}</td>
                        <td>
                            <ButtonGroup>

                                <Button>
                                    <DeleteIcon color="secondary"
                                        onClick={() => onDelete(item._id)}
                                    />
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            })
        }
        else {
            // this.props.getTotalPage(0)
            return (
                <tr style={{ width: '100%' }}>
                    <td colSpan="7">
                        <p
                            style={{
                                fontSize: "18px",
                                textAlign: "center",
                                margin: "20px 0 0 0",
                            }}
                        >
                            Không có dữ liệu ! .
                        </p>
                    </td>
                </tr>
            );
        }
    }
    return (
        <div className="row py-2">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: 20 }}>
                <PaginationTable />
            </div>
            <div className="col-sm-12 ">
                <div className="w-100 boxTable">
                    <table className="table table-hover datatable-column-search-inputs " >
                        <thead className="table-bordered table-active ">
                            <tr>
                                <th className="font-weight-bold">STT</th>
                                <th className="font-weight-bold">Danh sách sản phẩm</th>
                                <th className="font-weight-bold">Số lượng</th>
                                <th className="font-weight-bold">Tổng tiền</th>
                                <th className="font-weight-bold">Khách hàng</th>
                                <th className="font-weight-bold">Số điện thoại</th>
                                <th className="font-weight-bold">Địa chỉ giao hàng</th>
                                <th className="font-weight-bold">Hình thức thanh toán</th>
                                <th className="font-weight-bold">Ngày tạo hóa đơn</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultData()}
                        </tbody>

                    </table>

                </div>
            </div>
            <ToastContainer style={{ marginTop: 50 }} />
            {/* {
                show ? (
                    <PopUpEdit
                        open={show}
                        closeModal={closeModal}
                        title="Sửa thông tin khách hàng"
                        dataEdit={dataEdit}
                    />
                ) : null
            } */}
        </div>
    )
}

export default ResultTableOrder
