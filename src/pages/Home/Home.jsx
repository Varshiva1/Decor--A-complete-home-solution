import "./Home.css";
import {Product} from "../../components/index";
import {Hero} from "./HeroSection/Hero";
import {CategoryList} from "./CategoryList/CategoryList";
import { useStateContext } from "../../context/stateContext";
import {Delivery} from "./DeliveryOption/Delivery";
import { MoreProduct } from "./MoreProduct/MoreProduct";

const Home = () => {
    const {state}=useStateContext();
    const {products}=state;
    return (
        <div className="Home">
          
            <Hero/>
            <section className="section main-wrapper">
            <Delivery/>
            <CategoryList/>
            </section>
            <MoreProduct/>
            <section className="products section" id="products">
                <h1 className="heading-1 center-text"> Best Selling</h1>
                <div className="products-grid top-gutter-lg">
                    {products.filter((product)=>product.tag==="bestseller").map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </section>
           
            
        </div>
    );
};

export { Home };