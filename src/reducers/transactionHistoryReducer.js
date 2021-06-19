export const FETCH_TRANSACTION_HISTORY = "FETCH_TRANSACTION_HISTORY";
export const FETCH_TRANSACTION_HISTORY_SUCCESS = "FETCH_TRANSACTION_HISTORY_SUCCESS";

const initialState = {
    transactions: [],
};

const transactionHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTION_HISTORY_SUCCESS:
            return { ...state, transactions: action.payload }
        default:
            return { ...state }
    }
}
export default transactionHistoryReducer;


export const onFetchTransactionHistory = () => ({
    type: FETCH_TRANSACTION_HISTORY

})

export const onFetchTransactionHistorySuccess = (payload) => ({
    type: FETCH_TRANSACTION_HISTORY_SUCCESS,
    payload
})

