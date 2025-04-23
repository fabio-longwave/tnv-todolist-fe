import styles from './Modal.module.scss';
import {FaTimes} from "react-icons/fa";

const Modal = ({isOpen, children, onClose, header}) => {
    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-container']} onClick={(e) => e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <h2>{header}</h2>
                    <button className={styles['modal-close-button']} onClick={onClose}><FaTimes/></button>
                </div>
                <div className={styles['modal-content']}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;