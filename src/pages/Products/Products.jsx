import "./Products.css";
import {Filter} from "./Filter/Filter";
import { ProductList} from "./ProductList/ProductList";
import { useState } from "react";
import { RouteSection } from "../../components";
const Products=()=>{
const [active,setActive]=useState(false);
    return(
        <div className="product_page" >
        <RouteSection path={"Products"}/>
        <div className="filter__list__wrap">
        <div className={`filter__wrap ${active && 'active'}`}>
           <Filter/> 

            </div>
            <div className="List__wrap">
            
            <ProductList setActive={setActive}/>

            </div>
        </div>
        </div>
        
    );
}
export {Products};