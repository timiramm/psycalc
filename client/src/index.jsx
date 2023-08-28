/* eslint-disable default-param-last */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';

const defaultState = {
  user: null,
  specs: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, user: action.payload };
    case 'SPECS':
      return { ...state, specs: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
);
