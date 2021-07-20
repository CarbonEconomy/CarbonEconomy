import React from 'react'
import {Avatar, Card, Grid, makeStyles, Typography, SvgIcon, Icon} from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import zIndex from "@material-ui/core/styles/zIndex";
import {colors} from "../utils/Colors"
import CarbonEconomyLogo from './CarbonEconomy.svg';
import x from './CarbonEconomy.svg'

const useStyles = makeStyles({
    container: {
        zIndex: "1000",
    },
    icon: {
        zIndex: "1000",
        backgroundColor: colors.pistachioGreen,
        margin: "2%",
        padding: "5%",
    },
    imageIcon: {
        width: "150px",
        height: '150px',
        position: 'absolute',
        top:0,
        right:0,
        zIndex:1000,
    },
    iconRoot: {
        textAlign: 'center',
        position: 'relative',
        zIndex:1000,
    }

})

export default function TopMenu() {
    const classes = useStyles()
    const imageDisplay = <Icon className={{root:classes.iconRoot}}>
        <img className={classes.imageIcon} src={CarbonEconomyLogo} alt="x"/>
    </Icon>
    // return (<img src={x} alt="x"/>)
    return imageDisplay
}