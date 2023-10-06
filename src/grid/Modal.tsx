interface ModalProps {
    show: boolean;
    handleClose: any;
}

const Modal: React.FC<ModalProps> = ({show, handleClose}) => {
    const showHideClassName = show ? "modal modal-show" : "modal modal-hide";
   

    return (
        <div id="modal" className={showHideClassName}>
        <div className="modal-content">
            <span id="closeModalBtn" className="close" onClick={() => handleClose}>&times;</span>
            <h2>Bingo</h2>
            <p>Hyvää onnea jos ei oma riitä!</p>
        </div>
    </div>
      );
};

export default Modal;