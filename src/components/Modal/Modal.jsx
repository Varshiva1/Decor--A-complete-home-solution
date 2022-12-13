import "./Modal.css";
import reactDom from "react-dom";
import { MdOutlineClose } from "react-icons/md";
export const Modal=({ isOpen, onClose, children })=>{
    if (!isOpen) return null;
    return reactDom.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <MdOutlineClose size={30} className="close-btn" onClick={onClose} />
            </div>
        </div>, document.getElementById("modal-wrapper")
    )
}