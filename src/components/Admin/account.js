import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

const DEFAULT_STATE = {
    _id: ""
}

export default function AdminAccount(props) {
    const [show, setShow] = useState(false);
    const [account, setAccount] = useState({});
    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();
    const onSubmit = account => {
        props.onSubmit(account);
        setShow(false);
    };
    const handleClose = () => {
        setAccount({
            ...DEFAULT_STATE
        })
        setShow(false);
    };
    const handleShow = () => {
        reset();
        setShow(true);
    };
    const onSetEditAccount = (acc) => {
        setShow(true)
        setValue("name", acc.name);
        setValue("acc", acc.acc);
        setValue("id", acc._id);
        setValue("password", acc.password);
        setValue("game", acc.game);
    }
    const onSetDeleteAccount = acc => {
        setShow(true);
        setAccount({
            ...acc
        })
    }

    const onDeleteAccount = () => {
        props.onDeleteAccount(account._id);
        setShow(false);
    }
    const statusAcc = acc => {
        const then = moment(new Date(acc.updateAt)).add(acc.rentalTime, 'hours');
        const now = moment(new Date);
        if (then > now) {
            return (<p style={{ width: "100%" }}>Đang được thuê</p>)
        } else {
            if (acc.isActive) {
                return (<p style={{ width: "100%" }}>SẴN SÀNG</p>)
            } else {
                return (<p style={{ width: "100%" }}>CHỜ ĐỔI PASS</p>)
            }
        }
    }
    return (
        <>
            <div className="container">
                <h3 style={{ color: "black",margin : "15px 0" }}>QUẢN LÝ TÀI KHOẢN</h3>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{account._id ? "Xoá tài khoản" : watch("id") ? "Sửa tài khoản" : "Thêm tài khoản"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {account._id ? `Bạn có chắc chắn xóa Tài khoản : ${account.acc}`
                            : <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                                {watch("id") &&
                                    <div className="mb-3">
                                        <label className="form-label">Tên Tài Khoản</label>
                                        <input className="form-control" {...register("acc", { required: true })} />
                                        <span style={{ color: 'red' }}>{errors.acc?.type === 'required' && "acc is required !"}</span>
                                    </div>
                                }
                                <div className="mb-3">
                                    <label className="form-label">Tên Đăng Nhập</label>
                                    <input className="form-control" {...register("name", { required: true })} />
                                    <span style={{ color: 'red' }}>{errors.name?.type === 'required' && "name is required !"}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mật Khẩu</label>
                                    <input type="text" className="form-control" {...register("password", { required: true })} />
                                    <span style={{ color: 'red' }}>{errors.password?.type === 'required' && "Password is required !"}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Game</label>
                                    <select className="form-select" disabled={watch("id") ? true : false} {...register("game", { required: true })}>
                                        <option defaultValue value="">Chọn Game</option>
                                        {props.gameList.map(game => {
                                            return (
                                                <option key={game._id} value={game._id}>{game.name}</option>
                                            )
                                        })}
                                    </select>
                                    <span style={{ color: 'red' }}>{errors.game?.type === 'required' && "Please choose Game !"}</span>
                                </div>
                            </form>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        {account._id ? <Button variant="danger" onClick={onDeleteAccount}>Xóa</Button>
                            : <Button variant="primary" type="submit" form="hook-form"  >Save Changes</Button>}
                    </Modal.Footer>
                </Modal>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên Tài Khoản</th>
                            <th scope="col">Tên Đăng Nhập</th>
                            <th scope="col">Mật Khẩu</th>
                            <th scope="col">Status</th>
                            <th scope="col">Time</th>
                            <th scope="col"><button type="button" className="btn btn-info" onClick={handleShow} >Thêm Mới</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.accountsList && props.accountsList.map((acc, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{acc.acc}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.password}</td>
                                    <td>{statusAcc(acc)}</td>
                                    <td>{moment(acc.updateAt).add(acc.rentalTime, 'hours').format("DD-MM-YYYY HH:mm:ss")}</td>
                                    <td><Button onClick={() => onSetEditAccount(acc)}>Sửa</Button><Button variant="warning" onClick={() => onSetDeleteAccount(acc)}>Xoá</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
