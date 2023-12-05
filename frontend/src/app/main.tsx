import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from '../store/store.ts'; 
import GlobalStyle from '../styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../styles/themes/main.ts';
import '@styles/typography.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
