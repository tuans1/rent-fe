export const FETCH_ACCOUNT = "FETCH_ACCOUNT";
export const FETCH_ACCOUNT_SUCCESS = "FETCH_ACCOUNT_SUCCESS";

export const FETCH_CREATE_ACCOUNT = "FETCH_CREATE_ACCOUNT";
export const FETCH_EDIT_ACCOUNT = "FETCH_EDIT_ACCOUNT";
export const FETCH_DELETE_ACCOUNT = "FETCH_DELETE_ACCOUNT";
export const SET_ON_LOADING = "SET_ON_LOADING";
export const SET_OFF_LOADING = "SET_OFF_LOADING";
export const RESET_ACCOUNT_LIST = "RESET_ACCOUNT_LIST";
export const FETCH_SEARCH_ACCOUNT = "FETCH_SEARCH_ACCOUNT";
export const FETCH_SEARCH_ACCOUNT_SUCCESS = "FETCH_SEARCH_ACCOUNT_SUCCESS";
export const FETCH_RENT_ACCOUNT = "FETCH_RENT_ACCOUNT";
export const SET_LOAD_PAGE = "SET_LOAD_PAGE";

const initialState = {
    page: 1,
    accounts: [],
    accountLoading: false,
    accountLength: 8,
    searchGame: ""
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACCOUNT_SUCCESS:
            if (localStorage.getItem("role") === "admin") {
                return { ...state, accounts: action.data }
            } else {
                action.data.map(x => state.accounts.push(x))
                state.accountLength = action.data.length
            }
            return { ...state, }
        case RESET_ACCOUNT_LIST:
            return { ...state, accounts: [] }
        case SET_LOAD_PAGE:
            return { ...state, page: state.page + 1 }
        case FETCH_SEARCH_ACCOUNT:
            state.searchGame = action.payload
            return { ...state }
        case FETCH_SEARCH_ACCOUNT_SUCCESS:
            state.accounts = action.data;
            state.accountLength = action.data.length
            state.page = 1;
            return { ...state }
        case SET_ON_LOADING:
            return { ...state, accountLoading: true }
        case SET_OFF_LOADING:
            return { ...state, accountLoading: false }
        default:
            return { ...state }
    }
}
export default accountReducer;

// fetch account first time
export const onFetchAccount = payload => ({
    type: FETCH_ACCOUNT,
    payload
})
// reset
export const onResetAccountList = () => ({
    type: RESET_ACCOUNT_LIST,
})

export const onFetchAccountSuccess = payload => ({
    type: FETCH_ACCOUNT_SUCCESS,
    payload
})
// search game
export const onFetchSearchAccount = payload => ({
    type: FETCH_SEARCH_ACCOUNT,
    payload
})
export const onFetchSearchAccountSuccess = payload => ({
    type: FETCH_SEARCH_ACCOUNT_SUCCESS,
    payload
})
export const onFetchCreateAccount = payload => ({
    type: FETCH_CREATE_ACCOUNT,
    payload
})
export const onFetchEditAccount = payload => ({
    type: FETCH_EDIT_ACCOUNT,
    payload
})
export const onFetchDeleteAccount = payload => ({
    type: FETCH_DELETE_ACCOUNT,
    payload
})
export const onSetLoading = () => ({
    type: SET_ON_LOADING
})
export const onLoadPage = () => ({
    type: SET_LOAD_PAGE
})
export const onFetchRentAccount = payload => ({
    type: FETCH_RENT_ACCOUNT,
    payload
})
