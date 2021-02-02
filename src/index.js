import React from 'react';
import ReactDOM from 'react-dom';
import 'shared/style/index.css';
import App from './App';
import store from './store'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
