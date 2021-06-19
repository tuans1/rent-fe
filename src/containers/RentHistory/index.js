import { React, useEffect } from 'react';
import RentHistory from '../../components/RentHistory';
import * as action from '../../reducers/rentHistoryReducer';
import { useDispatch, useSelector } from 'react-redux';


export default function RentHistoryPage() {
    const { histories } = useSelector(state => state.rentHistoryReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(action.onFetchHistoryRent());
    }, [])

    return (
        <RentHistory
            histories={histories} />
    )
}
