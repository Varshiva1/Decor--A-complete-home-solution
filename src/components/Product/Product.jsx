import { useAuth } from "../../context/authContext";
import { useStateContext } from "../../context/stateContext";
import "./Product.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";
import { addToWishlist, removefromwishlist, addToCart, removeFromCart } from "../../utils/getDataFromServer";
import { isInList } from "../../utils/helper";
const Product = ({ product }) => {
    const {
        _id: id,
        title,
        price,
        offprice,
        image,
        rating,
        tag,

    } = product;
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { authState: { token } } = useAuth();
    const { state: { wishlist, productInCart }, dispatch } = useStateContext();

    const discount = Math.round(((product.price - product.offprice) / product.price) * 100)

    const isInWishlist = isInList(wishlist, id);
    const isInCart = isInList(productInCart, id);
    const wishlistHandler = () => {
        token
            ? isInWishlist
                ? removefromwishlist(id, dispatch, token)
                : addToWishlist(token, dispatch, product)
            : navigate("/signin");
    }

    const CartHandler = () => {
        token ? isInCart
            ? navigate("/cart")
            : addToCart(token, dispatch, product,setLoading)
            : navigate("/signin")
    }
    return (
        <>
            <div className="product-box">
                <div className="image">
                    <img src={image} alt={title} className="img-responsive"/>
                </div>
                <span className="card-rating">{rating}★ | 5</span>
                {tag?<span className="card-tag">Bestseller</span>:""}
                
                <div className="product-desc">
                    <span className="product-heading"><strong>{title}</strong><a onClick={() => wishlistHandler()}>
                        {
                            isInWishlist ? <i className={`wishlist-toogle fas fa-heart`}></i> : <i className="far fa-heart"></i>
                        }
                    </a></span>
                    <div className="price">
                            <div className="current_price">&#x20B9; {offprice} </div>
                            <div className="normal_price">&#8377; {price}</div>
                            <div className="discount">{discount}% OFF</div>
                        </div>
                </div>
                <div className="product-btn-container">
                    {
                        isInCart?<button className="btn btn-outline-primary btn-lg flex-display" onClick={() => CartHandler()}>Go to Cart  <AiOutlineShopping className="add-btn-icon" /></button>:<button className="btn btn-solid-primary btn-lg flex-display" onClick={() => CartHandler()}>Add to Cart  <AiOutlineShopping className="add-btn-icon" /></button>
                    }
                </div>
            </div>
        </>
    )
}
export { Product };