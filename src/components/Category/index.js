import { React } from 'react';
import { Button } from 'react-bootstrap';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../reducers/accountReducer';

function Category() {
    const dispatch = useDispatch();
    const { searchGame } = useSelector(state => state.accountReducer)
    const onSearch = (game) => {
        dispatch(action.onResetAccountList())
        dispatch(action.onFetchSearchAccount(game))
    }
    return (
        <div className="category-wrap">
            <div className="category-left">
                <div className="category-link" onClick={() => searchGame !== "" ? onSearch({ game: "" }) : ""}>
                    <Button>TẤT CẢ</Button>
                </div>
                <div className="category-link" onClick={() => onSearch({ game: "GTA" })}>
                    <Button>GTA V</Button>
                </div>
                <div className="category-link" onClick={() => onSearch({ game: "PUBG" })}>
                    <Button>PUBG</Button>
                </div>
            </div>
            <div className="category-right">
                <div className="category-link" onClick={() => onSearch({ active: true })}>
                    <Button>SẴN SÀNG</Button>
                </div><div className="category-link" onClick={() => onSearch({ active: false })}>
                    <Button>ĐANG ĐƯỢC THUÊ</Button>
                </div>
            </div>
        </div>
    )
}

export default Category;