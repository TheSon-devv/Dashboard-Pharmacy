import * as actions from "../actions/actionsType";

const initState = {
    blogList: []
}

export const blog = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_BLOG:
            return {
                ...state,
                blogList: [...action.data]
            }
        case actions.ADD_BLOG:
            return {
                ...state,
                blogList: [...state.blogList, action.dataAdd]
            }
        case actions.UPDATE_BLOG:
            return {
                ...state,
                blogList: state.blogList.map(x => x._id === action.payload.id ? action.payload : x )
            }
        case actions.DELETE_BLOG:
            return {
                ...state,
                blogList: state.blogList.filter(x => x._id !== action.dataDelete)
            }
        default:
            return state;
    }
}