import { useStateContext } from "../../../context/stateContext";
import "./Filter.css";
import { rating } from "../../../utils/data";
import { FILTER_BY_CATEGORY, SORT_BY_PRICE, FILTER_BY_RATING, PRICE_RANGE, CLEAR_ALL } from "../../../utils/constants";
const Filter = () => {
    const { state, dispatch } = useStateContext();


    return (
        <div>
            <div className="input-group">
                <div className="filter-heading"><p className='label'>Category</p> <p className='clear-btn'
                    onClick={() => dispatch({ type: CLEAR_ALL })}>Clear All</p></div>
                <form className="category_filterbox">
                    {state.categories.map((category) => (
                        <label key={category._id} className="filter-block">
                            <input  type="checkbox" value={category.categoryName.toLowerCase()}
                                onChange={(e) => dispatch({
                                                       type: FILTER_BY_CATEGORY, payload: {
                                        isChecked: e.target.checked,
                                        value: e.target.value
                                    }
                                })} name={category.categoryName.toLowerCase()}
                                checked={state.filters.productCategory.includes(category.categoryName.toLowerCase())}

                            /> {category.categoryName}
                        </label>
                    ))}
                </form>

            </div>

            <div className="input-group">
                <p className='label'>Price</p>
                <form className="price-sort">
                    <label className="filter-block">
                        <input checked={state.filters.sortByPrice==="LOW_TO_HIGH"} type="radio" name="name"
                            onChange={() => dispatch({ type: SORT_BY_PRICE, payload: "LOW_TO_HIGH" })} /> Low to High
                    </label>
                    <label className="filter-block">
                        <input checked={state.filters.sortByPrice==="HIGH_TO_LOW"} type="radio" name="name"
                            onChange={() => dispatch({ type: SORT_BY_PRICE, payload: "HIGH_TO_LOW" })} /> High to Low
                    </label>
                </form>
            </div>
            <div className="input-group">
                <p className='label'>Price Range</p>

                <input className="slider-input"
                    value={state.filters.priceRange}
                    onChange={(e) => dispatch({ type: PRICE_RANGE, payload: e.target.value })}
                    type="range"
                    min="1000"
                    max="5000"
                    list="marks"
                    step="200" />
                <datalist id="marks"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "1rem"
                    }}
                >
                    <option value="1000" label="1000"></option>
                    <option value="2000" label="2000"></option>
                    <option value="3000" label="3000"></option>
                    <option value="4000" label="4000"></option>
                    <option value="5000" label="5000"></option>
                </datalist>

            </div>
            <div className="input-group">
                <p className='label'>Rating</p>
                <div className="toogle-list">
                    {rating.map(({ id,ratinglabel, value }) => (
                        <>
                            <input checked={Number(state.filters.filterByRating)===Number(value)} className="input-rating" type="radio" name="rating" id={ratinglabel}
                                value={value} key={id}
                                onChange={(e) => dispatch({ type: FILTER_BY_RATING, payload: e.target.value })} />
                            <label className="rating-label" htmlFor={ratinglabel}>
                                <span>{ratinglabel}</span>
                            </label>
                        </>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}
export { Filter };