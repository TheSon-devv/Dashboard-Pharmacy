import * as actions from "../actions/actionsType";

const initState = {
    token: null,
    userId: null,
    loading: false,
    message: ""
}

export const authenticate = (state = initState, action) => {
    switch (action.type) {
        case actions.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case actions.LOG_OUT:
            return {
                ...state,
                token: null,
                userId: null,
                loading: false
            }
        case actions.AUTH_FAIL:
            return {
                ...state,
                message: action.payload
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state,
                token: action.userToken,
                loading: false,
                userId: localStorage.getItem('userId')
            }
        default:
            return state;
    }
}