
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../reducers/adminReducer';
import Api from '../request';
import { Success, Error, Warn } from '../common/toastify';
import Swal from 'sweetalert2'

// get list account in Account + Admin PAGE
const delay = time => new Promise(resolve => setTimeout(resolve, time));
function* fetchAdminSaga({ payload }) {
    try {
        const data = yield call(Api, '/login', 'post', JSON.stringify(payload))
        console.log(data);
        if (data.admin) {
            yield put({ type: constants.FETCH_LOGIN_SUCCESS, payload: data.admin })
            localStorage.setItem("token", data.admin.token);
            localStorage.setItem("name", data.admin.name);
            localStorage.setItem("id", data.admin.id);
            localStorage.setItem("role", data.admin.role);
            localStorage.setItem("money", data.admin.money);
        } else {
            yield call(Error, { message: data.error })
        }
    } catch (err) {
        yield call(Error, { message: "Error !" })
        console.log(err)
    }
}
function* fetchAdminInfoSaga() {
    try {
        const data = yield call(Api, '/admin/' + localStorage.getItem("id"), 'get')
        if (data[0]) {
            localStorage.setItem("money", data[0].money);
            yield put({ type: constants.FETCH_LOGIN_SUCCESS })
        }
    } catch (e) {
        yield call(Error, { message: "Error !" })
        console.log(e)
    }
}

function* fetchAdminFacebookSaga({ payload }) {
    try {
        const data = yield call(Api, '/login-fb', 'post', JSON.stringify(payload))
        if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("id", data.id);
            localStorage.setItem("role", data.role);
            localStorage.setItem("money", data.money);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 3000
            })
            yield put({ type: constants.FETCH_LOGIN_SUCCESS, payload: data })
        }
    } catch (e) {
        yield call(Error, { message: "Error !" })
        console.log(e)
    }
}

function* fetchRegisterAminSaga({ payload }) {
    try {
        const data = yield call(Api, '/register', 'post', JSON.stringify(payload))
        if (data.duplicate) {
            yield call(Error, { message: data.duplicate })
        }
    } catch (e) {
        yield call(Error, { message: "Error !" })
        console.log(e)
    }
}
function* fetchAdminPayment({ payload }) {
    try {
        payload.userId = localStorage.getItem("id");
        const data = yield call(Api, '/admin/payment', 'post', JSON.stringify(payload))
        if (data.admin) {
            yield call(delay, 3000)
            yield put({ type: constants.SET_OFF_LOADING })
            localStorage.setItem("money", data.admin.money);
            yield put({ type: constants.FETCH_ADMIN_PAYMENT_SUCCESS })
        }
    } catch (e) {
        yield call(Error, { message: "Error !" })
        console.log(e)
    }
}
export default function* adminSaga() {
    yield takeLatest(constants.FETCH_LOGIN, fetchAdminSaga);
    yield takeLatest(constants.FETCH_ADMIN, fetchAdminInfoSaga);
    yield takeLatest(constants.FETCH_LOGIN_FACEBOOK, fetchAdminFacebookSaga);
    yield takeLatest(constants.FETCH_REGISTER_ADMIN, fetchRegisterAminSaga);
    yield takeLatest(constants.FETCH_ADMIN_PAYMENT, fetchAdminPayment);
}