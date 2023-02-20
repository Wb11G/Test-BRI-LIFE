import { useState } from "react";

import { Button } from "@material-ui/core"
import DeletePopup from "../Popups/Confirm";

const Menus = (props) => {

    const [deleteModal, setDeleteModal] = useState(false);
    const Delete = () => {
        setDeleteModal(true)
    }
    return (
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <Button onClick={() => props.onEdit(props.data)}>Edit</Button>
            <Button onClick={() => Delete(true)}>Delete</Button>

            <DeletePopup
                isOpen={deleteModal}
                handleClose={() => setDeleteModal(false)}
                onContinue={() => { props.onDelete(props.data); setDeleteModal(false) }}
            />
        </div>
    )
}

export default Menus;