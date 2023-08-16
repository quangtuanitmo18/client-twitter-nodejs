import { createBrowserRouter } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import VerifyForgotPasswordToken from "./VerifyForgotPasswordToken";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./verifyEmail";

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
  {
    path: "/forgot-password",
    element: <VerifyForgotPasswordToken />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
