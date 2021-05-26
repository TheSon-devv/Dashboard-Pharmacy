import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { deleteCustomer, getCustomer } from '../../store/actions/customers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditCustomer from '../../UI/PopUp/PopUpEditCustomer';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableCustomer = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const customer = useSelector(state => state.customer.customerList);
    const dispatch = useDispatch();
    let sttAcc = 0;
    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getPage(1))
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

    const resultData = () => {
        dispatch(totalPage(Math.ceil(customer.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = customer.slice(indexFirstPost, indexLastPost)
        if (customer && customer.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td >{sttAcc}</td>
                        <td>{item._id}</td>
                        <td>{item.nameKH ? item.nameKH : item.email}</td>
                        <td>{item.email ? item.email : item.nameLogin}</td>
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
                            Không có dữ liệu !.
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
                                <th className="font-weight-bold">ID khách hàng</th>
                                <th className="font-weight-bold">Tên khách hàng</th>
                                <th className="font-weight-bold">Tên đăng nhập</th>
                                <th className="font-weight-bold">Số điện thoại</th>
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
