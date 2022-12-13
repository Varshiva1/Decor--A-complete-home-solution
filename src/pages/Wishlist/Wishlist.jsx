import { Product } from "../../components/index";
import { useStateContext } from "../../context/stateContext";
import { useLocation } from "react-router-dom";
import { EmptyPage } from "../Error/EmptyPage";
import "./Wishlist.css";
import { RouteSection } from "../../components/index";
const Wishlist = () => {
    const { state: { wishlist }, } = useStateContext();
    const location = useLocation();

    return (
        <>
          <RouteSection path={"Wishlist"}/>
            {wishlist.length > 0 ?

                <> 
                    <section className="products section" id="products">
                        <div className="products-grid top-gutter-sm">
                            {wishlist.map((item) => (
                                <Product key={item._id} product={item} />
                            ))}
                        </div>
                    </section>
                </>
                :
                <EmptyPage path={location.pathname}/>
            }
        </>

    )
}

export { Wishlist };