import React, { useReducer, useState } from 'react';
import { DateRangeInput } from '@datepicker-react/styled'
import { ThemeProvider } from "styled-components";
import Nav from '../../containers/Admin/nav';

const initialState = {
    startDate: new Date,
    endDate: new Date,
    focusedInput: null,
}

function reducer(state, action) {
    switch (action.type) {
        case 'focusChange':
            return { ...state, focusedInput: action.payload }
        case 'dateChange':
            return action.payload
        default:
            throw new Error()
    }
}

export default function TotalTransaction() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [value, onChange] = useState([new Date(), new Date()]);
    return (
        <>
            <Nav />
            <div className="container">
                <h3 style={{ color: "black",margin : "15px 0" }}>TỔNG HỢP GIAO DỊCH</h3>
                <div className="d-flex">
                    <ThemeProvider
                        theme={{
                            breakpoints: ["32em", "48em", "64em"],
                            reactDatepicker: {
                                daySize: [31.5],
                                fontFamily: "system-ui, -apple-system",
                                colors: {
                                    accessibility: "#D80249",
                                    selectedDay: "#f7518b",
                                    selectedDayHover: "#F75D95",
                                    primaryColor: "#d8366f"
                                }
                            }
                        }}
                    ></ThemeProvider>
                    <DateRangeInput
                        onDatesChange={data => dispatch({ type: 'dateChange', payload: data })}
                        onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
                        startDate={state.startDate} // Date or null
                        endDate={state.endDate} // Date or null
                        focusedInput={state.focusedInput} // START_DATE, END_DATE or null
                    />
                    <button style={{marginLeft : "20px",}} className="btn btn-info">TÌM</button>
                </div>
                <table className="table table-striped table-hover" style={{margin : "15px 0"}}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">User</th>
                            <th scope="col">Mã thẻ</th>
                            <th scope="col">Mệnh giá</th>
                            <th scope="col">Ngày Giao dịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <th scope="row">1</th>
                            <td>96816</td>
                            <td>5289951861000</td>
                            <td>20.000 VNĐ</td>
                            <td>23:10 26/06/2021</td>
                        </tr>
                        <tr >
                            <th scope="row">2</th>
                            <td>52135</td>
                            <td>5289951861000</td>
                            <td>50.000 VNĐ</td>
                            <td>15:50 26/06/2021</td>
                        </tr>
                        <tr >
                            <th scope="row">3</th>
                            <td>26378</td>
                            <td>7583435555126</td>
                            <td>10.000 VNĐ</td>
                            <td>05:18 26/06/2021</td>
                        </tr>
                        <tr >
                            <th scope="row">4</th>
                            <td>62636</td>
                            <td>1264858337300</td>
                            <td>20.000 VNĐ</td>
                            <td>18:26 25/06/2021</td>
                        </tr>
                        <tr >
                            <th scope="row">5</th>
                            <td>93948</td>
                            <td>0915215912581</td>
                            <td>20.000 VNĐ</td>
                            <td>14:28 24/06/2021</td>
                        </tr>
                        <tr >
                            <th scope="row">6</th>
                            <td>02526</td>
                            <td>6266687090901</td>
                            <td>20.000 VNĐ</td>
                            <td>09:08 24/06/2021</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}