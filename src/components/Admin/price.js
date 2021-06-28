import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import './style.css';
const DEFAULT_STATE = {
    _id: ""
}
export default function AdminPrice(props) {
    const [show, setShow] = useState(false);
    const { register, formState: { errors }, watch, setValue, handleSubmit, reset } = useForm();
    const [price, setPrice] = useState({ _id: "" });
    const onSubmit = price => {
        props.onSubmit(price);
        setShow(false);

    };
    const handleClose = () => {
        setPrice({
            ...DEFAULT_STATE
        })
        setShow(false);
    };
    const handleShow = () => {
        reset();
        setShow(true);
    };
    const onSetDeletePrice = price => {
        setShow(true);
        setPrice({
            ...price
        })
    }
    const onDeletePrice = () => {
        props.onDeletePrice(price._id);
        setPrice({ _id: "" });
        setShow(false);
    }
    return (
        <>
            <div className="container">
                <h3 style={{ color: "black",margin : "15px 0" }}>QUẢN LÝ GIỜ THUÊ</h3>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{price._id ? "Xoá Mức Giá" : "Thêm Mức Giá"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {price._id ? `Bạn có chắc chắn xóa Mức giá: ${price.price}`
                            : <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Thời Gian</label>
                                    <input className="form-control" autoComplete="off" {...register("time", { required: true })} />
                                    <span style={{ color: 'red' }}>{errors.time?.type === 'required' && "Vui lòng nhập thời gian !"}</span>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mức Giá</label>
                                    <input className="form-control" autoComplete="off" {...register("price", { required: true })} />
                                    <span style={{ color: 'red' }}>{errors.price?.type === 'required' && "Vui lòng nhập mức giá!"}</span>
                                </div>
                            </form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        {price._id ? <Button variant="warning" onClick={onDeletePrice}>Xóa</Button>
                            : <Button variant="primary" type="submit" form="hook-form" >Đồng Ý</Button>}
                    </Modal.Footer>
                </Modal>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">THỜI GIAN</th>
                            <th scope="col">MỨC GIÁ</th>
                            <th scope="col"><button type="button" className="btn btn-info" onClick={handleShow}>Thêm Mới</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.priceList && props.priceList.map((price, i) => {
                            return (
                                <tr key={price._id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{price.time} giờ</td>
                                    <td>{price.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</td>
                                    <td><Button variant="warning" onClick={() => onSetDeletePrice(price)}>Xóa</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}