import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { deleteBooking, getBooking } from '../../store/actions/booking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditPharmacy from '../../UI/PopUp/PopUpEditPharmacy';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableBooking = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const booking = useSelector(state => state.booking.bookingList);
    const dispatch = useDispatch();
    let sttAcc = 0;
    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

    useEffect(() => {
        dispatch(getBooking());
        dispatch(getPage(1));
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa lịch hẹn khám này ?")) {
            dispatch(deleteBooking(id))
        }
    }
    const onUpdate = (data) => {
        setShow(true);
        setDataEdit(data)
    }

    const resultData = () => {
        dispatch(totalPage(Math.ceil(booking.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = booking.slice(indexFirstPost, indexLastPost)
        if (booking && booking.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td style={{ width: '1%' }}>{sttAcc}</td>
                        <td style={{ width: '7%' }}>{item.nameCustomer}</td>
                        <td style={{ width: '5%' }}>{item.phone}</td>
                        <td style={{ width: '15%' }}>
                            <textarea
                                value={item.information} style={{ width: '100%' }} rows="5" readOnly
                                className="w-100 form-control focus-remove-shadow"
                                style={{ boxShadow: "none !important" }}
                            />
                        </td>
                        <td style={{ width: '5%' }}>
                            {
                                item.doctor && item.doctor.length ? (
                                    item.doctor.map(i => (
                                        <span>{i.nameDoctor}</span>
                                    ))
                                ) : null
                            }
                        </td>

                        <td style={{ width: '1%' }}>
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
                    <td colSpan="9">
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
                                <th className="font-weight-bold">Tên khách hàng</th>
                                <th className="font-weight-bold">Số điện thoại</th>
                                <th className="font-weight-bold">Bệnh lý cần tư vấn</th>
                                <th className="font-weight-bold">Đặt lịch hẹn với bác sỹ</th>
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
            {
                show ? (
                    <PopUpEditPharmacy
                        open={show}
                        closeModal={closeModal}
                        title="Sửa thông tin thuốc"
                        dataEdit={dataEdit}
                    />
                ) : null
            }
        </div>
    )
}

export default ResultTableBooking
