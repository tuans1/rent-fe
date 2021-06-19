import { React } from 'react';
import Account from '../../components/Account';
import { useDispatch } from 'react-redux';
import * as action from '../../reducers/accountReducer';
import * as adminAction from '../../reducers/adminReducer';

export default function AccountPage() {
    const dispatch = useDispatch();
    const onHandleRent = (acc) => {
        dispatch(action.onSetLoading())
        dispatch(action.onFetchRentAccount(acc));
        // dispatch(adminAction.onFetchAdmin())
    }

    return (
        <Account onHandleRent={onHandleRent} />
    )
}