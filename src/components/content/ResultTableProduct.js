import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, ButtonGroup } from '@material-ui/core';
import { deleteProduct, getProduct, getTypeProduct } from '../../store/actions/product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpEditPharmacy from '../../UI/PopUp/PopUpEditPharmacy';
import { getPage, totalPage } from '../../store/actions/pagination';
import PaginationTable from '../Pagination/PaginationTable';

const ResultTableCustomer = () => {
    const [show, setShow] = useState(false)
    const [dataEdit, setDataEdit] = useState(0)
    const closeModal = () => setShow(false)
    const product = useSelector(state => state.product.productList);
    const dispatch = useDispatch();
    let sttAcc = 0;
    const currentPage = useSelector(state => state.pagination.currentPage)
    const perPage = useSelector(state => state.pagination.perPage)

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getPage(1));
        dispatch(getTypeProduct())
    }, [dispatch])

    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này ?")) {
            dispatch(deleteProduct(id))
        }
    }
    const onUpdate = (data) => {
        setShow(true);
        setDataEdit(data)
    }

    const resultData = () => {
        dispatch(totalPage(Math.ceil(product.length / perPage)))
        const indexLastPost = currentPage * perPage;
        const indexFirstPost = indexLastPost - perPage;
        const pageSlice = product.slice(indexFirstPost, indexLastPost)
        if (product && product.length) {
            let sttAcc = 0;
            return pageSlice.map((item) => {
                sttAcc++;
                return (
                    <tr key={sttAcc}>
                        <td style={{ width: '1%' }}>{sttAcc}</td>
                        <td style={{ width: '7%' }}>{item.namePharmacy}</td>
                        <td style={{ width: '3%' }}>{Number(item.pricePharmacy).toFixed(2)}</td>
                        <td style={{ width: '15%' }}>
                            <textarea
                                value={item.information} style={{ width: '100%' }} rows="5" readOnly
                                className="w-100 form-control focus-remove-shadow"
                                style={{ boxShadow: "none !important" }}
                            />
                        </td>
                        <td style={{ width: '5%' }}>{item.status}</td>
                        <td style={{ width: '5%' }}>{item.promotion ? item.promotion + "%" : 0}</td>
                        <td style={{ width: '5%' }}>{item.totalPromotion ? item.totalPromotion : 0}</td>
                        <td style={{ width: '5%' }}><img src={item.pharmacyImage} alt="img" style={{ width: '170px', height: '113px' }} /></td>

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
                                <th className="font-weight-bold">Tên sản phẩm</th>
                                <th className="font-weight-bold">Đơn giá</th>
                                <th className="font-weight-bold">Thông tin</th>
                                <th className="font-weight-bold">Trạng thái</th>
                                <th className="font-weight-bold">Khuyến mãi</th>
                                <th className="font-weight-bold">Giá KM</th>
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

export default ResultTableCustomer
