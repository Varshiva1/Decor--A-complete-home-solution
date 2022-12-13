import "./amountdetail.css";
import {Link} from "react-router-dom";
const AmountDetails = ({prices}) => {
    const { totalqty, price, discount } = prices;
    return (
        <>
             <div className="price_details">
             <div className="item">
                    <p>Quantity :</p>
                    <p>{totalqty}</p>
                </div>
                <div className="item">
                    <p>Bag Total :</p>
                    <p>Rs.{price}</p>
                </div>
                <div className="item">
                    <p>Bag Discount :</p>
                    <p className="green">Rs.-{discount}</p>
                </div>
                
                <div className="item">
                    <p>Order Total :</p>
                    <p>Rs.{price - discount}</p>
                </div>
                <div className="item">
                    <p>Delivery Charges :</p>
                    <p><span className="green">FREE</span></p>
                </div>
                {/* <div className="coupon">
                    <p>Coupon Discount :</p>
                    <p><a href="#">Apply Coupon</a></p>
                </div> */}
                <div className="total">
                    <p>Total :</p>
                    <p>Rs.{price - discount}</p>
                </div>
            </div>
            <div className="checkout">
            <Link to ="/checkout" className="btn btn-solid-primary btn-lg checkout_btn">Checkout</Link>
            </div>
        </>
    )
}
export { AmountDetails };