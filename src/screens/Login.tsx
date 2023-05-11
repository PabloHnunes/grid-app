import Input from "components/Input/Input";
import React, { useState } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");

  const handleUserCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length <= 6){
      setUserCode(event.target.value);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin(userCode, password);
  };

  return (
    <div className="login-container">
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xs sm:mt-20"
      >
        <div >
          <h1>Login</h1>
          <div>
            <Input
              label="Usuário"
              id="login-code"
              type="text"
              onChange={handleUserCodeChange}
              value={userCode}
              placeholder="Digite seu codigo de usuário"
              required
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              placeholder="Digite sua senha"
              required
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
