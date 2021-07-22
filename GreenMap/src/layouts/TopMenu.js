import React from "react";
import {makeStyles, Icon, Typography} from "@material-ui/core";
import {colors} from "../utils/Colors";
import CarbonEconomyLogo from "./CarbonEconomy.svg";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import "@fontsource/roboto";

const useStyles = makeStyles({
    container: {
        flexShrink: 0,
    },
    icon: {
        backgroundColor: colors.pistachioGreen,
        margin: "2%",
        padding: "5%",
    },
    imageIcon: {
        width: "150px",
        height: "150px",
    },
    iconRoot: {
        textAlign: "center",
        position: "relative",
        width: "150px",
        height: "150px",
        zIndex: 20000,
    },
    closeButton: {
        float: "right",
        color: "black",
        minWidth: 0,
        zIndex: 20000,
    },
});

const dialogText = <Typography variant={"body1"}>

    With GreenMap, you can explore how GreenCredits are being used around our island.
    [Features]

    The notifications you see on the left are real transactions made by people. Every GreenCredit counts towards making
    us
    better GreenConsumers.
    Want to see which part of the island the transaction was made?
    Hover (or tap if you are on your phone) and you will fly to that neighbourhood.

    The GreenCredit inflow for every couple of blocks is represented by a stack, the taller it is, the more GreenCredit has
    flowed into that area.
    Hover over the respective point to see more details about how the transaction was made and get some insight into how
    others are playing
    their part in this effort.

    [Controls]

    On the right, you will find some interactive controls.
    Check the boxes you want to showcase specific layers to get newer points of view.

    Finally, we have a control slider. Pause the notifications by sliding it all the way to the bottom or quicken it if
    you
    so wish. This changes the period at which we poll for newer transactions (this is a lie).


    [Layers]

    Arcs:
    Want to find out more about where the GreenCredits came from? Enable the Arcs and find out about the source.

    HeatMap:
    Want to add some colours and see things from a bigger picture? Enable the HeatMap to visualise density of
    GreenCredit inflow


    We at CarbonEconomy hope that GreenMap helps us all find the direction to a Greener Future.
    Green Is In.

</Typography>

const dialogText_ =
    "Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap! v Welcome to GreenMap! Welcome to GreenMap! Welcome to GreenMap!";

export default function TopMenu() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const imageDisplay = (
        <Icon className={classes.iconRoot} onClick={handleClickOpen}>
            <img className={classes.imageIcon} src={CarbonEconomyLogo} alt="x"/>
        </Icon>
    );

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const dialog = (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">
                GreenMap{" "}
                <Button className={classes.closeButton} onClick={handleClose}>
                    <CloseIcon/>
                </Button>
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {dialogText}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
    return (
        <>
            {imageDisplay}
            {dialog}
        </>
    );
}
