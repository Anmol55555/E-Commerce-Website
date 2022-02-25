import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import {store, persistor} from "./redux/store";   // To use redux store and persist( to keep save the changes even after refresh)
import { PersistGate } from 'redux-persist/integration/react';       // For persist in redux store
import './index.css';


ReactDOM.render(
  <Provider store={store}>          {/* We are wrapping redux store here as the is the main head component so from here we can communicate to any component under it easily. */}
    <PersistGate loading={null} persistor={persistor}>    {/* To apply persist in redux store */}
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


