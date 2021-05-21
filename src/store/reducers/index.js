import { combineReducers } from "redux";
import { authenticate } from "./authenticate";
import { customer } from "./customer";
import { area } from "./area";
import { product } from "./product";
import { blog } from "./blog";
import { order } from "./order";

export const reducers = combineReducers({
    authenticate,
    customer,
    area,
    product,
    blog,
    order
})