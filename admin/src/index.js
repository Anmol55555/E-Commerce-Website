import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import {store, persistor} from "./redux/store";   // To use redux store and persist( to keep save the changes even after refresh)
import { PersistGate } from 'redux-persist/integration/react';       // For persist in redux store

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading="null" persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


