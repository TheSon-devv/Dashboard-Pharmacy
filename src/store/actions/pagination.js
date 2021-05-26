import * as actionType from "./actionsType";


export const totalPage = (payload) => {
    return {
        type : actionType.TOTAL_PAGE,
        payload
    }
}

export const getPage = (payload) => {
    return {
        type : actionType.GET_PAGE,
        payload
    }
}
export const getPerPage = (payload) => {
    return {
        type : actionType.GET_PER_PAGE,
        payload
    }
}

