import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditBlog from '../../UI/PopUp/PopUpEditBlog';
import { getBlog, deleteBlog } from '../../store/actions/blog';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableCustomer = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const blog = useSelector(state => state.blog.blogList);
    const dispatch = useDispatch();
    let sttAcc = 0;

    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

    useEffect(() => {
        dispatch(getBlog());
        dispatch(getPage(1))
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bài đăng này ?")) {
            dispatch(deleteBlog(id))
        }
    }
    const onUpdate = (data) => {
        setShow(true);
        setDataEdit(data)
    }

    const resultData = () => {
        dispatch(totalPage(Math.ceil(blog.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = blog.slice(indexFirstPost, indexLastPost)
        if (blog && blog.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td style={{ width: '1%' }}>{sttAcc}</td>
                        <td style={{ width: '7%' }}>{item.nameBlog}</td>
                        <td style={{ width: '15%' }}><textarea
                            value={item.information} style={{ width: '100%' }} rows="5" readOnly
                            className="w-100 form-control focus-remove-shadow"
                            style={{ boxShadow: "none !important" }}
                        />
                        </td>
                        <td style={{ width: '5%' }}><img src={item.blogImage} alt="img" style={{ width: '170px', height: '113px' }} /></td>

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
                                <th className="font-weight-bold">Tiêu đề bài đăng</th>
                                <th className="font-weight-bold">Chi tiết bài đăng</th>
                                <th className="font-weight-bold">Ảnh</th>
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
                    <PopUpEditBlog
                        open={show}
                        closeModal={closeModal}
                        title="Sửa thông tin bài đăng"
                        dataEdit={dataEdit}
                    />
                ) : null
            }
        </div>
    )
}

export default ResultTableCustomer
