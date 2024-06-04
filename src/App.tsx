import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/material";
import { Routes } from "./Routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { pstore } from "./redux/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={pstore}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Container>
            <Routes />
            <ToastContainer />
          </Container>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
