import { combineReducers } from "redux";
import { authenticate } from "./authenticate";
import { customer } from "./customer";
import { pagination } from "./pagination";
import { product } from "./product";
import { blog } from "./blog";
import { order } from "./order";
import { doctor } from "./doctor";

export const reducers = combineReducers({
    authenticate,
    customer,
    product,
    blog,
    order,
    pagination,
    doctor
})