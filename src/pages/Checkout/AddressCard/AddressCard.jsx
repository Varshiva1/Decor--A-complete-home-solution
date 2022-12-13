import "./AddressCard.css";
export const AddressCard = ({ addressDetail,setDeliveryAddress}) => {
    const addOrderAddress=()=>{
        setDeliveryAddress(addressDetail);
    }
    return (
        <div className="radio-item">
            <input type="radio" name="radio" id={addressDetail._id} onClick={addOrderAddress} />
            <label for={addressDetail._id}>
                <p>{addressDetail.name} <span>{addressDetail.addresstype}</span> </p>
                <p>{addressDetail.address} </p>
                <p>{addressDetail.mobile}</p>
            </label>

        </div>
    )
}