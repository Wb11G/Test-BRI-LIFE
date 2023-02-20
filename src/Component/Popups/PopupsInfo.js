
// libraries
import { Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';

// components
import GeneralButton from "../GeneralButton/index";

const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& ::selection': {
            background: '#137EE1'
        }
    },
    paper: {
        width: 335,
        height: 'auto',
        backgroundColor: '#fff',
        border: 'none',
        padding: 20,
        alignItems: 'center',
        borderRadius: 10,
    }
}));

const PopupNoData = ({ isOpen, handleClose, label = 'No Data Found' }) => {

    const classes = useStyles();

    return (
        <div>
            <Modal
                className={classes.modal}
                open={isOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <div className={classes.paper}>
                        <p style={{ marginBottom: 20, textAlign: 'center' }}>{label}</p>
                        <GeneralButton
                            label="Close"
                            width='100%'
                            height='40px'
                            variant='contained'
                            onClick={handleClose}
                            className={classes.Button}
                        />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default PopupNoData;
