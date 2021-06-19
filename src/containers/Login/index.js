import { React } from 'react';
import Login from '../../components/Login';
import { useDispatch } from 'react-redux';
import * as action from '../../reducers/adminReducer';
export default function LoginPage() {
    const dispatch = useDispatch();

    const onSubmit = admin => {
        dispatch(action.onFetchLogin(admin));
    }
    const loginFacebook = admin => {
        dispatch(action.onFetchLoginFacebook(admin))
    }
    return (
        <Login onSubmit={onSubmit}
            loginFacebook={loginFacebook}
        />
    )
}