import * as actions from "../actions/actionsType";

const initState = {
    customerList: []
}

export const customer = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMER:
            return {
                ...state,
                customerList: [...action.data]
            }
        case actions.ADD_CUSTOMER:
            return {
                ...state,
                customerList: [...state.customerList, action.dataAdd]
            }
        case actions.UPDATE_CUSTOMER:
            return {
                ...state,
                customerList: state.customerList.map(x => x._id === action.payload.id ? action.payload : x )
            }
        case actions.DELETE_CUSTOMER:
            return {
                ...state,
                customerList: state.customerList.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}