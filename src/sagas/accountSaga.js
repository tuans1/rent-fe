
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/accountReducer';
import Api from '../request';
import * as adminConstants from '../reducers/adminReducer';
import { Success, Error, Warn } from '../common/toastify';

const delay = time => new Promise(resolve => setTimeout(resolve, time));
// get list account in Account + Admin PAGE
function* fetchAccountSaga({ payload }) {
    try {
        const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&page=' + payload + '&game=', 'get')
        yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}

// create account then render new list
function* fetchCreateAccountSaga({ payload }) {
    try {
        yield call(Api, '/account/create', 'post', JSON.stringify(payload));
        const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&page=', 'get')
        yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        yield call(Success, { message: "Tạo Acc thành công !" })
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}
// edit account then render new list
function* fetchEditAccountSaga({ payload }) {
    try {
        yield call(Api, '/account/edit', 'put', JSON.stringify(payload));
        const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&page=', 'get')
        yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        yield call(Success, { message: "Cập nhật Acc thành công !" })
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}
// delete account then render new list
function* fetchDeleteAccountSaga({ payload }) {
    try {
        yield call(Api, '/account/delete', 'delete', JSON.stringify({ id: payload }));
        const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&page=', 'get')
        yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        yield call(Success, { message: "Xóa Acc thành công !" })
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}

function* fetchRentSaga({ payload }) {
    try {
        payload.userId = localStorage.getItem("id");
        const message = yield call(Api, '/admin/check-money', 'post', JSON.stringify(payload));
        if (message.error) {
            yield call(delay, 1500);
            yield call(Warn, { message: message.error })
            yield put({ type: constants.SET_OFF_LOADING })
            return;
        }
        yield call(delay, 1500);
        yield call(Success, { message: "Thuê Acc thành công !" })
        yield put({ type: constants.SET_OFF_LOADING })
        const admin = yield call(Api, '/account/rent', 'post', JSON.stringify(payload));
        localStorage.setItem("token", admin.token);
        localStorage.setItem("money", admin.money);
        const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&page=', 'get')
        yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        yield put({ type: adminConstants.FETCH_ADMIN_SUCCESS })
    } catch (err) {
        yield call(Error, { message: "Error !" })
        yield put({ type: constants.SET_OFF_LOADING })
        console.log(err)
    }
}

function* fetchSearchAccountSaga({ payload }) {
    try {
        if (typeof (payload.game) === "string") {
            const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&game=' + payload.game, 'get')
            console.log(data)
            yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        } else {
            const data = yield call(Api, '/account?role=' + localStorage.getItem("role") + '&active=' + payload.active, 'get')
            console.log(data)
            yield put({ type: constants.FETCH_ACCOUNT_SUCCESS, data })
        }
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}

export default function* accountSaga() {
    yield takeLatest(constants.FETCH_ACCOUNT, fetchAccountSaga);
    yield takeLatest(constants.FETCH_CREATE_ACCOUNT, fetchCreateAccountSaga);
    yield takeLatest(constants.FETCH_EDIT_ACCOUNT, fetchEditAccountSaga);
    yield takeLatest(constants.FETCH_DELETE_ACCOUNT, fetchDeleteAccountSaga);
    yield takeLatest(constants.FETCH_RENT_ACCOUNT, fetchRentSaga);
    yield takeLatest(constants.FETCH_SEARCH_ACCOUNT, fetchSearchAccountSaga);
}