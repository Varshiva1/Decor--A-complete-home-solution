import "./Cart.css";
import { AmountDetails } from "./AmountDetails/AmountDetails";
import { CartItem } from "./CartItem/CartItem";
import { useLocation } from "react-router-dom";
import { EmptyPage } from "../index";
import { RouteSection } from "../../components";
import { priceDetails } from "../../utils/helper";
import { useStateContext } from "../../context/stateContext";

const Cart = () => {
    const { state: { productInCart } } = useStateContext();
    let location = useLocation();
    const { totalqty, price, discount } = priceDetails(productInCart);
    const prices={ totalqty, price, discount };
    return (
        <>
            <RouteSection path={"Cart"} />
            {productInCart.length > 0 ?
                <>
                    <section className="cart-wrapper">
                        <article className="wrapper-content">
                            <div className="header_title">
                                <div className="cart-title">
                                    MY SHOPPING CART :
                                </div>
                                <div className="amount">
                                    <b>({productInCart.length}) ITEMS</b>
                                </div>

                            </div>
                            {productInCart.map((item)=>(
                    <CartItem key={item._id} product={item}/>
                ))}
                        </article>
                        <article className="wrapper-amount">
                        <div className="header_title">
                                <div className="cart-title">
                                TOTAL PRICE DETAILS:
                                </div>
                                <div className="amount">
                                <b>Rs.{price - discount}</b> 
                                </div>
                            </div>
                            <AmountDetails prices={prices}/>
                        </article>
                    </section>
                </>

                :
                <EmptyPage path={location.pathname} />
            }
        </>
    )
}

export { Cart };