
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


/* --------------------------------- START --------------------------------- */
const GeneralButton = (props) => {

    const { label, iconPosition, buttonIcon, onClick, width, height, style, disabled, className } = props

    const classes = useStyles(props);

    let button;
    if (iconPosition === 'endIcon') {
        button =
            <Button
                type={props?.type}
                className={className ? `${className} ${classes.root}` : classes.root}
                endIcon={buttonIcon}
                onClick={onClick}
                disabled={disabled}
                style={{
                    width,
                    height,
                    ...style
                }}
                color='primary'
                variant='contained'
            >
                {label}
            </Button>;
    } else {
        button = <Button className={className ? `${className} ${classes.root}` : classes.root}
            startIcon={buttonIcon}
            onClick={onClick}
            type={props?.type}
            disabled={disabled}
            style={{
                width,
                height,
                ...style
            }}
            color='primary'
            variant='contained'
        >{label}
        </Button>;
    }
    return (
        <>
            {button}
        </>
    );
};

const useStyles = makeStyles({
    root: {
        fontFamily: "Futura",
        fontSize: (props) => props.label === "Download CSV" || props.label === 'Add Bank' ? 12 : 14,
        lineHeight: '15px',
        textAlign: 'center',
        textTransform: 'capitalize',
        borderRadius: '8px',
        boxShadow: '0px 6px 6px 2px rgba(120, 191, 254, 0.12)',
        padding: '0 20px 3px',
        '&:hover': {
            boxShadow: '0px 6px 6px 2px rgba(120, 191, 254, 0.12)',
        },
    },
});


GeneralButton.defaultProps = {
    label: "Submit",
    buttonIcon: '',
    iconPosition: "endIcon",
    width: '86px',
    height: '40px',
    disabled: false,
    className: ''
};

export default GeneralButton;

