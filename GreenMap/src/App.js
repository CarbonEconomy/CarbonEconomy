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

const App = () => {
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT_CBD);
  const [transactions, setTransactions] = useState([]);
  const [transactionsFlow, setTransactionsFlow] = useState(null);

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
    enabledArray: ["heatmap"]
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

  const loadedDisplay = (
    <>
      <TopMenu style={{ zIndex: "100", position: "top-right" }} />
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
