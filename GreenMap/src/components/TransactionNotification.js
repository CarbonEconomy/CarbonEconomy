import React from "react";
import {Card, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import "@fontsource/roboto";
import {colors} from "../utils/Colors";
import PropTypes from "prop-types";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

const useStyles = makeStyles({
    notification: {
        background: `linear-gradient(45deg, ${colors.pistachioGreen} 30%, ${colors.darkGreen} 90%)`,
        width: "10em",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(0, 255, 0, .3)",
        color: "black",
        padding: "0 5px",
        alignItems: "top-left",
    },
});

const getPointName = (point) => {
    if (point.address) {
        return point.address;
    } else {
        return `${point.lng},${point.lat}`;
    }
};

function displayTransaction(transaction) {
    if (!transaction) {
        return <Typography variant={"body1"}>Towards a greener future</Typography>;
    }
    const amount = transaction.amount;
    const description = transaction.description;
    const destinationLocation = getPointName(description.end);
    const mode = description.mode;
    return (
        <Typography variant={"body1"}>
            <AddTwoToneIcon/> {amount} <EcoTwoToneIcon/>
            <br/>
            {destinationLocation}
            <br/>
            for {mode}
        </Typography>
    );
}

export default function TransactionNotification(props) {
    const classes = useStyles();
    const {transaction, onMouseEntryHandler} = props;
    return (
        <Card
            onMouseEnter={() =>
                transaction ? onMouseEntryHandler(transaction.description.end) : null
            }
            className={classes.notification}
        >
            {displayTransaction(transaction)}
        </Card>
    );
}

TransactionNotification.propTypes = {
    transaction: PropTypes.object,
    onMouseEntryHandler: PropTypes.func,
};
