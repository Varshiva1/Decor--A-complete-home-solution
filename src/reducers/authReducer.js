import { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, TOKEN, LOAD_USER, LOGOUT } from "../utils/constants"
import { authActions } from "../utils/actions";
export const authReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case authActions.AUTH:
            return {
                ...state,
                token: payload.token,
                userDetails: payload.user
            }
        case authActions.LOGOUT:
            localStorage.removeItem("sessiontoken")
            return {
                ...state,
                userDetails: null, token: null
            };
        case authActions.AUTHERROR:
            return{
                ...state,
                error:payload
            }    
        default:
            return state

    }
}