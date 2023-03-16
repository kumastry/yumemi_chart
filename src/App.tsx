import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./pages/Top";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
