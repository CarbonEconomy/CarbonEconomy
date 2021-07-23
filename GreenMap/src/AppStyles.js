import { colors } from "./utils/Colors";
const AppStyles = {
  checkbox: {
    color: "white",
    borderColor: "white",
    margin: "0 !important",
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
    alignTracks: "center",
  },
};
export default AppStyles;
