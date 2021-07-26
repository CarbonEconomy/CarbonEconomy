import {colors} from "../utils/Colors";

const TopMenuStyles = {
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
    helpDialog: {
        zIndex: 8
    },
    closeButton: {
        float: "right",
        color: `${colors.darkGreen}`,
        minWidth: 0,
        // zIndex: 20000,
    },
    title: {
        // zIndex: 20000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
};
export default TopMenuStyles;
