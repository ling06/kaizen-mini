import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from '../shared/model/store/store.ts'; 
import GlobalStyle from './ui/assets/styles/GlobalStyle.ts';
import { ThemeProvider } from 'styled-components';
import baseTheme from './ui/assets/styles/themes/main.ts';
import './ui/assets/styles/typography.css';

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
