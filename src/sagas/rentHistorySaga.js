
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/rentHistoryReducer';
import Api from '../request';

// get list account in Account + Admin PAGE
function* fetchRentHistorySaga() {
    try {
        const payload = yield call(Api, '/rent-history/' + localStorage.getItem("id"), 'get')
        yield put({ type: constants.FETCH_HISTORY_RENT_SUCCESS, payload })
    } catch (err) {
        console.log(err)
    }
}



export default function* rentHistorySaga() {
    yield takeLatest(constants.FETCH_HISTORY_RENT, fetchRentHistorySaga);
}