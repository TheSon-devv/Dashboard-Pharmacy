import * as actionType from "./actionsType";

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionType.LOG_OUT
    }
}

export const authLogOut = (exTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, exTime)
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.ACTION_AUTH.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             dispatch(logOut())
//         }
//         else {
//             const expirationDate = new Date(localStorage.getItem('expiresIn'));
//             if (expirationDate <= new Date()) {
//                 dispatch(logOut())
//             }
//             else {
//                 const userId = localStorage.getItem('userId');
//                 dispatch(authSuccess(token, userId));
//                 dispatch(authLogOut());
//             }
//         }
//     }
// }



