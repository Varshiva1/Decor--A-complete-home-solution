import "./Empty.css";
import { useNavigate } from "react-router-dom";
export const ErrorPage=()=>{
    let navigate=useNavigate();
    return(
    <>
    <div className="error-page flex-col">
            <div className="error-img">
                <img src="../Assets/pagenotfound.png" />
            </div>
            <div className="error-text">
                <span >Oops! 404 page not found</span> 
                </div>   
            <button className="btn-lg btn-rounded-2r flex-display top-gutter-lg" onClick={() => navigate("/")}>Go to Home</button>
            
        </div>
    </>
    )
}