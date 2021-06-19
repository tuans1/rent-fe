export const FETCH_LOGIN = "FETCH_LOGIN";
export const FETCH_LOGIN_FACEBOOK = "FETCH_LOGIN_FACEBOOK";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_ADMIN = "FETCH_ADMIN";
export const FETCH_ADMIN_SUCCESS = "FETCH_ADMIN_SUCCESS";
export const FETCH_LOGIN_FAILED = "FETCH_LOGIN_FAILED";
export const FETCH_REGISTER_ADMIN = "FETCH_REGISTER_ADMIN";
export const FETCH_REGISTER_ADMIN_DUPLICATE = "FETCH_REGISTER_ADMIN_DUPLICATE";

export const FETCH_ADMIN_PAYMENT = "FETCH_ADMIN_PAYMENT";
export const FETCH_ADMIN_PAYMENT_SUCCESS = "FETCH_ADMIN_PAYMENT_SUCCESS";
export const FETCH_CHANGE_PASSWORD_ADMIN = "FETCH_CHANGE_PASSWORD_ADMIN";
export const FETCH_CHANGE_PASSWORD_ADMIN_FAIL = "FETCH_CHANGE_PASSWORD_ADMIN_FAIL";
export const SET_LOGOUT = "SET_LOGOUT";

export const CLEAR_REQUESTING_ACTION = "CLEAR_REQUESTING_ACTION";
export const SET_ON_LOADING = "SET_ON_LOADING";
export const SET_OFF_LOADING = "SET_OFF_LOADING";

const initialState = {
    isLogin: false,
    adminSuccess: false,
    paymentSuccess: false,
    requestingAction: "",
    admin: {},
    adminLoading: false
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_SUCCESS:
            return { ...state, isLogin: true }
        case FETCH_ADMIN_SUCCESS:
            return { ...state, requestingAction: action.type }
        case FETCH_ADMIN_PAYMENT_SUCCESS:
            return { ...state, requestingAction: action.type }
        case CLEAR_REQUESTING_ACTION:
            return { ...state, requestingAction: "" }
        case SET_LOGOUT:
            return { ...state, isLogin: false, admin: {} }
        case SET_ON_LOADING:
            return { ...state, adminLoading: true }
        case SET_OFF_LOADING:
            return { ...state, adminLoading: false }
        default:
            return { ...state }
    }
}
export default adminReducer;


export const onFetchLogin = payload => ({
    type: FETCH_LOGIN,
    payload
})
export const onFetchLoginFacebook = payload => ({
    type: FETCH_LOGIN_FACEBOOK,
    payload
})

export const onFetchLoginSuccess = () => ({
    type: FETCH_LOGIN_SUCCESS,
})

export const onFetchAdmin = () => ({
    type: FETCH_ADMIN,
})
export const onFetchAdminSuccess = () => ({
    type: FETCH_ADMIN_SUCCESS,
})
export const onFetchRegisterAdmin = payload => ({
    type: FETCH_REGISTER_ADMIN,
    payload
})
export const onFetchAdminPayment = payload => ({
    type: FETCH_ADMIN_PAYMENT,
    payload
})
export const onFetchResetPasswordSuccess = payload => ({
    type: FETCH_REGISTER_ADMIN_DUPLICATE,
    payload
})
export const onClearRequestingAction = () => ({
    type: CLEAR_REQUESTING_ACTION,
})
export const onSetLogout = () => ({
    type: SET_LOGOUT
})
export const onSetLoading = () => ({
    type: SET_ON_LOADING
})
