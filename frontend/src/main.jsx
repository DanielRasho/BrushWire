import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import User from "./views/User";
import BlogEditor from "./views/BlogEditor";
import { OuthProvider } from "./providers/auth";

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/blogeditor",
    element: <BlogEditor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <OuthProvider>
    <RouterProvider router={ROUTER} />
  </OuthProvider>,
);
