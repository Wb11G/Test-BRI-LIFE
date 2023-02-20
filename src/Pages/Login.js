//libraries
import React, { useState } from 'react';
import { TextField, Button, Typography, makeStyles, Grid } from '@material-ui/core';

//handler service
import api from '../HandlerService/Login.service';

//component
import ModalInfo from '../Component/Popups/PopupsInfo'

const LoginForm = () => {
    const classes = useStyles();
    const [userID, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [infotext, setInfotext] = useState("");
    const [info, setinfo] = useState(false);
    const [dataToken, setDataToken] = useState("");

    /**
     * It sets the userId to the value of the input field.
     * @param e - The event object
     */
    const handleEmailChange = (e) => {
        setUserId(e.target.value);
    };

    /**
     * The function handlePasswordChange takes an event as an argument, and sets the password state to
     * the value of the event target
     * @param e - the event object
     */
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    /**
     * The above function is a function that is used to handle the login process.
     * @param e - event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            "user_id": userID,
            "password": password
        };
        // Lakukan validasi email dan password, lalu lakukan permintaan API login
        api.Login(body)
            .then(res => {
                setInfotext("Login Sukses")
                setinfo(true)
                setDataToken(res.data.token)
            })
            .catch(err => {
                setInfotext("Maaf Login Anda Gagal")
                setinfo(true)
            })
    };

    const handlerConfirm = () => {
        sessionStorage.setItem('token', dataToken);
        localStorage.removeItem("LOGGED_OUT")
        window.location.replace('/frominput');
    }


    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={5}>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Typography variant="h4" className={classes.title}>
                        SISTEM INFORMASI INVENTORI
                    </Typography>
                    <Typography>
                        SILAHKAN MASUK KE APLIKASI INVENTORI
                    </Typography>
                    <TextField
                        id="Text"
                        label="User ID"
                        variant="outlined"
                        type="Text"
                        value={userID}
                        onChange={handleEmailChange}
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        required
                        fullWidth
                    />
                    <div className={classes.button}>
                        <Button type="submit" variant="contained" fullWidth className={classes.submit}>
                            Login
                        </Button>
                    </div>
                </form>
            </Grid>
            <ModalInfo
                label={infotext}
                isOpen={info}
                handleClose={() => { setinfo(false); handlerConfirm(true) }}
            />
        </Grid>
    );
};

export default LoginForm;

/* --------------------------------- STYLE --------------------------------- */
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: "#06559C",
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
    },
    form: {
        backgroundColor: '#fff',
        padding: theme.spacing(5),
        borderRadius: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        color: "#ffff",
        backgroundColor: "#EC701C",
        "&:hover": {
            color: "black",
            backgroundColor: "#EC701C",
        },
    },
}));