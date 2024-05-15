import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import MyTripsPage from "./pages/MyTripsPage";
import PaymentPage from "./pages/PaymentPage";
import ReservationPage from "./pages/ReservationPage";
import ResultDetailPage from "./pages/ResultDetailPage";
import SearchResultPage from "./pages/SearchResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/mytrips",
    element: <MyTripsPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/reservation",
    element: <ReservationPage />,
  },
  {
    path: "/resultdetail",
    element: <ResultDetailPage />,
  },
  {
    path: "/searchresult",
    element: <SearchResultPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
