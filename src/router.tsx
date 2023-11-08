import { createBrowserRouter } from "react-router-dom";

//
import ExtractPage from "./pages/extract";
import NotFoundPage from "./pages/notFound";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <ExtractPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
