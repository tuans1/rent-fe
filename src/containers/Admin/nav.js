import { React } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
export default function Nav() {
    const history = useHistory();
    const onLogOut = () => {
        localStorage.clear();
        history.push("/dang-nhap")
        window.location.reload();
    }
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/admin" className="navbar-brand" href="#">ADMIN</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav" style={{ display: "flex", justifyContent: "space-between" }}>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/admin/game" className="nav-link" href="#">Quản Lý Game<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/price" className="nav-link" href="#">Quản Lý Giờ Thuê<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/price" className="nav-link" href="#">Quản Lý USER<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/total-transaction" className="nav-link" href="#">Tổng Hợp Giao Dịch</Link>
                        </li>
                    </ul>
                    <div>
                        <button onClick={onLogOut} className="btn btn-info" style={{ float: "right" }}>ĐĂNG XUẤT</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
