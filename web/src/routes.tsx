import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import ListPoint from './pages/ListPoint'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
      <Route component={ListPoint} path="/list-points" />
    </BrowserRouter>
  );
}

export default Routes
