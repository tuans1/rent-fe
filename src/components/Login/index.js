import { React, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import './style.css';
import { Link } from 'react-router-dom';


export default function Login(props) {
    const { register, formState: { errors }, setValue, handleSubmit, reset } = useForm();
    const { isLogin } = useSelector(state => state.adminReducer);
    const history = useHistory();
    const onSubmit = login => {
        props.onSubmit(login);
    }
    useEffect(() => {
        if (localStorage.getItem("id") && localStorage.getItem("role") === "user") {
            history.push("/");
        }
        if (localStorage.getItem("id") && localStorage.getItem("role") === "admin") {
            history.push("/admin");
        }
    }, [isLogin])
    const responseFacebook = (response) => {
        props.loginFacebook(response)
    }
    return (
        <>


            <div className="login-wrap" style={{ textAlign: "center", width: "300px", position: 'relative', left: "38%" }}>
                <h2 className="label_login">ĐĂNG NHẬP</h2>
                <FacebookLogin
                    appId="531255731225475"
                    // autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass="my-facebook-button-class btn"
                    icon="fa-facebook"
                    textButton="ĐĂNG NHẬP BẰNG FACEBOOK"
                    size="metro"
                />
                <h3 className="or">HOẶC</h3>
                <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <input className="form-control" style={{ textAlign: "center" }} placeholder="Email đăng nhập" {...register("email", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.email?.type === 'required' && "name is required !"}</span>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" style={{ textAlign: "center" }} placeholder="Mật khẩu" {...register("password", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.password?.type === 'required' && "password is required !"}</span>
                    </div>
                    <Button type="submit" className="btn-login btn-danger" form="hook-form" style={{ width: "100%" }} >ĐĂNG NHẬP</Button>
                    <Link to="dang-ky"><Button className="btn-login btn-success" style={{ width: "100%", margin: "15px 0" }} >ĐĂNG KÝ</Button></Link>
                    <Button className="btn-login btn-secondary" style={{ width: "100%" }} >LẤY LẠI MẬT KHẨU</Button>
                </form>
            </div>
        </>
    )
}