import React, {useEffect, useState} from "react";
import {useLayers} from "./layers/UseLayers";
import {INITIAL_VIEWPORT_CBD} from "./utils/MapUtils/Viewports";
import {fetchTransactionsFlow} from "./dataLoaders/LocationsLoader"
import MapContent from "./pages/MapContent";
import LoadingPage from "./pages/LoadingPage";
import Button from '@material-ui/core/Button';
import toast, { Toaster } from 'react-hot-toast';

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

    const loadedDisplay = <>
        <MapContent
            viewport={viewport}
            layers={layers}/>
    </>

    return (
        <div className="App">
            <Toaster/>
            {(transactionsFlow === null)
                ? <LoadingPage message={"nice"}/>
                : loadedDisplay
            }
        </div>
    );
};

export default App;
