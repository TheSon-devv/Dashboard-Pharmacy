import ManageCustomer from "./components/Manage/ManageCustomer";
import ManageProduct from "./components/Manage/ManageProduct";
import ManageBlog from "./components/Manage/ManageBlog";
import ManageOrder from "./components/Manage/ManageOrder";
import Home from "./components/Home/Home";
import ManageDoctor from "./components/Manage/ManageDoctor";
import ManageBooking from "./components/Manage/ManageBooking";

const routers = [
    {
        path: "/",
        exact: true,
        main: () => <Home />
    },
    {
        path: "/ManageCustomer",
        main: () => <ManageCustomer />
    },
    {
        path: "/ManageProduct",
        main: () => <ManageProduct />
    },
    {
        path: "/ManageBlog",
        main: () => <ManageBlog />
    },
    {
        path: "/ManageOrder",
        main: () => <ManageOrder />
    },
    {
        path: "/ManageDoctor",
        main: () => <ManageDoctor />
    },
    {
        path: "/ManageBooking",
        main: () => <ManageBooking />
    },
];

export default routers;