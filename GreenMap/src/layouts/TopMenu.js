import React from "react";
import { makeStyles, Icon } from "@material-ui/core";
import CarbonEconomyLogo from "./CarbonEconomy.svg";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import "@fontsource/roboto";
import TopMenuStyles from "./TopMenuStyles";
import dialogText, { dialogTitleContent } from "../utils/HelpDialogContent";

const useStyles = makeStyles(TopMenuStyles);

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
      <img className={classes.imageIcon} src={CarbonEconomyLogo} alt="x" />
    </Icon>
  );

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
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
        <div className={classes.title}>
          {dialogTitleContent}
          <Button className={classes.closeButton} onClick={handleClose}>
            <CloseIcon fontSize={"large"} />
          </Button>
        </div>
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
