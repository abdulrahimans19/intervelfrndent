import { Routes, Route } from "react-router-dom";
import Notes from "../pages/Notes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Signup />}></Route>

      <Route path="/" element={<Login />}></Route>

      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <Notes />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
}
