import * as actions from "../actions/actionsType";

const initState = {
    areaList : []
}

export const area = (state = initState, action) => {
    switch (action.type) {
        case actions.GET_AREA:
            return {
                ...state,
                areaList : [...action.data]
            }
        default:
            return state;
    }
}