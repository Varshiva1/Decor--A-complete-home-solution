import {Navigate,useLocation} from "react-router-dom";
import {useAuth} from "../context/authContext";
export const ProtectedRoutes=({children})=>{
    const {authState:{token}}=useAuth();
    const location=useLocation();
    return token?(
        children
    ):(
        <Navigate to="/login" state={{ from: location }} replace />
    )
}