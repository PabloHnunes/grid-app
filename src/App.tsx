import { useState } from "react";

import User from "./models/User";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Grid from "screens/Grid";

const user = new User();

export default function App() {
  const userLogin = new User();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                userState={userLogin}
              />
            }
          />
          <Route
            path="/produtos"
            element={<Grid userState={userLogin}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
