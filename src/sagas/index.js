
import { all } from 'redux-saga/effects'
import accountSaga from './accountSaga';
import adminSaga from './adminSaga';
import gameSaga from './gameSaga';
import priceSaga from './priceSaga';
import rentHistorySaga from './rentHistorySaga';
import transactionHistorySaga from './transactionHistorySaga';

export default function* rootSaga() {
    yield all([
        accountSaga(), gameSaga(), adminSaga(), rentHistorySaga(), priceSaga(), transactionHistorySaga()
    ])
}