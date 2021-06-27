
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/gameReducer';
import Api from '../request';
import { Success, Error, Warn } from '../common/toastify';
// get list account in Account + Admin PAGE
function* fetchGameSaga() {
    try {
        const payload = yield call(Api, '/game', 'get')
        yield put({ type: constants.FETCH_GAME_SUCCESS, payload })
    } catch (err) {
        console.log(err)
    }
}

// create account then render new list
function* fetchCreateGameSaga({ payload }) {
    try {
        yield call(Api, '/game/create', 'post', JSON.stringify(payload));
        yield fetchGameSaga();
        yield call(Success, { message: "Cập nhật Game thành công !" })
    } catch (err) {
        console.log(err)
    }
}

// delete account then render new list
function* fetchDeleteGameSaga({ payload }) {
    try {
        yield call(Api, '/game/delete', 'delete', JSON.stringify({ id: payload }));
        yield fetchGameSaga();
        yield call(Success, { message: "Xóa Game thành công !" })
    } catch (err) {
        console.log(err)
    }
}


export default function* gameSaga() {
    yield takeLatest(constants.FETCH_GAME, fetchGameSaga);
    yield takeLatest(constants.FETCH_CREATE_GAME, fetchCreateGameSaga);
    yield takeLatest(constants.FETCH_DELETE_GAME, fetchDeleteGameSaga);
}