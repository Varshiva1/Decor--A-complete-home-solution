import { useState,useEffect } from "react";
import "./CartItem.css";
import { INC_QTY, DEC_QTY } from "../../../utils/constants";
import {updateQty,removeFromCart,addToWishlist} from "../../../utils/getDataFromServer";
import { useAuth } from "../../../context/authContext";
import { useStateContext } from "../../../context/stateContext";
import { isInList } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";


const CartItem = ({ product }) => {
    const { authState: { token } } = useAuth();
    const {dispatch,state:{wishlist} } = useStateContext(); 
    const discount = Math.round(((product.price - product.offprice) / product.price) * 100)
   
    let navigate = useNavigate();

    const isInWishlist=isInList(wishlist,product._id);

    const updateCartHandler=(type)=>{
        updateQty(token,dispatch,product._id,type);
    }

    const removeCartHandler=()=>{

      removeFromCart(token,dispatch,product._id);

    }

    const moveWishlistHandler=()=>{
        addToWishlist(token,dispatch,product);
        removeFromCart(token,dispatch,product._id);
    }

    return (
        <>
            <div className="cartitem_wrap">
                <div className="product_info">
                    <div className="product_img">
                        <img src={product.image} alt="ProductImage" width="170px" height="170px"/>
                    </div>
                    <div className="product_data">
                        <div className="description">
                            <div className="product_title">
                            {product.title}
                            </div>
                        </div>
                        <div className="quantity">
                            <button className="btn-qty" id="decrease" onClick={()=>product.qty>1 && updateCartHandler(DEC_QTY)}
                            disabled={product.qty>1?false:true} >-</button>
                            <input type="number" id="number" value={product.qty} />
                            <button className="btn-qty" id="increase" onClick={()=>updateCartHandler(INC_QTY)} >+</button>
                        </div>
                        <div className="price">
                            <div className="current_price">&#x20B9; {product.offprice}</div>
                            <div className="normal_price">&#8377; {product.price}</div>
                            <div className="discount">{discount}% OFF</div>
                        </div>
                    </div>
                </div>
                <div className="product_btns">
                    <div className="remove" onClick={() => removeCartHandler()}>REMOVE</div>
                    <div className="whishlist" onClick={() => isInWishlist?navigate("/wishlist"):moveWishlistHandler()}>{isInWishlist?"IN WHISHLIST":"MOVE TO WHISHLIST"}</div>
                </div>
                
            </div>
        </>
       
    )
}
export { CartItem };