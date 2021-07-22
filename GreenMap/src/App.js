import React, { useEffect, useState } from "react";
import { useLayers } from "./layers/UseLayers";
import {
  createViewport,
  INITIAL_VIEWPORT_CBD,
} from "./utils/MapUtils/Viewports";
import { fetchTransactions } from "./dataLoaders/LocationsLoader";
import MapContent from "./pages/MapContent";
import LoadingPage from "./pages/LoadingPage";
import TransactionNotification from "./components/TransactionNotification";
import toast, { Toaster } from "react-hot-toast";
import parseApiData from "./dataLoaders/ApiParser";
import TopMenu from "./layouts/TopMenu";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import { borderColor, display } from "@material-ui/system";

const useStyles = makeStyles({
  checkbox: {
    color: "white",
    borderColor: "white",
    margin: "0 !important"
  },
  checkboxes: {
    display: "flex",
    flexDirection: "column",
    color: "white"
  },
  container: {
    position: "absolute",
    zIndex: "2000 !important",
    top: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
  },
});

const App = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT_CBD);
  const [transactions, setTransactions] = useState([]);
  const [transactionsFlow, setTransactionsFlow] = useState(null);
  const [state, setState] = useState({
    heatmap: false,
    arcs: false,
  });
  const classes = useStyles();

  const handleCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleResize = () => {
    setViewport((v) => {
      return {
        ...v,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    });
  };

  const handleViewportChange = (targetLocation) => {
    const updatedViewport = createViewport(targetLocation);
    console.log(">> updatedViewport:", updatedViewport);
    setViewport(updatedViewport);
  };

  async function fetchTransactionsData() {
    await fetchTransactions().then((transactions) => {
      setTransactions(transactions);
      setTransactionsFlow(parseApiData(transactions));
    });
  }

  useEffect(() => {
    fetchTransactionsData();
  }, []);

  //resize
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layers = useLayers({
    transactionsFlow: transactionsFlow,
    enabled: state,
  });

  window.setInterval(() => {
    return transactions
      ? toast.custom(
          <TransactionNotification
            onMouseEntryHandler={handleViewportChange}
            transaction={getRandomTransaction()}
          />,
          {
            position: "top-left",
          }
        )
      : null;
  }, 5000);

  const getRandomTransaction = () => {
    if (transactions == null) return {};
    const randIdx = Math.floor(Math.random() * transactions.length);
    const txn = transactions[randIdx];
    console.log("random txn", txn);
    return txn;
  };

  const checkboxes = (
    <FormGroup row className={classes.checkboxes}>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.arcs}
            onChange={handleCheck}
            name="arcs"
            color="primary"
            className={classes.checkbox}
          />
        }
        label="Arcs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.heatmap}
            onChange={handleCheck}
            name="heatmap"
            color="primary"
            className={classes.checkbox}
          />
        }
        label="Heatmap"
      />
    </FormGroup>
  );

  const loadedDisplay = (
    <>
      <div className={classes.container}>
        <TopMenu />
        {checkboxes}
      </div>
      <MapContent viewport={viewport} layers={layers} />
    </>
  );

  return (
    <div className="App">
      <Toaster />
      {transactionsFlow === null ? (
        <LoadingPage message={"nice"} />
      ) : (
        loadedDisplay
      )}
    </div>
  );
};

export default App;
