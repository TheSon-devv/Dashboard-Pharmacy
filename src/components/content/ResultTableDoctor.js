import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { deleteDoctor, getDoctor } from '../../store/actions/doctor';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditDoctor from '../../UI/PopUp/PopUpEditDoctor';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableCustomer = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const doctor = useSelector(state => state.doctor.doctorList);
    const dispatch = useDispatch();
    let sttAcc = 0;
    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

    useEffect(() => {
        dispatch(getDoctor());
        dispatch(getPage(1));
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa thông tin bác sỹ này ?")) {
            dispatch(deleteDoctor(id))
        }
    }
    const onUpdate = (data) => {
        setShow(true);
        setDataEdit(data)
    }

    const resultData = () => {
        dispatch(totalPage(Math.ceil(doctor.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = doctor.slice(indexFirstPost, indexLastPost)
        if (doctor && doctor.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td style={{ width: '1%' }}>{sttAcc}</td>
                        <td style={{ width: '7%' }}>{item.nameDoctor}</td>
                        <td style={{ width: '5%' }}>{item.workplace}</td>
                        <td style={{ width: '10%' }}>
                            <textarea
                                value={item.experience} style={{ width: '100%' }} rows="5" readOnly
                                className="w-100 form-control focus-remove-shadow"
                                style={{ boxShadow: "none !important" }}
                            />
                        </td>
                        <td style={{ width: '10%' }}>
                            <textarea
                                value={item.details} style={{ width: '100%' }} rows="5" readOnly
                                className="w-100 form-control focus-remove-shadow"
                                style={{ boxShadow: "none !important" }}
                            />
                        </td>
                        <td style={{ width: '5%' }}>{item.education}</td>
                        <td style={{ width: '5%' }}><img src={item.doctorImage} alt="img" style={{ width: '170px', height: '150px' }} /></td>

                        <td style={{ width: '1%' }}>
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
                                <th className="font-weight-bold">Tên bác sỹ</th>
                                <th className="font-weight-bold">Chuyên ngành</th>
                                <th className="font-weight-bold">Kinh nghiệm</th>
                                <th className="font-weight-bold">Bằng cấp</th>
                                <th className="font-weight-bold">Học vấn</th>
                                <th className="font-weight-bold">Ảnh bác sỹ</th>
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
                    <PopUpEditDoctor
                        open={show}
                        closeModal={closeModal}
                        title="Sửa thông tin bác sỹ"
                        dataEdit={dataEdit}
                    />
                ) : null
            }
        </div>
    )
}

export default ResultTableCustomer
