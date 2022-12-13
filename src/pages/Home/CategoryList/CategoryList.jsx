import "./CategoryList.css";
import "../../../components/index";
import { Category } from "../../../components/index";
import { useStateContext } from "../../../context/stateContext";
const CategoryList = () => {

    const {state} = useStateContext();
    const {categories}=state;
   
    return (
        <section>
            <h1 className="heading-1 top-gutter-lg center-text bottom-gutter-lg"> Shop By Category</h1>
            <div className="features-container" id="features">
                {categories.map((item) => (
                    <Category key={item._id} category={item} />
                )
                )}
            </div>
        </section>
    );

};

export { CategoryList };