// main
import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";

// libraries
import { makeStyles, Modal, Fade, Backdrop, createTheme, ThemeProvider, CircularProgress } from '@material-ui/core';

// components
import GeneralButton from "../GeneralButton/index";

import ButtonOutlined from "../GeneralButton/index";
;


const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 320,
        minHeight: 320,
        backgroundColor: '#fff',
        border: '1px solid #BCC8E7',
        padding: '16px 25px 30px',
        alignItems: 'center',
        borderRadius: 8,
        position: 'relative',
        textAlign: 'center'
    },
    title: {
        fontFamily: 'FuturaHvBT',
        fontSize: 20,
        fontWeight: 900
    },
    button: {
        position: 'absolute',
        bottom: 30
    },
    desc: {
        fontFamily: 'FuturaBkBT',
        margin: '5px 0 25px'
    }
}));

const buttonRedTheme = createTheme({
    palette: {
        primary: {
            light: '#fc9090',
            main: '#FF6F6F',
            dark: '#eb5858',
            contrastText: '#fff'
        }
    }
});

const DeletePopup = ({ isOpen, handleClose, onContinue, title, loading, textSubmit }) => {

    const classes = useStyles();
    const [titles, setTitles] = useState([]);


    useEffect(() => {
        if (title) {
            const temp = title.split('\\n');
            setTitles(temp);
        };
    }, [title]);



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
                        {titles.map(item => <h1 className={classes.title}>{item}</h1>)}
                        <p className={classes.desc}>Kamu Tidak Bisa Membantalkan Action</p>
                        <div className={classes.button} style={{ right: 30 }}>
                            <ButtonOutlined
                                label='Cancel'
                                width='76px'
                                height='40px'
                                color='#0061A7'
                                onClick={handleClose}
                                disabled={loading ? true : false}
                            />
                        </div>
                        <div className={classes.button} style={{ left: 30 }}>
                            <ThemeProvider theme={buttonRedTheme}>
                                <GeneralButton
                                    label={'Delete'
                                    }
                                    width={textSubmit ? '100px' : '84px'}
                                    height='40px'
                                    onClick={onContinue}
                                />
                            </ThemeProvider>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

DeletePopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onContinue: PropTypes.func,
    title: PropTypes.string
};

DeletePopup.defaultProps = {
    title: 'Yakin data mau dihapus?'
};

export default DeletePopup;
