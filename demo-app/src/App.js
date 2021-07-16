import React, { useState, useEffect } from 'react';
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Paper, Button, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import { Transaction } from './Transaction';
import axios from 'axios';

const MOCK_RESPONSE = [
  {
    route: "CAR",
    credits: 0,
  },
  {
    route: "HYBRID_CAR",
    credits: 14,
  },
  {
    route: "ELECTRIC_CAR",
    credits: 33,
  },
  {
    route: "BIKE",
    credits: 23,
  },
  {
    route: "BICYCLE",
    credits: 88
  }
]

function App() {
  const [user, setUser] = useState(null);

  const [selectStart, setSelectStart] = useState(true);
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});

  const [route, setRoute] = useState("CAR");
  const [routes, setRoutes] = useState([]);

  const [response, setResponse] = useState(MOCK_RESPONSE);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      if (authData) {
        setUser(authData)
      }
      console.log(nextAuthState, authData)
    });
  }, []);

  const onMapClick = (value) => {
    const coords = {
      lat: value.lat,
      lng: value.lng
    }
    if (selectStart) {
      setStart(coords)
    } else {
      setEnd(coords)
    }
    console.log(coords)
  }

  const onTransaction = async (data) => {
    const toID = data.userId;
    const fromID = user.attributes.sub;
    const amount = data.selectedRoute.credits;
    const description = {
      start,
      end,
      mode: data.selectedRoute.route
    }

    if (!toID) {
      alert("please enter user id")
      return
    }

    const body = {
      toID,
      fromID,
      amount,
      description
    }
    try {
      await axios.post("https://fv1au9jx9a.execute-api.us-east-1.amazonaws.com/dev/transaction", body)
      alert("successful transaction")
    } catch (e) {
      alert("transaction failed")
    }

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper style={{ padding: 20, marginBottom: 10 }}>
          {start && <Typography variant="h6">Start Point: (Lat: {start.lat}, Lng: {start.lng})</Typography>}
          {end && <Typography variant="h6">End Point: (Lat: {end.lat}, Lng: {end.lng})</Typography>}
        </Paper>
        <Paper style={{ padding: 20, marginBottom: 10 }}>
          <Grid container>
            <Grid item xs={4}>
              <FormControl style={{ minWidth: 240 }}>
                <InputLabel id="route">Route Type</InputLabel>
                <Select
                  labelId="route"
                  autoWidth
                  value={route}
                  onChange={(event) => setRoute(event.target.value)}>
                  <MenuItem value="CAR">Car</MenuItem>
                  <MenuItem value="HYBRID_CAR">Hybrid Car</MenuItem>
                  <MenuItem value="ELECTRIC_CAR">Electric Car</MenuItem>
                  <MenuItem value="BIKE">Bike</MenuItem>
                  <MenuItem value="E_SCOOTER">E-Scooter</MenuItem>
                  <MenuItem value="BICYCLE">Bicycle</MenuItem>
                  <MenuItem value="WALKER">Walker</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={() => {
                if (!routes.includes(route)) {
                  setRoutes([route, ...routes])
                }
              }} variant="outlined" fullWidth>Add Route</Button>
            </Grid>
            <Grid item xs={10}>
              {routes.map((r) => <Chip
                style={{ padding: 10, marginTop: 10, marginRight: 10 }}
                clickable
                label={r}
                color="primary"
                onDelete={() => setRoutes(routes.filter((ro) => ro !== r))}
              />)}
            </Grid>
          </Grid>
        </Paper>
        <Button style={{ height: 50, marginTop: 20, marginBottom: 20 }} variant="contained" color="primary" fullWidth>CALCULATE EMISSIONS</Button>

        {response.length > 0 && <Transaction response={response} onTransaction={onTransaction} />}

      </Grid>

      <Grid item xs={6}>
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyB5lO1127mqrFQCMmQ6zUgO-vffxeoyUlI" }}
            defaultCenter={{ lat: 1.344128719212576, lng: 103.81733822489308 }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals
            onClick={onMapClick}
          >
            {start.lat && <Button variant="contained" color="primary" {...start}>START</Button>}
            {end.lat && <Button variant="contained" color="primary" {...end}>END</Button>}

          </GoogleMapReact>
          <Grid container style={{ marginBottom: 50, marginTop: 10 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color={selectStart ? "primary" : "default"}
                onClick={() => setSelectStart(true)}>
                Select Start
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color={!selectStart ? "primary" : "default"}
                onClick={() => setSelectStart(false)}>
                Select End
              </Button>
            </Grid>
          </Grid>
          <AmplifySignOut />

        </div>
      </Grid>
    </Grid>
  );
}

export default withAuthenticator(App);
