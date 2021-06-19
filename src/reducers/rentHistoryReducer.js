export const FETCH_HISTORY_RENT = "FETCH_HISTORY_RENT";
export const FETCH_HISTORY_RENT_SUCCESS = "FETCH_HISTORY_RENT_SUCCESS";

const initialState = {
    histories: []

};

const rentHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HISTORY_RENT_SUCCESS:
            return { ...state, histories: action.payload }
        default:
            return { ...state }
    }
}
export default rentHistoryReducer;


export const onFetchHistoryRent = () => ({
    type: FETCH_HISTORY_RENT

})

export const onFetchHistoryRentSuccess = (payload) => ({
    type: FETCH_HISTORY_RENT_SUCCESS,
    payload
})
