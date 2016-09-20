import React from 'react';
import { Provider } from 'react-redux';
import Router from './router.js';
import configureStore from './store/store.js';


const Index = ({store}) => (
  <Provider store={store}>
    <Router/>
  </Provider>
);

export default Index;
