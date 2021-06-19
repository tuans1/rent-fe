import { combineReducers } from 'redux';
import accountReducer from '../reducers/accountReducer';
import gameReducer from '../reducers/gameReducer';
import adminReducer from '../reducers/adminReducer';
import rentHistoryReducer from './rentHistoryReducer';
import priceReducer from './priceReducer';
import transactionHistoryReducer from './transactionHistoryReducer';

const rootReducer = combineReducers({
    accountReducer, gameReducer, adminReducer, rentHistoryReducer, priceReducer, transactionHistoryReducer
})

export default rootReducer;