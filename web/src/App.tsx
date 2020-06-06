import React from 'react';
import GlobalStyle from './style/global'
import { ToastContainer } from "react-toastify";

import Routes from './routes'

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={2500}></ToastContainer>
    </>
  );


}

export default App;
