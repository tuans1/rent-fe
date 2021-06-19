export const FETCH_PRICE = "FETCH_PRICE";
export const FETCH_PRICE_SUCCESS = "FETCH_PRICE_SUCCESS";
export const FETCH_CREATE_PRICE = "FETCH_CREATE_PRICE";
export const FETCH_DELETE_PRICE = "FETCH_DELETE_PRICE";

const initialState = {
    prices: []
};

const priceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRICE_SUCCESS:
            return { ...state, prices: action.payload }
        default:
            return { ...state }
    }
}
export default priceReducer;


export const onFetchPrice = () => ({
    type: FETCH_PRICE,
})

export const onFetchPriceSuccess = payload => ({
    type: FETCH_PRICE_SUCCESS,
    payload
})
export const onFetchCreatePrice = (payload) => ({
    type: FETCH_CREATE_PRICE,
    payload
})
export const onFetchDeletePrice = (payload) => ({
    type: FETCH_DELETE_PRICE,
    payload
})

