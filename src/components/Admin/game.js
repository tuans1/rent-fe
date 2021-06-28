import { React, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import './style.css';
const DEFAULT_STATE = {
    _id: ""
}
export default function AdminGame(props) {
    const [show, setShow] = useState(false);
    const { register, formState: { errors }, watch, setValue, handleSubmit, reset } = useForm();
    const [game, setGame] = useState({});
    const [imagePreview, setImagePreview] = useState();

    const onSubmit = game => {
        props.onSubmit(game);
        setShow(false);
    };
    const handleClose = () => {
        setGame({
            ...DEFAULT_STATE
        })
        setShow(false);
    };
    const handleShow = () => {
        reset();
        setShow(true);
        setImagePreview("");
        setGame("");
    };
    const onSetDeleteGame = game => {
        setShow(true);
        setGame({
            ...game
        })
    }
    const onDeleteGame = () => {
        props.onDeleteGame(game._id);
        setShow(false);
    }
    const handleChangeImage = async e => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const base64 = await convertBast64(e.target.files[0]);
        setValue("image", base64);
    }
    const convertBast64 = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = e => {
                reject(e);
            }
        })
    }
    return (
        <>
            <div className="container">
                <h3 style={{ color: "black",margin : "15px 0" }}>QUẢN LÝ GAME</h3>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>{game._id ? "Xoá GAME" : "Thêm GAME"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {game._id ? `Bạn có chắc chắn xóa Game: ${game.name}`
                            : <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Tên Game</label>
                                    <input className="form-control" autoComplete="off" {...register("name", { required: true })} />
                                    <span style={{ color: 'red' }}>{errors.name?.type === 'required' && "name is required !"}</span>
                                </div>
                                <div className="mb-3" >
                                    <span className="btn btn-primary btn-file"><i className="fa fa-upload"></i>Thêm Ảnh<input type="file" id="img" name="img" accept="image/*" className="w-100" onChange={(e) => handleChangeImage(e)} /></span>
                                    <img src={imagePreview} style={{ width: "100%" }} />
                                </div>
                            </form>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                        {game._id ? <Button variant="warning" onClick={onDeleteGame}>Xóa</Button>
                            : <Button variant="primary" type="submit" form="hook-form" >Đồng Ý</Button>}
                    </Modal.Footer>
                </Modal>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">GAME</th>
                            <th scope="col">IMAGE</th>
                            <th scope="col"> <button type="button" className="btn btn-info" onClick={handleShow} >Thêm Mới</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.gameList && props.gameList.map((game, i) => {
                            return (
                                <tr key={game._id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{game.name}</td>
                                    <td><img style={{ width: "100px" }} src={game.image} /></td>
                                    <td><Button variant="warning" onClick={() => onSetDeleteGame(game)}>Xóa</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}