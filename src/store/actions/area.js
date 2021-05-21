import * as actionType from "./actionsType";
import axios from 'axios'
import { headerAuthorization } from "../../header";

export const area = (data) => {
    return {
        type : actionType.GET_AREA,
        data : data
    }
}

export const getArea = () => {
    return dispatch => {
        axios.get('http://localhost:4000/area', headerAuthorization())
            .then(res => {
                if (res.data.code === 200) {
                    dispatch(area(res.data.getArea))
                }
                if (res.data.code === 401 || res.data.code === 404) {
                    alert('Loi roi')
                }
            })
            .catch(err => console.log(err));
    }
}
