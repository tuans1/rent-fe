
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/priceReducer';
import Api from '../request';
import { Success, Error, Warn } from '../common/toastify';

// get list account in Account + Admin PAGE
function* fetchPriceSaga() {
    try {
        const payload = yield call(Api, '/price', 'get')
        yield put({ type: constants.FETCH_PRICE_SUCCESS, payload })
    } catch (err) {
        console.log(err)
    }
}


function* fetchCreatePriceSaga({ payload }) {
    try {
        yield call(Api, '/price/create', 'post', JSON.stringify(payload));
        yield call(Success, { message: "Cập nhật Giờ thuê thành công !" })
        yield fetchPriceSaga();
    } catch (err) {
        console.log(err)
    }
}


function* fetchDeletePriceSaga({ payload }) {
    try {
        yield call(Api, '/price/delete', 'delete', JSON.stringify({ id: payload }));
        yield call(Success, { message: "Xóa Giờ thuê thành công !" })
        yield fetchPriceSaga();
    } catch (err) {
        console.log(err)
    }
}


export default function* priceSaga() {
    yield takeLatest(constants.FETCH_PRICE, fetchPriceSaga);
    yield takeLatest(constants.FETCH_CREATE_PRICE, fetchCreatePriceSaga);
    yield takeLatest(constants.FETCH_DELETE_PRICE, fetchDeletePriceSaga);
}