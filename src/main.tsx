import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//
import router from "./router.tsx";

//
import "./utils/i18n.ts";

//
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

//
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

//
const documentRoot = document.getElementById("root");

/**
 *
 */
ReactDOM.createRoot(documentRoot!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>,
);
