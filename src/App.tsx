import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Top } from "./pages/Top";
import { NotFound } from "./pages/NotFound";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Top />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
