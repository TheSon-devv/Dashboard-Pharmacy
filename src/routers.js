import ManageCustomer from "./components/Manage/ManageCustomer";
import ManageProduct from "./components/Manage/ManageProduct";
import ManageBlog from "./components/Manage/ManageBlog";
import ManageOrder from "./components/Manage/ManageOrder";
import Home from "./components/Home/Home";

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
];

export default routers;