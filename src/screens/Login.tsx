import Input from "components/Input/Input";
import User from "models/User";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (user: User) => void;
  changeErrorMessage: (message: string) => void;
  userState: User;
  errorMessage: string;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  userState,
  errorMessage,
  changeErrorMessage,
}) => {
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
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
    userState.state.userCode = userCode;
    userState.state.password = password;

    onLogin(userState);
  };

  useEffect(() => {
    if (errorMessage !== "") {
      setErrorUserCode(true);
      setErrorPassword(true);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (userState.state.access_token !== "") {
      navigate('./produtos');
    }
  }, [userState.state.access_token]);

  useEffect(() => {
    if (errorUserCode) {
      setErrorUserCode(!errorUserCode);
      changeErrorMessage("");
    }
  }, [userCode]);

  useEffect(() => {
    if (errorPassword) {
      setErrorPassword(!errorPassword);
      changeErrorMessage("");
      console.log(errorMessage);
    }
  }, [password]);

  return (
    <div >
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xs sm:mt-20">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4">
          <h1 className="block text-lg font-semibold leading-6 text-gray-900 text-center">Login</h1>
          <div>
            <Input
              label="Usuário"
              id="login-code"
              type="text"
              onChange={handleUserCodeChange}
              value={userCode}
              placeholder="Digite seu código de usuário"
              error={errorUserCode}
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
          {errorMessage !== "" ? <h1 className="block text-sm font-semibold leading-6 text-red-700">{errorMessage}</h1> : null}
          <div className="mt-10">
          <button
            type="submit"
            disabled={userCode === "" || password === "" || errorMessage !== ""}
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
