import { React, useState, useEffect } from 'react';
import AdminPrice from '../../components/Admin/price.js';
import * as action from '../../reducers/priceReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NAV from './nav';
export default function AdminPicePage(props) {
    const dispatch = useDispatch();
    const { prices } = useSelector(state => state.priceReducer);
    const history = useHistory();
    const onSubmit = (price) => {
        dispatch(action.onFetchCreatePrice(price));
    }
    const onDeletePrice = priceId => {
        dispatch(action.onFetchDeletePrice(priceId));
    }
    useEffect(() => {
        dispatch(action.onFetchPrice())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <NAV />
            <AdminPrice priceList={prices}
                onSubmit={onSubmit}
                onDeletePrice={onDeletePrice} />
        </>
    )
}