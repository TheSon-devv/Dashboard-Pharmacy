import axios from "axios";
import * as actionType from "./actionsType";

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiresIn');
    return {
        type: actionType.LOG_OUT
    }
}

export const authLogOut = (exTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, exTime * 100)
    }
}

export const authFail = (payload) => {
    return {
        type: actionType.AUTH_FAIL,
        payload
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        userToken: token,
        userId: userId
    }
}

export const auth = (email, password) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/admin/login`, authData)
            .then(res => {
                if (res.data.code === 200) {
                    console.log(res.data);
                    const expriesTime = new Date(new Date().getTime() + (res.data.dataLogin.expiresIn * 100))
                    localStorage.setItem('token', res.data.dataLogin.accessToken)
                    localStorage.setItem('expiresIn', expriesTime)
                    localStorage.setItem('userId', res.data.dataLogin.userId)

                    dispatch(authSuccess(res.data.dataLogin.accessToken, res.data.dataLogin.userId));
                    dispatch(authLogOut(res.data.dataLogin.expiresIn));
                }
                else {
                    dispatch(authFail("Tài khoản hoặc mật khẩu không chính xác !"))
                }
            })
            .catch(error => alert(error))
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut())
            console.log('k co token')
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expiresIn'));
            console.log(expirationDate, 'expirationDate')
            if (expirationDate <= new Date()) {
                dispatch(logOut())
                alert("Hết phiên đăng nhập . Vui lòng đăng nhập lại !")
            }
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authLogOut((expirationDate.getTime() - new Date().getTime()) / 100));
            }
            console.log('co token')
        }
    }
}



