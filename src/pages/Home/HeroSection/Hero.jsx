import "./Hero.css";
import { Link } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
const Hero = () => {
    const properties = {
        duration: 1500,
        transitionDuration: 1000,
        easing: "ease",
    };
    const fadeImages = ["https://res.cloudinary.com/dgomw715r/image/upload/v1655125857/ProjectImages/bannerecomm_e5tjta.jpg","https://res.cloudinary.com/dgomw715r/image/upload/v1655129016/ProjectImages/bannerecomm2_gjek4s.jpg"
    ,"https://res.cloudinary.com/dgomw715r/image/upload/v1655129110/ProjectImages/bannerecomm4_wz4wup.jpg"];
    return (
        <section className="hero__section">
            <Fade {...properties}>
                {fadeImages.map((fadeImage, index) => (
                    <div className="hero__section" key={index}>
                        <img src={fadeImage} className="img-responsive" />
                    </div>
                ))}
            </Fade>
            <article className="hero-content">
               <h1 className="hero-title">Home Decor Collections</h1>
               <p className="hero-sub-title">Browse our shop and decorate your house at affordable prices</p>
               <Link to="/products" className="btn btn-solid-primary btn-lg btn-rounded-5 block-btn">shop now</Link>
            </article>
        </section>
    );
};

export { Hero };