import { useState } from "react";
import axios from "axios";
import User from "./models/User";
import Login from "./screens/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Grid from "screens/Grid";

const user = new User();

export default function App() {
  const userLogin = new User();
  const [errorMessage, setErrorMessage] = useState("");

  

  const changeErrorMessage = (message: string) => {
    setErrorMessage(message);
  };

  const getToken = async (user: User) => {
    await axios
      .post(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/api/oauth2/v1/token`,
        `grant_type=password&username=${user.state.userCode}&password=${user.state.password}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        user.state.access_token = response.data.access_token;
        user.state.refresh_token =  response.data.refresh_token;
        user.state.scope =  response.data.scope;
        user.state.token_type =  response.data.token_type;
        user.state.expires_in =  response.data.expires_in;
      })
      .catch((error) => {
        setErrorMessage(
          "Erro ao autenticar usuário verifique os dados de acesso."
        );
        console.log(error.response.data); // mensagem de erro
      });
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                onLogin={getToken}
                userState={userLogin}
                errorMessage={errorMessage}
                changeErrorMessage={changeErrorMessage}
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
