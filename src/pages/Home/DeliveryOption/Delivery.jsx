import React from 'react'
import "./delivery.css";
export const Delivery = () => {
  return (
    <section className='display-section'>
         <article>
             <div className='option-image'>
             <img src="../Assets/freedelivery.png" className='img-responsive'></img>
             </div>
          <h1>Free Shipping</h1>
         </article>
         <article>
         <div className='option-image'>
             <img src="../Assets/gift-card.png" className='img-responsive'></img>
             </div>
          <h1>Gift Card</h1>
         </article>
         <article>
         <div className='option-image'>
             <img src="../Assets/return1.png" className='img-responsive'></img>
             </div>
          <h1>30 days return</h1>
         </article>
         <article>
         <div className='option-image'>
             <img src="../Assets/contactus.png" className='img-responsive'></img>
             </div>
          <h1>Contact us</h1>
         </article>
        </section>
  )
}
