import React from 'react';
import Confetti from 'react-confetti';
import { RouteSection } from "../../components";
import { useWindowSize } from '../../hooks/useWindowSize';
import { useStateContext } from "../../context/stateContext";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./orderDetails.css";
export const OrderDetails = () => {
    const navigate=useNavigate();
    const { width, height } = useWindowSize();
    const { state: { orderDetails:{order},productInCart } } = useStateContext();

    useEffect(() => {
        if (productInCart.length === 0) navigate('/products');
      }, []);
    return (
        <section>
            <RouteSection path={"Orders"} />
            <Confetti
                width={width}
                height={height}
            />
                <article className='order-details'>
                    <h2>Congratulations your order is placed successfully !!</h2>
                    <div className='order-delivery-detail top-gutter-md'>
                        <span><strong> OrderId:</strong> {order?.id}</span>
                        <span><strong>DeliveryAddress:</strong> {order?.orderAddress?.name?.concat(" ",order?.orderAddress?.address)}</span>
                        <span><strong>Amount to Pay:</strong> Rs.{order?.totalAmount}</span>
                    </div>
                    {order?.orderItem.map((product) => (
                        <article className='order-item-details top-gutter-md'>
                            <div className="product_info">
                                <div className="product_img">
                                    <img src={product.image} alt="ProductImage" width="170px" height="170px" />
                                </div>
                                <div className="product_data">
                                    <div className="description">
                                        <div className="product_title">
                                            {product.title}
                                        </div>
                                    </div>
                                    <span>qty:{product.qty}</span>
                                </div>
                            </div>
                        </article>
                    ))}

                </article>

        </section>
    )
}
