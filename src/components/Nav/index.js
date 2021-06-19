
import { React, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import * as action from '../../reducers/adminReducer';
import * as rentHistoryAction from '../../reducers/rentHistoryReducer';
import './style.css'

function Nav() {
    const history = useHistory();
    const [login, setLogin] = useState();
    const isInitialMount = useRef(true);

    const dispatch = useDispatch();
    const { isLogin, requestingAction } = useSelector(state => state.adminReducer);
    const id = localStorage.getItem("id");
    const [money, setMoney] = useState(0);
    // login xog sẽ đổi Login => Logout
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(true);
            setMoney(localStorage.getItem("money"));
        }
    }, [isLogin])
    // sau khi rent thành công => redirect sang history
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (requestingAction === action.FETCH_ADMIN_PAYMENT_SUCCESS) {
                setMoney(localStorage.getItem("money"));
                window.location.reload();
            }
            if (requestingAction === action.FETCH_ADMIN_SUCCESS) {
                // Your useEffect code here to be run on update
                dispatch(rentHistoryAction.onFetchHistoryRent());
                setMoney(localStorage.getItem("money"));
                history.push("/lich-su-thue");
            }
        }
    }, [requestingAction])
    const onLogOut = () => {
        localStorage.clear()
        history.push("/dang-nhap");
        setLogin(false);
        // thay state của isLogin => False
        dispatch(action.onSetLogout());
    }

    return (
        <>
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg " style={{ position: "fixed" }}>
                <div className="container ">
                    {/* <!-- Container wrapper --> */}
                    <div className="container-fluid">
                        {/* <!-- Navbar brand --> */}
                        {/* <!-- Toggle button --> */}


                        {/* <!-- Collapsible wrapper --> */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <Link to="/" className="navbar-brand link" >TRANG CHỦ</Link>
                            {/* <!-- Left links --> */}
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/nap-the" className="nav-link link active" aria-current="page" >Nạp thẻ</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/huong-dan" className="nav-link link" >Hướng dẫn thuê Acc</Link>
                                </li>
                                {/* <!-- Navbar dropdown --> */}
                                <li className="nav-item">
                                    <Link to="/" className="nav-link link" tabIndex="-1">Liên Hệ</Link>
                                </li>
                            </ul>
                            {login ? <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{money && money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ</button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item">ID : {id}</li>
                                    <li><Link to="/" className="dropdown-item" >LỊCH SỬ NẠP TIỀN</Link></li>
                                    <li><Link to="lich-su-thue" className="dropdown-item" >TÀI KHOẢN ĐÃ THUÊ</Link></li>
                                    <Link to="/dang-nhap" className="dropdown-item" onClick={onLogOut}>ĐĂNG XUẤT</Link>
                                </ul>
                            </div> : <Link to="/dang-nhap" style={{ color: 'white', textDecoration: "none" }}><h2>Đăng Nhập</h2></Link>}
                        </div>
                        {/* <!-- Collapsible wrapper --> */}
                    </div>
                    {/* <!-- Container wrapper --> */}
                </div>
            </nav>
            {/* <!-- Navbar --> */}
            <div className="banner">
            </div >
        </>
    )
}

export default Nav;