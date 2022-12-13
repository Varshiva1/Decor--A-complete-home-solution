import "./Empty.css";
import { useNavigate } from "react-router-dom";
export const EmptyPage = ({ path }) => {
    let message = "";
    let image="";
    let navigate = useNavigate();
    switch (path) {
        case "/products":
            {
                message = "Product list is empty.Add products !!",
                image="../Assets/empty_shopping.png"
            }
            break;
        case "/cart":
            {
                message = "Your cart is empty !!",
                image="../Assets/cart_empty.png"
            }
            break;
        case "/wishlist":
            {
                message = "No item in wishlist !!",
                image="../Assets/empty_shopping.png"
            }
    }

    return (
        <div className="empty-page">
            <div className="empty-img">
                <img src={image} className="img-responsive" />
            </div>
            <div className="empty-text flex-col">
                <span >{message}</span>
                {
                    path !== "/products" && <button className=" btn btn-solid-primary btn-sm btn-rounded-5 flex-display" onClick={() => navigate("/products")}>Shop now</button>
                }

            </div>
        </div>
    )
}