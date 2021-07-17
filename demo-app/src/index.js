import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./index.css";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

Amplify.configure(awsExports);

const theme = createTheme({
  palette: {
    primary: {
      main: "#2DDA93",
      contrastText: "#fff"
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          color: 'white',
        },
      },
    }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

