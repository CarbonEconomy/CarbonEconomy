import React, {useEffect, useState} from "react";
import {useLayers} from "./layers/UseLayers";
import {INITIAL_VIEWPORT_CBD} from "./utils/MapUtils/Viewports";
import {fetchTransactionsFlow} from "./dataLoaders/LocationsLoader"
import MapContent from "./pages/MapContent";
import LoadingPage from "./pages/LoadingPage";


const App = () => {
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT_CBD);
    const [transactionsFlow, setTransactionsFlow] = useState(null)

    const handleResize = () => {
        setViewport((v) => {
            return {
                ...v,
                width: window.innerWidth,
                height: window.innerHeight
            };
        });
    };

    async function fetchTransactionsFlowData() {
        let mockTransactionsFlow = await fetchTransactionsFlow()
        setTransactionsFlow(mockTransactionsFlow)
    }

    useEffect(() => {
        fetchTransactionsFlowData()
    }, []);

    //resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const layers = useLayers({
        transactionsFlow: transactionsFlow,
    })
    return (
        <div className="App">
            {(transactionsFlow === null)
                ? <LoadingPage message={"nice"}/>
                : <MapContent
                    viewport={viewport}
                    layers={layers}/>
            }
        </div>
    );
};

export default App;