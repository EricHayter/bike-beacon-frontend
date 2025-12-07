interface CreateStationModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onCreate: () => void;
}

function CreateStationModal({ isOpen, onCancel, onCreate }: CreateStationModalProps) {
    return (
        <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create New Bike Station</h3>
                <div className="modal-action">
                    <button onClick={onCancel} className="btn">Cancel</button>
                    <button onClick={onCreate} className="btn btn-primary">Create</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop" onClick={onCancel}>
                <button>close</button>
            </form>
        </dialog>
    );
}

export default CreateStationModal;
