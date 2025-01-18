const DialogBox = ({ message, onClose, onCancel, onDelete }) => {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <button className="dialog-close-button" onClick={onClose}>✖</button>
                <p className="dialog-message">Are you sure you want to delete?</p>
                <div className="dialog-buttons">
                    <button className="dialog-cancel-button" onClick={onCancel}>Cancel</button>
                    <button className="dialog-delete-button" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DialogBox;