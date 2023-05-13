import Input from "components/Input/Input";
import User from "models/User";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  userState: User;
}

const Login: React.FC<LoginProps> = ({ userState }) => {
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [validando, setValidando] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorUserCode, setErrorUserCode] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const navigate = useNavigate();

  const handleUserCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 6 && !isNaN(Number(event.target.value))) {
      setUserCode(event.target.value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidando(true);

    userState.state.userCode = userCode;
    userState.state.password = password;

    await axios
      .post(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/api/oauth2/v1/token`,
        `grant_type=password&username=${userState.state.userCode}&password=${userState.state.password}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(
        (response: {
          data: {
            access_token: string;
            refresh_token: string;
            scope: string;
            token_type: string;
            expires_in: number;
          };
        }) => {
          userState.state.access_token = response.data.access_token;
          userState.state.refresh_token = response.data.refresh_token;
          userState.state.scope = response.data.scope;
          userState.state.token_type = response.data.token_type;
          userState.state.expires_in = response.data.expires_in;
          console.log(
            `teste de atualizacao de estado ${userState.state.access_token}`
          );
          console.log(
            `teste de response de estado ${response.data.access_token}`
          );
          navigate("./produtos");
        }
      )
      .catch((error: { response: { data: any } }) => {
        setErrorMessage(
          "Erro ao autenticar usuário verifique os dados de acesso."
        );
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Tab") {
      const formattedValue = "000000" + userCode;
      setUserCode(formattedValue.slice(-6));
    }
  };

  const handleBlur = () => {
    const formattedValue = "000000" + userCode;
    setUserCode(formattedValue.slice(-6));
  };

  useEffect(() => {
    userState = new User();
  }, []);

  useEffect(() => {
    if (errorMessage !== "") {
      setErrorUserCode(true);
      setErrorPassword(true);
      setValidando(false);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (errorUserCode) {
      setErrorUserCode(!errorUserCode);
      setErrorMessage("");
      setValidando(false);
    }
  }, [userCode]);

  useEffect(() => {
    if (errorPassword) {
      setErrorPassword(!errorPassword);
      setErrorMessage("");
      setValidando(false);
    }
  }, [password]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xs sm:mt-20">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4">
          <h1 className="block text-lg font-semibold leading-6 text-gray-900 text-center">
            Login
          </h1>
          <div>
            <Input
              label="Usuário"
              id="login-code"
              type="text"
              onChange={handleUserCodeChange}
              value={userCode}
              placeholder="Digite seu código de usuário"
              error={errorUserCode}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              required
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Digite sua senha"
              error={errorPassword}
              required
            />
          </div>
          {errorMessage !== "" ? (
            <h1 className="block text-sm font-semibold leading-6 text-red-700">
              {errorMessage}
            </h1>
          ) : null}
          <div className="mt-10">
            <button
              type="submit"
              disabled={
                userCode === "" ||
                password === "" ||
                errorMessage !== "" ||
                validando
              }
              className="block w-20 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-200"
            >
              Entrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
