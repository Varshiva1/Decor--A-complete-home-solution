import "./Category.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/stateContext";
import { FILTER_BY_CATEGORY} from "../../utils/constants";
const Category = ({ category }) => {
    const {dispatch}=useStateContext();
    return (
        <>
            <div className="features">

               
                <Link to="/products">
                    <figure key={category.categoryName}
                    onClick={()=>dispatch({
                        type: FILTER_BY_CATEGORY, payload: {
                            isChecked: true,
                            value: category.categoryName.toLowerCase()
                        }
                    })}>
                    <img src={category.image} alt={category.categoryName} />
                    <div className="feature__content">
                    </div>
                    <div className="category-name">
                    <h3 >{category.categoryName}</h3>
                     <p>Collections</p>
                    </div>
                   
                    </figure>
                   
                </Link>
            </div>
        </>
    );
};

export { Category };