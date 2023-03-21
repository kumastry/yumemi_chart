import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Top } from "./pages/Top";
import { NotFound } from "./pages/NotFound";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60000,
      cacheTime: 60000,
    },
  },
});

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Top />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
