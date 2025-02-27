import React from "react";
import { Provider } from "react-redux";
import { Container } from "@mui/material";
import { store } from "./redux/store.js";

import Main from "./components/Main.js";
import About from "./components/About.js";
import Hotels from "./components/Hotels.js";
import Header from "./components/Header.js";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Main /> },
    { path: "/about", element: <About /> },
    { path: "/hotels", element: <Hotels /> },
  ]);

  return (
    <Provider store={store}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {routes}
      </Container>
    </Provider>
  );
}

export default App;
