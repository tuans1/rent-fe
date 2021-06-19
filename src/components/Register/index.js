import { React, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import * as action from '../../reducers/adminReducer';
import '../Login/style.css';
import { useDispatch } from 'react-redux';
export default function Register(props) {
    const { register, formState: { errors }, setValue, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const onSubmit = admin => {
        if (admin.password !== admin.confirmPw) {
            alert("MK k khop")
            return;
        } else {
            dispatch(action.onFetchRegisterAdmin(admin))
        }
    }

    useEffect(() => {
        reset()
    }, [])

    return (
        <>
            <div className="login-wrap" style={{ textAlign: "center", width: "300px", position: 'relative', left: "38%" }}>
                <h4 className="label_login" style={{ margin: "20px 0" }}>ĐĂNG KÝ TÀI KHOẢN</h4>

                <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input type="email" className="form-control" style={{ textAlign: "center" }} placeholder="Email đăng nhập" {...register("email", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.email?.type === 'required' && "Email không được bỏ trống !"}</span>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" style={{ textAlign: "center" }} placeholder="Mật khẩu" {...register("password", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.password?.type === 'required' && "Mật khẩu không được bỏ trống !"}</span>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" style={{ textAlign: "center" }} placeholder="Nhập lại mật khẩu" {...register("confirmPw", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.confirmPw?.type === 'required' && "Nhập lại mật khẩu không được bỏ trống !"}</span>
                    </div>
                    <Button type="submit" className="btn-login btn-success" form="hook-form" style={{ width: "100%" }} >ĐĂNG KÝ</Button>
                </form>
            </div>
        </>
    )
}