export const FETCH_JWT = "FETCH_JWT";
export const FETCH_JWT_SUCCESS = "FETCH_JWT_SUCCESS";
export const FETCH_JWT_FAILED = "FETCH_JWT_FAILED";
export const FETCH_RESET_PASSWORD = "FETCH_RESET_PASSWORD";
export const FETCH_RESET_PASSWORD_SUCCESS = "FETCH_RESET_PASSWORD_SUCCESS";
export const FETCH_CHANGE_PASSWORD = "FETCH_CHANGE_PASSWORD";
export const FETCH_CHANGE_PASSWORD_ADMIN = "FETCH_CHANGE_PASSWORD_ADMIN";
export const FETCH_CHANGE_PASSWORD_ADMIN_FAIL = "FETCH_CHANGE_PASSWORD_ADMIN_FAIL";
export const FETCH_CHANGE_PASSWORD_FAIL = "FETCH_CHANGE_PASSWORD_FAIL";
export const SET_LOGIN_LOADING = "SET_LOGIN_LOADING";

export const ACTIVE_NOTIFY = "ACTIVE_NOTIFY";
const initialState = {
    isLogin: false,
    message: "",
    isLoading: false,
    token: "",
    isSentMail: false,
    isChangeError : false,
    messagePassword : ""
};

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JWT:
            return { ...state, isLoading: true, message: "" }
        case FETCH_JWT_SUCCESS:
            return { ...state, isLogin: true }
        case FETCH_JWT_FAILED:
            return { ...state, isLogin: false, isLoading: false, message: action.payload }
        case SET_LOGIN_LOADING:
            return { ...state, isLoading: false }
        case FETCH_RESET_PASSWORD:
            return {...state,isLoading : true}
        case FETCH_RESET_PASSWORD_SUCCESS:
            return { ...state, isSentMail: action.payload ,isLoading : false }
        case FETCH_CHANGE_PASSWORD_FAIL :
            return {...state ,isChangeError : action.payload}
            case FETCH_CHANGE_PASSWORD_ADMIN_FAIL :
                return {...state ,messagePassword : action.payload}
        default:
            return { ...state }
    }
}
export default staffReducer;


export const onFetchJwt = payload => ({
    type: FETCH_JWT,
    payload
})

export const onFetchJwtSuccess = () => ({
    type: FETCH_JWT_SUCCESS
})
export const onFetchJwtFailed = (payload) => ({
    type: FETCH_JWT_FAILED,
    payload
})
export const onFetchResetPassword = payload => ({
    type: FETCH_RESET_PASSWORD,
    payload
})
export const onFetchChangePassword = payload => ({
    type: FETCH_CHANGE_PASSWORD,
    payload
})
export const onFetchChangePasswordFail = payload => ({
    type: FETCH_CHANGE_PASSWORD_FAIL,
    payload
})
export const onFetchChangePasswordAdmin = payload => ({
    type: FETCH_CHANGE_PASSWORD_ADMIN,
    payload
})
export const onFetchChangePasswordAdminFail = payload => ({
    type: FETCH_CHANGE_PASSWORD_ADMIN_FAIL,
    payload
})
export const onFetchResetPasswordSuccess = payload => ({
    type: FETCH_RESET_PASSWORD_SUCCESS,
    payload
})

export const onSetLoginLoading = () => ({
    type: SET_LOGIN_LOADING
})

