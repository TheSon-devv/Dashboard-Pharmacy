import * as actions from "../actions/actionsType";

const initState = {
    orderList: []
}

export const order = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_ORDER:
            return {
                ...state,
                orderList: [...action.data]
            }
        case actions.ADD_ORDER:
            return {
                ...state,
                orderList: [...state.orderList, action.dataAdd]
            }
        case actions.UPDATE_ORDER:
            return {
                ...state,
                orderList: state.orderList.map(x => x._id === action.payload.id ? action.payload : x )
            }
        case actions.DELETE_ORDER:
            return {
                ...state,
                orderList: state.orderList.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}