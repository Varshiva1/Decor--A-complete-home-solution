import "./ProductList.css";
import {Product} from "../../../components/index";
import { useStateContext } from "../../../context/stateContext";
import {getFilteredProducts} from "../../../utils/helper";
import { useLocation } from "react-router-dom";
import { EmptyPage } from "../../index";
const ProductList=({setActive})=>{
    const {state:{ products,filters},}=useStateContext();
    const filteredProducts=getFilteredProducts(products,filters);
    const location = useLocation();
    return(
        <>
        {filteredProducts.length>0?
        <>
        <div className="alert-container bottom-gutter-sm">
          <div className="left-side">
          <h3 className="">Showing All Products({filteredProducts.length})</h3>
          </div>
          <div className="right-side auto-margin">
          <div className="filter__responsive" onClick={()=>setActive(prevstate=> !prevstate)}>
            <span>Filter</span><i className="fas fa-filter"></i>
        </div>
          </div>
        </div>
         <div className="products-grid">
         
         {filteredProducts.map((item)=>(
            <Product key={item.id} product={item} />
         ))}
          
         </div>
         </>
         :
         <EmptyPage path={location.pathname}/>
        }
        </>
    )
}

export {ProductList};