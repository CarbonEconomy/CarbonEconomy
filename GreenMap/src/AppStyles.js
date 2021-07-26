import {colors} from "./utils/Colors";

const AppStyles = {
    checkbox: {
        color: "white",
        borderColor: "white",
        margin: "0 !important"
    },
    checkboxes: {
        display: "flex",
        flexDirection: "column",
        color: colors.pistachioGreen,
    },
    container: {
        position: "absolute",
        zIndex: "2000 !important",
        top: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
    },
    slider: {
        position: "relative",
        zIndex: "2000 !important",
        height: 300,
        display: "flex",
        flexDirection: "column",
        alignTracks: "center"
    },
    helpNotificationCard: {
        background: `linear-gradient(45deg, ${colors.pistachioGreen} 30%, ${colors.darkGreen} 90%)`,
        width: "auto",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(0, 255, 0, .3)",
        color: "black",
        padding: "5px",
        alignItems: "top-left",
        zIndex:"10000"
    },
    helpNotificationContent: {
        background: `linear-gradient(45deg, ${colors.pistachioGreen} 30%, ${colors.darkGreen} 90%)`,
        position: "top-center",
        duration: 1000
    },
    transactionNotificationToast: {
        position: "top-left",
    },
    addressInput: {
        position: "bottom"
    },
    inputTextFieldStyle: {
        root:{
            position: "absolute",
            zIndex: "100000",
            top:"85%",
            left:"45%",
            width: "fit-content",
            backgroundColor: "white",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(0, 255, 0, .3)",
            color: `${colors.darkGreen}`,
            padding: "0 5px",
        }
    }



}
export default AppStyles
