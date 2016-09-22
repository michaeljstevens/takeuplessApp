import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router.js';
import NavbarContainer from './components/navbar/navbar_container.js';
import configureStore from './store/store.js';


const Index = ({store}) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default Index;
