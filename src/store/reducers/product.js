import * as actions from "../actions/actionsType";

const initState = {
    productList: [],
    typeProduct: []
}

export const product = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_PRODUCT:
            return {
                ...state,
                productList: [...action.data]
            }
        case actions.GET_TYPE_PRODUCT:
            return {
                ...state,
                typeProduct: [...action.payload]
            }
        case actions.ADD_TYPE_PRODUCT:
            return {
                ...state,
                typeProduct: [...state.typeProduct, action.payload]
            }
        case actions.ADD_PRODUCT:
            return {
                ...state,
                productList: [...state.productList, action.dataAdd]
            }
        case actions.UPDATE_PRODUCT:
            return {
                ...state,
                productList: state.productList.map(x => x._id === action.payload.id ? action.payload : x)
            }
        case actions.DELETE_PRODUCT:
            return {
                ...state,
                productList: state.productList.filter(x => x._id !== action.dataDelete)
            }
        case actions.DELETE_TYPE_PRODUCT:
            return {
                ...state,
                typeProduct: state.typeProduct.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}