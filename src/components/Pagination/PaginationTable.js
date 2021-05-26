// import { PaginationItem } from '@material-ui/lab';
// import React from 'react';
// import './stylePagination.css'

// const PaginationTable = ({ perPage, total, paginate }) => {
//     const pageNumber = [];

//     for (let i = 1; i <= Math.ceil(total / perPage); i++) {
//         pageNumber.push(i)
//     }
//     console.log(pageNumber)
//     return (
//         <nav aria-label="Page navigation example">
//             <div className="ps-pagination">
//                 <ul className="pagination">
//                     {
//                         pageNumber.map(item => {
//                             return (
//                                 <li className="page-item" key={item}>
//                                     <a className="page-link" href="#" onClick={() => paginate(item)}>{item}</a>
//                                 </li>
//                             )
//                         })
//                     }
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export default PaginationTable

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPage } from '../../store/actions/pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationTable() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const page = useSelector(state => state.pagination.currentPage)
    const totalPage = useSelector(state => state.pagination.totalPage)
    const handleChange = (event, value) => {
        dispatch(getPage(value))
    };

    return (
        <div className={classes.root} style={{ marginBottom: 20 }}>
            <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
                color="primary"
                showFirstButton
                showLastButton
            />
        </div>
    );
}
