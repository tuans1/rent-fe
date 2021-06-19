import { React, useState, useEffect } from 'react';
import AdminAccount from '../../components/Admin/account.js';
import * as action from '../../reducers/accountReducer';
import * as gameAction from '../../reducers/gameReducer';
import * as priceAction from '../../reducers/priceReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NAV from './nav';

export default function AdminAccountPage() {
    const dispatch = useDispatch();
    const { accounts } = useSelector(state => state.accountReducer);
    const { game } = useSelector(state => state.gameReducer);
    const history = useHistory();
    const onSubmit = (account) => {
        if (account.id) {
            dispatch(action.onFetchEditAccount(account));
        } else {
            dispatch(action.onFetchCreateAccount(account));
        }
    }
    const onDeleteAccount = accountId => {
        dispatch(action.onFetchDeleteAccount(accountId));
    }
    useEffect(() => {
        dispatch(gameAction.onFetchGame())
        dispatch(action.onFetchAccount())
        dispatch(priceAction.onFetchPrice())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NAV />
            <AdminAccount accountsList={accounts}
                gameList={game}
                onSubmit={onSubmit}
                onDeleteAccount={onDeleteAccount}
            />
        </>
    )
}