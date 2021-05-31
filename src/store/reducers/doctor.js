import * as actions from "../actions/actionsType";

const initState = {
    doctorList: []
}

export const doctor = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_DOCTOR:
            return {
                ...state,
                doctorList: [...action.data]
            }
        case actions.ADD_DOCTOR:
            return {
                ...state,
                doctorList: [...state.doctorList, action.dataAdd]
            }
        case actions.UPDATE_DOCTOR:
            return {
                ...state,
                doctorList: state.doctorList.map(x => x._id === action.payload.id ? action.payload : x )
            }
        case actions.DELETE_DOCTOR:
            return {
                ...state,
                doctorList: state.doctorList.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}