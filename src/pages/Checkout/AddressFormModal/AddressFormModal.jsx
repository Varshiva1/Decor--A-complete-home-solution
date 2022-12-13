import "./AddressFormModal.css";
import { Modal } from "../../../components/index";
import { useAuth } from "../../../context/authContext";
import { useState } from "react";
import { useStateContext } from "../../../context/stateContext";
import { addAddress } from "../../../utils/getDataFromServer";
export const AddressFormModal = ({ isOpen, onClose }) => {
    const { dispatch } = useStateContext();
    const { authState: { token } } = useAuth();
    const [addressDetail, setAddressDetail] = useState({
        name: "",
        address: "",
        addresstype: "Home",
        mobile: "",
    })
    const addressChangeHandler = (e) => {
        setAddressDetail({ ...addressDetail, [e.target.name]: e.target.value })
    }
    const addAddressHandler = () => {
        addAddress(token, dispatch, addressDetail)
        setAddressDetail("");
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <div className="address-form-container">
                <h2 className="delivery-title">Delivery Details</h2>
                <form className="address-form" onSubmit={e => e.preventDefault()}>
                    <label>Name</label>
                    <input type="text" name="name" value={addressDetail.name} onChange={addressChangeHandler} />
                    <label>Delivery Address</label>
                    <textarea type="text" row="3" name="address" value={addressDetail.address} onChange={addressChangeHandler} />
                    <label>Phone Number</label>
                    <input type="number" name="mobile" value={addressDetail.mobile} onChange={addressChangeHandler} />
                    <label for="addresstype">Choose AddressType:</label>
                    <select name="addresstype" onChange={addressChangeHandler} value={addressDetail.addresstype}>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                    </select>
                    <button className="add-address-btn" onClick={addAddressHandler}>
                        Add
                    </button>
                </form>
            </div>
        </Modal>
    )
}