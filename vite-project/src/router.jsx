import { createBrowserRouter } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login/oauth",
    element: <Login />,
  },
  {
    path: "/email-verifications",
    element: <VerifyEmail />,
  },
]);

export default router;
