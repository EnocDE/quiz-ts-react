import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
