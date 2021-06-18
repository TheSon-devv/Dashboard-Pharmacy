import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import LayersIcon from '@material-ui/icons/Layers';
import LocalPharmacyRoundedIcon from '@material-ui/icons/LocalPharmacyRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import React from 'react';
import {
    NavLink
} from "react-router-dom";


export const mainListItems = (
    <div>
        <NavLink to="/" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageCustomer" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <PersonRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý khách hàng" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageDoctor" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <LocalPharmacyRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý bác sỹ" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageProduct" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <LocalPharmacyRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý thuốc" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageOrder" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <DescriptionRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý hóa đơn" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageBooking" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <DescriptionRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý đặt lịch khám" />
            </ListItem>
        </NavLink>
        <NavLink to="/ManageBlog" style={{ textDecoration: 'none', color: '#000000' }}>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Đăng bài Blog" />
            </ListItem>
        </NavLink>
    </div>
);

// export const secondaryListItems = (
//     <Router>
//         <ListSubheader inset>Saved reports</ListSubheader>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItem>
//         <ListItem button>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItem>
//     </Router>
// );