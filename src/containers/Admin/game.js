import { React, useState, useEffect } from 'react';
import AdminGame from '../../components/Admin/game.js';
import * as action from '../../reducers/gameReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NAV from './nav';
export default function AdminGamePage(props) {
    const dispatch = useDispatch();
    const { game } = useSelector(state => state.gameReducer);
    const onSubmit = (game) => {
        dispatch(action.onFetchCreateGame(game));
    }
    const onDeleteGame = gameId => {
        dispatch(action.onFetchDeleteGame(gameId));
    }
    useEffect(() => {
        dispatch(action.onFetchGame())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NAV />
            <AdminGame gameList={game}
                onSubmit={onSubmit}
                onDeleteGame={onDeleteGame} />
        </>
    )
}