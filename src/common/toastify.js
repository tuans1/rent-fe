
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Error(params) {
    toast.error(<div style={{ display: "flex", alignItems: "center" }}><i className="fa fa-times" style={{ fontSize: 25 }}></i> <span style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>{params.message}</span></div>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export function Warn(params) {
    toast.warn(<div style={{ display: "flex", alignItems: "center" }}><i className="fa fa-exclamation" style={{ fontSize: 25 }}></i> <span style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>{params.message}</span></div>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
export function Success(params) {
    toast.success(<div style={{ display: "flex", alignItems: "center" }}><i className="fa fa-check" style={{ fontSize: 25 }}></i> <span style={{ paddingLeft: 10, fontWeight: "bold", fontSize: 15 }}>{params.message}</span></div>, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}
