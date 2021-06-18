import * as actions from "../actions/actionsType";

const initState = {
    bookingList: []
}

export const booking = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_BOOKING:
            return {
                ...state,
                bookingList: [...action.data]
            }
        case actions.ADD_BOOKING:
            return {
                ...state,
                bookingList: [...state.bookingList, action.dataAdd]
            }
        case actions.UPDATE_BOOKING:
            return {
                ...state,
                bookingList: state.bookingList.map(x => x._id === action.payload.id ? action.payload : x )
            }
        case actions.DELETE_BOOKING:
            return {
                ...state,
                bookingList: state.bookingList.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}