import { createBrowserRouter } from "react-router-dom";

import Login from "./Login";
import VerifyForgotPasswordToken from "./VerifyForgotPasswordToken";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./verifyEmail";
import Test from "./Test";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <Test />,
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
