import { useState } from "react";
import { getAge } from "../utils/commonfunctions";
import DialogBox from "./DialogBox";

const CardComponent = ({ user, showItem, setShowIndex, deleteUser, editItem, setEditIndex, resetEditIndex, updateUser }) => {
    const [editableData, setEditableData] = useState({
        gender: user.gender,
        country: user.country,
        description: user.description,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateUser(user.id, editableData);
        resetEditIndex();
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const handleCancel = () => {
        closeDialog();
    };

    const handleDelete = () => {
        deleteUser();
        closeDialog();
    };

    return (
        <div className="user-card">
            <div className="user-card-header" onClick={() => { setShowIndex() }}>
                <div className="user-name-img">
                    <img alt="User" className="user-img" src={user.picture}></img>
                    <p>{user.first} {user.last}</p>
                </div>
                <span>{showItem ? "🔼" : "🔽"}</span>
            </div>
            {
                showItem &&
                <>
                    <div className="user-card-body">
                        <div className="user-card-body-details">
                            <div>
                                <p className="user-card-label">Age</p>
                                <p>{getAge(user.dob)}</p>
                            </div>
                            <div>
                                <p className="user-card-label">Gender</p>
                                {editItem ? (
                                    <select
                                        name="gender"
                                        value={editableData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                        <option value="Rather not say">Rather not say</option>
                                        <option value="Other">Other</option>
                                    </select>
                                ) : (
                                    <p>{user.gender}</p>
                                )}
                            </div>
                            <div>
                                <p className="user-card-label">Country</p>
                                {editItem ? (
                                    <input
                                        type="text"
                                        name="country"
                                        value={editableData.country}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p>{user.country}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="user-card-label">Description</p>
                            {editItem ? (
                                <textarea
                                    name="description"
                                    value={editableData.description}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="user-card-footer">
                        {
                            editItem ?
                                <>
                                    <p onClick={() => resetEditIndex()}>❌</p>
                                    <p onClick={handleSave}>✅</p>
                                </>
                                :
                                <>
                                    <p onClick={openDialog}>🗑️</p>
                                    <p onClick={() => setEditIndex()} className={`tooltip-parent ${getAge(user.dob) < 18 ? "disable-acton" : ""}`}>✏️</p>
                                    {/* { getAge(user.dob) < 18 && <p className="card-tooltip">Only Adult can edit</p> } */}
                                </>
                        }
                    </div>
                </>
            }

            {isDialogOpen && (
                <DialogBox
                    message="Are you sure you want to delete this item?"
                    onClose={closeDialog}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                />
            )}
        </div>
    )
}

export default CardComponent;
