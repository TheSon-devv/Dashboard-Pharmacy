import ManageCustomer from "./components/Manage/ManageCustomer";
import ManageProduct from "./components/Manage/ManageProduct";
import ManageBlog from "./components/Manage/ManageBlog";
import ManageOrder from "./components/Manage/ManageOrder";

const routers = [
    {
        path: "/ManageCustomer",
        main: () =>  <ManageCustomer />
    },
    {
        path: "/ManageProduct",
        main: () =>  <ManageProduct />
    },
    {
        path: "/ManageBlog",
        main: () =>  <ManageBlog />
    },
    {
        path: "/ManageOrder",
        main: () =>  <ManageOrder />
    },
];

export default routers;