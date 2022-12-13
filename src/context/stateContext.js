import { createContext, useContext, useEffect, useReducer } from "react";
import { stateReducer } from "../reducers/stateReducer";
import { getCategoryFromServer, getProductFromServer } from "../utils/getDataFromServer";
const StateContext = createContext({});

const StateProvider = ({ children }) => {
    const initialState = {
        categories: [],
        products: [],
        wishlist:[],
        productInCart:[],
        address:[],
        isLoading: false,
        setError: "",
        filters: {
            searchProduct: "",
            sortByPrice: "",
            filterByRating: "",
            priceRange: "",
            productCategory: [],
        },
        orderDetails:{},
    }
    const [state, dispatch] = useReducer(stateReducer, initialState);
    useEffect(() => {
        getCategoryFromServer(dispatch);
        getProductFromServer(dispatch);
    }, []);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};
const useStateContext = () => useContext(StateContext);

export { StateProvider, useStateContext };