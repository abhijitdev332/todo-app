import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// lazy loads
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

// layouts components
import { Login, Register } from "./layouts/layout.js";
import { UserProtected, ProtectedRoute } from "./utils/ProtectedRoute.jsx";
import { Loader } from "./includes/includes.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/"
        element={
          <UserProtected>
            <Auth />
          </UserProtected>
        }
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*/" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
