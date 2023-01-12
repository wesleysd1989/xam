import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import GlobalStyle from "./styles/global";

import Routes from './routes';
import AppProvider from "./hooks";

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyle />
      <ToastContainer />
    </Router>
  );
}

export default App;
