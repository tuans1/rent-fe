import { React, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap';
import './style.css'
import * as action from '../../reducers/adminReducer';
import * as transactionAction from '../../reducers/transactionHistoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function Transaction() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const dispatch = useDispatch()
    const { transactions } = useSelector(state => state.transactionHistoryReducer)
    const onSubmit = card => {
        dispatch(action.onSetLoading())
        dispatch(action.onClearRequestingAction())
        dispatch(action.onFetchAdminPayment(card))
    }
    useEffect(() => {
        dispatch(transactionAction.onFetchTransactionHistory())
    }, [])

    return (
        <>
            <div style={{ textAlign: "center", width: "400px", position: 'relative', left: "34%", color: "white", margin: "20px 0" }}>
                <h2 >NẠP THẺ</h2>
                <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <select className="form-select" {...register("type", { required: true })}>
                            <option defaultValue value="">Chọn loại thẻ</option>
                            <option value="Viettel">Vietell</option>
                            <option value="Vinaphone">Vinaphone</option>
                            <option value="Mobiphone">Mobiphone</option>
                        </select>
                        <span style={{ color: 'red' }}>{errors.type?.type === 'required' && "Please choose Game !"}</span>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" style={{ textAlign: "center" }} placeholder="Nhập Serial" {...register("serial", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.serial?.type === 'required' && "name is required !"}</span>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" style={{ textAlign: "center" }} placeholder="Nhập Mã thẻ" {...register("code", { required: true })} />
                        <span style={{ color: 'red' }}>{errors.code?.type === 'required' && "code is required !"}</span>
                    </div>
                    <Button type="submit" className="btn-login btn-primary" form="hook-form"  >XÁC NHẬN</Button>
                </form>
            </div>
            <div className="history-wrap" style={{paddingBottom : "5em"}}>
                <h2 style={{ color: "white" }}>LỊCH SỬ NẠP THẺ</h2>
                <table className="table table-striped table-hover" id="table-transaction-history">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã Thẻ</th>
                            <th scope="col">Mệnh giá</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Ngày thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map((transaction, i) => {
                            return (
                                <tr key={transaction._id}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{transaction.code}</td>
                                    <td>{transaction.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{transaction.status ? "Thành Công" : "Lỗi"}</td>
                                    <td>{moment(transaction.createAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Transaction;