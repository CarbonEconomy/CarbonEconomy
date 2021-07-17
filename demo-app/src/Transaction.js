import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';

export function Transaction(props) {
    const routes = props.response;
    routes.sort((a, b) => b.credits - a.credits)
    console.log(routes)
    const [selectedRoute, setSelected] = useState(routes[0])
    const [userId, setUserId] = useState("");

    const onClick = () => {
        const data = {
            selectedRoute,
            userId
        }
        props.onTransaction(data);
    }

    return <Paper style={{ padding: 20 }}>
        {routes.map((route) => (
            <div
                onClick={() => setSelected(route)}
                style={{
                    padding: 10,
                    marginTop: 20,
                    borderStyle: "solid",
                    borderWidth: 2.5,
                    borderRadius: 10,
                    borderColor: selectedRoute === route ? "#2DDA93" : "rgba(0,0,0,0.3)",

                }}>
                <Typography variant="h6">{route.route}</Typography>
                <Typography style={{ display: "inline" }} variant="h6">Emissions: {"  "}</Typography>
                <Typography style={{ color: route.carbonEmissions > 0 ? "red" : "", display: "inline" }} variant="h6"> {route.carbonEmissions}</Typography>
                <br />
                <Typography style={{ display: "inline" }} variant="h6">Emissions Saved: {"  "}</Typography>
                <Typography style={{ color: route.carbonEmissionsSaved > 0 ? "#2DDA93" : "", display: "inline" }} variant="h6"> {route.carbonEmissionsSaved}</Typography>
                <br />
                <Typography style={{ display: "inline" }} variant="h6">Credits: {"  "}</Typography>
                <Typography style={{ color: route.credits > 0 ? "#2DDA93" : "", display: "inline" }} variant="h6"> {route.credits}</Typography>
            </div>
        ))}

        <TextField value={userId} onChange={(event) => setUserId(event.target.value)} style={{ marginTop: 10 }} fullWidth label="Recipient" variant="outlined"></TextField>
        <Button onClick={onClick} style={{ height: 50, marginTop: 20, marginBottom: 20 }} variant="contained" color="primary" fullWidth>MAKE TRANSACTION</Button>
    </Paper>
}