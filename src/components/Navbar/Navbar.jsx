import { useState } from "react";
import { authActions } from "../../utils/actions";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SEARCH_PRODUCT } from "../../utils/constants";
import { useStateContext } from "../../context/stateContext";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
const Navbar = () => {
    let navigate = useNavigate();
    const [searchActive, setSearchActive] = useState(false);
    const location = useLocation();
    const { state, dispatch } = useStateContext();
    const { authState: { token }, authDispatch } = useAuth();

    const logoutHandler = () => {
        localStorage.removeItem("sessiontoken")
        const toastId = toast.loading("Logging out...");
        toast.success("You're logged out successfully", {
            id: toastId,
        });
        authDispatch({ type: authActions.LOGOUT })
        navigate("/");

    }
   return (
       <header>
           <div className="left-area">
           <div className="logo">
               <img src="https://res.cloudinary.com/dgomw715r/image/upload/v1655122821/ProjectImages/ecomm2_r6nyji.png" className="img-responsive">

               </img>
            </div>
           </div>
              <div className="nav-icons">
                          {location.pathname === '/products' && <div className="fas fa-search" id="search-btn" onClick={() => setSearchActive(prevCheck => !prevCheck)}></div>}
                        <Link to={token ? "/cart" : "/signin"}>
                    <span className="badge-container icon-col">
                        <div className="fas fa-shopping-cart" id="cart-btn"></div>
                         <span className="badge icon-badge">{state.productInCart.length}</span>
                    </span>
               </Link>
               <Link to={token ? "/wishlist" : "/signin"}>
                    <span className="badge-container icon-col">
                        <div className="fas fa-heart" id="wishlist-btn"></div>
                       <span className="badge icon-badge">{state.wishlist.length}</span>
                     </span>
               </Link>
               {token?<div className="fas fa-sign-out-alt" id="profile-btn" onClick={logoutHandler}></div>:<div className="fas fa-user" id="profile-btn" onClick={()=>navigate("/signin")}></div>}
             <form action="" className={`search-form ${searchActive && 'active'}`}>
                <input type="search" id="search-box" placeholder="search here..."
                    value={state.searchProduct} onChange={(e) => dispatch({ type: SEARCH_PRODUCT, payload: e.target.value })} />
                <label htmlFor="search-box" className="fas fa-search"></label>
            </form>
             </div>
       </header>
    );
};

export { Navbar };