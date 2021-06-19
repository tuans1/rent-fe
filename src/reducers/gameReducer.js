export const FETCH_GAME = "FETCH_GAME";
export const FETCH_GAME_SUCCESS = "FETCH_GAME_SUCCESS";

export const FETCH_CREATE_GAME = "FETCH_CREATE_GAME";
export const FETCH_DELETE_GAME = "FETCH_DELETE_GAME";
export const FETCH_UPLOAD_IMAGE = "FETCH_UPLOAD_IMAGE";



export const ACTIVE_NOTIFY = "ACTIVE_NOTIFY";
const initialState = {
    game: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAME_SUCCESS:
            return { ...state, game: action.payload }
        default:
            return { ...state }
    }
}
export default gameReducer;


export const onFetchGame = () => ({
    type: FETCH_GAME,
})

export const onFetchGameSuccess = payload => ({
    type: FETCH_GAME_SUCCESS,
    payload
})

export const onFetchCreateGame = payload => ({
    type: FETCH_CREATE_GAME,
    payload
})

export const onFetchDeleteGame = payload => ({
    type: FETCH_DELETE_GAME,
    payload
})

export const onFetchUploadImage = payload => ({
    type: FETCH_UPLOAD_IMAGE,
    payload
})
