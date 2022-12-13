import { categoryUrl, LOAD_CATEGORY, productUrl,addressUrl,ERROR, LOAD_PRODUCTS, signinUrl, signupUrl, wishlistUrl, TOKEN, UPDATE_QTY, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, cartUrl, ADD_TO_CART, REMOVE_FROM_CART, INC_QTY,ADDRESS} from "../utils/constants";
import axios from "axios";
import { authActions } from "./actions";
import toast from "react-hot-toast";

export const getCategoryFromServer = async (dispatch) => {

    try {
        const response = await axios.get(categoryUrl);
        if (response.status === 200) {
            dispatch({ type: LOAD_CATEGORY, payload: response.data.categories });
        }
    } catch (error) {
        console.log(error);
    }
}
export const getProductFromServer = async (dispatch) => {

    try {
        const response = await axios.get(productUrl);
        if (response.status === 200) {
            dispatch({ type: LOAD_PRODUCTS, payload: response.data.products });
        }
    } catch (error) {
        console.log(error);
    }
}
export const addToWishlist = async (token, dispatch, product) => {
    const toastId=toast.loading("adding product to wishlist...");
    try {
        const response = await axios.post(wishlistUrl, {
            product,
        }, {
            headers: {
                authorization: token
            }
        }
        );
        if (response.status === 200 || response.status === 201) {
            toast.success("Item added to wishlist!", {
                id: toastId,
              });

            dispatch({ type: ADD_TO_WISHLIST, payload: response.data.wishlist });
        }
    } catch (error) {
        toast.error("Some error occured :( .Try again!",{
            id:toastId,
        });
        dispatch({ type: ERROR, payload: error.response });
    }
}
export const removefromwishlist = async (id, dispatch, token) => {
    const toastId=toast.loading("Deleting item from wishlist");
    try {
        const response = await axios.delete(`api/user/wishlist/${id}`, {
            headers: {
                authorization: token,
            },
        });
        if (response.status === 200 || response.status === 201) {
            toast.success("Item deleted from wishlist",{
                id:toastId
            });
            dispatch({ type: REMOVE_FROM_WISHLIST, payload: response.data.wishlist });
        }
    } catch (error) {
        toast.error("Some error occured :( .Try again!",{
            id:toastId,
        });
        dispatch({ type: ERROR, payload: error.response });
    }
}

export const addToCart = async (token, dispatch, product) => {
    const toastId=toast.loading("adding product to cart...")
    try {
        const response = await axios.post(cartUrl, {
            product
        }, {
            headers: {
                authorization: token
            }
        });
        if (response.status === 200 || response.status === 201) {
            toast.success("Item added to cart !",{
                id:toastId
            })
            dispatch({ type: ADD_TO_CART, payload: response.data.cart });
        }
    }
    catch (error) {
        toast.error("Some error occured :( .Try again!",{
            id:toastId,
        });
        dispatch({ type: ERROR, payload: error.response });
    }
}

export const removeFromCart = async (token, dispatch, id) => {
    try {
        const response = await axios.delete(`api/user/cart/${id}`, {
            headers: {
                authorization: token
            }
        });
        if (response.status === 200 || response.status == 201) {
            dispatch({ type: REMOVE_FROM_CART, payload: response.data.cart })
        }
    }
    catch (error) {
        toast.error("Some error occured :( .Try again!");
        dispatch({ type: ERROR, payload: error.response });
    }
}

export const updateQty = async (token, dispatch, id, actionType) => {
    const toastId = toast.loading("Updating quantity...");
    try {
        const response = await axios.post(`api/user/cart/${id}`, {
            action: {
                type: actionType === INC_QTY ? "increment" : "decrement",
            },
        }, {
            headers: {
                authorization: token
            }
        });
        if (response.status === 200 || response.status === 201) {
            toast.success("Quantity updated.", {
                id: toastId,
              });
            dispatch({ type: UPDATE_QTY, payload: response.data.cart })
        }
    } catch (error) {
        toast.error("Some error occured :( .Try again!",{
            id:toastId,
        });
        dispatch({ type: ERROR, payload: error.response });
    }
}

export const signupOnServer = async (userDetails, authDispatch, navigate) => {
    const toastId = toast.loading("Creating your account...");
    try {
        const response = await axios.post(signupUrl,
            {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                password: userDetails.password
            });
        if (response.status === 201) {
            toast.success("Account created successfully!", {
                id: toastId,
              });
            localStorage.setItem("sessiontoken", response.data.encodedToken)
            authDispatch({ type: authActions.AUTH, payload: { user: response.data.createdUser, token: response.data.encodedToken } })
            setTimeout(()=> {
                navigate("/");
              }, 1000);
        }

    } catch (error) {
        toast.error("Some error occured in signup. Try Again.", {
            id: toastId,
          });
          authDispatch({ type:authActions.AUTHERROR, payload: error.response });
    }
}
export const loginToServer = async (userDetails, authDispatch, navigate) => {
    const toastId = toast.loading("Logging in...");
    try {
        const {data:{foundUser,encodedToken},status} = await axios.post(signinUrl,
            {
                email: userDetails.email,
                password: userDetails.password
            });
        if (status === 200) {
            toast.success(`Hello, ${foundUser.firstName}. Welcome back!`, {
                id: toastId,
                icon: "👋",
              });
            localStorage.setItem("sessiontoken",encodedToken)
            authDispatch({ type: authActions.AUTH, payload: { user:foundUser, token:encodedToken } })
           
            setTimeout(()=> {
                 navigate(-1);
               }, 1000);
            
        }
    } catch (error) {
        toast.error("Some error occured in login. Try Again.", {
            id: toastId,
          });
          authDispatch({ type:authActions.AUTHERROR, payload: error.response });
    }
}

export const addAddress = async (token, dispatch, address) => {
    try {
        const response = await axios.post(addressUrl, {
            address
        }, {
            headers: {
                authorization: token
            }
        }
        );
        if (response.status === 200 || response.status === 201) {
            toast.success("Address added successfully..");

            dispatch({ type:ADDRESS, payload: response.data.address });
        }
    } catch (error) {
        toast.error("Some error occured :( .Try again!");
        console.log("error in adding address ")
        dispatch({ type: ERROR, payload: error.response });
    }
}

export const getAddress = async (token, dispatch) => {
    try {
        const response = await axios.get(addressUrl, {
            headers: {
                authorization: token
            }
        }
        );
        if (response.status === 200 || response.status === 201) {
            dispatch({ type:ADDRESS, payload: response.data.address });
        }
    } catch (error) {
        console.log(error);
        toast.error("Some error occured :( .Try again!");
        console.log("error in getting address ")
        dispatch({ type: ERROR, payload: error.response });
    }
}