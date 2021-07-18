import React, {useEffect, useState} from "react";
import {renderLayers} from "./layers/RenderLayers";
import {INITIAL_VIEWPORT} from "./utils/MapUtils/Viewports";
import {fetchTransactionsFlow} from "./dataLoaders/LocationsLoader"
import MapContent from "./pages/MapContent";


const App = () => {
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
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


    return (
        <div className="App">
            {(transactionsFlow === null)
                ? <p> loading spinner ... </p>
                : <MapContent
                    viewport={viewport}
                    layers={renderLayers({
                        transactionsFlow: transactionsFlow,
                    })}/>
            }
        </div>
    );
};

export default App;
