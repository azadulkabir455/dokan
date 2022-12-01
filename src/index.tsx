import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import { GlobalContextContainer } from './contextAPI/GlobalContext';
import { Provider } from 'react-redux';
import ErrorBoundary from './component/errorBoundary/ErrorBoundary';
import store from './store';
import App from './App';

// For Bootstrap and StyleSheet
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/minty/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./assets/css/global.scss"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <GlobalContextContainer>
            <App />
          </GlobalContextContainer>
        </Router>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
