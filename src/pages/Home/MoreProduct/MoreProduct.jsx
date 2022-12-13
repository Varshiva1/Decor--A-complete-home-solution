import React from 'react'
import "./moreProduct.css";
import {Link} from "react-router-dom";
export const MoreProduct = () => {
  return (
    <section className='more-section'>
        <img src="https://res.cloudinary.com/dgomw715r/image/upload/v1655129016/ProjectImages/bannerecomm3_vansjc.jpg" className='img-responsive'>
        </img>
        <div className='more-section-btn'>
            <h2>More Ideas to Decorate your Space</h2>
        <Link to="/products" className="btn btn-solid-primary btn-lg btn-rounded-5 block-btn">shop More</Link>
        </div>
        </section>
  )
}
