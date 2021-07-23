import React, {useEffect, useRef, useState} from "react";
import {useLayers} from "./layers/UseLayers";
import {
    createViewport,
    INITIAL_VIEWPORT_CBD,
} from "./utils/MapUtils/Viewports";
import {fetchTransactions} from "./dataLoaders/LocationsLoader";
import MapContent from "./pages/MapContent";
import LoadingPage from "./pages/LoadingPage";
import TransactionNotification, {DisplayHelpToast, displayHelpToast} from "./components/TransactionNotification";
import toast, {Toaster} from "react-hot-toast";
import parseApiData from "./dataLoaders/ApiParser";
import TopMenu from "./layouts/TopMenu";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Card, Container, makeStyles, Slider, Typography} from "@material-ui/core";
import {colors} from "./utils/Colors"
import FastForwardIcon from '@material-ui/icons/FastForward';
import PauseIcon from '@material-ui/icons/Pause';
import "@fontsource/roboto";
import './slider.css';
import AppStyles from "./AppStyles"

const useStyles = makeStyles(AppStyles)

const App = () => {
        const [viewport, setViewport] = useState(INITIAL_VIEWPORT_CBD);
        const [transactions, setTransactions] = useState([]);
        const [transactionsFlow, setTransactionsFlow] = useState(null);
        const [tickPeriod, setTickPeriod] = useState(2000) // updating of toasts
        const [state, setState] = useState({
            heatmap: false,
            arcs: false,
        });
        const classes = useStyles();

        const handleCheck = (event) => {
            setState({...state, [event.target.name]: event.target.checked});
        };


        const handleNotificationSpeedSliderChange = (event, newValue) => {
            const newTickPeriod = newValue === 0 ? newValue : (11 - newValue) * 1000
            setTickPeriod(newTickPeriod)
        }

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

        const deckGlLayers = useLayers({
            transactionsFlow: transactionsFlow,
            enabled: state,
        });

        // refs needed to avoid using values in setInterval closure:
        const transactionsRef = useRef(transactions)
        const tickPeriodRef = useRef(tickPeriod)
        transactionsRef.current = transactions
        tickPeriodRef.current = tickPeriod

        // change tick period for notifications:
        useEffect(() => {
            let interval = null
            const tickPeriod = tickPeriodRef.current
            console.log(">> new interval period to set:", tickPeriod)
            if (tickPeriod !== 0) { // display if non-zero:
                interval = setInterval(() => {
                    const currentTransactions = transactionsRef.current
                    currentTransactions
                        ? toast.custom(<TransactionNotification
                            onMouseEntryHandler={handleViewportChange}
                            transaction={getRandomTransaction(currentTransactions)}
                        />, {
                            position: "top-left",
                        })
                        : null;
                }, tickPeriod)
                return () => clearInterval(interval)
            } else return null

        }, [tickPeriod])

        const getRandomTransaction = (transactions) => {
            if (transactions == null) return {};
            const randIdx = Math.floor(Math.random() * transactions.length);
            const txn = transactions[randIdx];
            console.log("random txn", txn);
            return txn;
        };

        const notificationSpeedControlSlider = <div className={classes.slider}>
            <Typography id="vertical-slider" gutterBottom alignJustify>
                Notification <br/> Speed
            </Typography>
            <FastForwardIcon/>
            <Slider
                orientation="vertical"
                defaultValue={tickPeriod}
                onChange={handleNotificationSpeedSliderChange}
                max={10}
                min={0}
                classes={classes.slider}
            />
            <PauseIcon/>
        </div>

        const checkboxes = (
            <Container row className={classes.checkboxes}>
                <FormGroup row className={classes.checkboxes}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.arcs}
                                onChange={handleCheck}
                                name="arcs"
                                color={colors.pistachioGreen}
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
                                color={colors.pistachioGreen}
                                className={classes.checkbox}
                            />
                        }
                        label="Heatmap"
                    />
                </FormGroup>
                {notificationSpeedControlSlider}
            </Container>

        );

        const loadedDisplay = (
            <>
                <div className={classes.container}>
                    <TopMenu/>
                    {checkboxes}
                </div>
                <MapContent viewport={viewport} layers={deckGlLayers}/>
            </>
        );

        useEffect(() => {
                const toastId = toast.custom((t) => {
                        return <Card
                            className={classes.helpNotificationCard}
                            onClick={()=> {
                                toast.dismiss(toastId)
                            }}
                        >
                            <Typography variant={"body1"}>
                                For help, click the logo
                            </Typography>
                        </Card>
                    }
                    , classes.helpNotificationContent
                    )
                setTimeout(() => {
                    toast.dismiss(toastId)
                }, 1000)
            }
            , [])

        return (
            <div className="App">
                <Toaster/>
                {transactionsFlow === null ? (
                    <LoadingPage message={"nice"}/>
                ) : (
                    loadedDisplay
                )}
            </div>
        );
    }
;

export default App;
