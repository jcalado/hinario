import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme  } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const hinario = createTheme({
  palette: {
    primary: {
      main: '#fbd53b',
      light: '#fbd53b',
      dark: '#c4a400'
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={hinario}>
    <BrowserRouter>
      <Routes>
        <Route path="/hinario" element={<App which={"old"} />} />
        <Route path="/hinario/antigo" element={<App which={"old"} />} />
        <Route path="/hinario/novo" element={<App which={"new"}/>} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
