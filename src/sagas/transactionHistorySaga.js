
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/transactionHistoryReducer';
import Api from '../request';

function* fetchTransactionHistorySaga() {
    try {
        const data = yield call(Api, '/transaction-history?userId='+localStorage.getItem("id"), 'get')
        yield put({ type: constants.FETCH_TRANSACTION_HISTORY_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
    }
}



export default function* transactionHistorySaga() {
    yield takeLatest(constants.FETCH_TRANSACTION_HISTORY, fetchTransactionHistorySaga);
}