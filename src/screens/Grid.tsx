import React, { useState, useEffect } from "react";
import axios from "axios";
import Produto from "models/Produto";
import User from "models/User";


interface GridProps {
  userState: User;
}

const Grid: React.FC<GridProps> = ({ userState }) => {
  const [data, setData] = useState<Produto[]>([]);

  const fetchData = async (user: User) => {
    const token = user.state.access_token;
    const { data } = await axios.get(
      `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto?offset=0&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    setData(data.list);
  };

  // useEffect(() => {
  //   fetchData(userState);
  // }, []);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-x-4">
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Unidade Medida</th>
            <th>Cod. Cliente</th>
            <th>Peso Bruto</th>
            <th>Peso Liquído</th>
            <th>Grupo</th>
            <th>Saldo</th>
          </tr>
        </thead>
        {data ? <tbody>
          {data.map((item) => (
            <tr key={item.state.codigo}>
              <td>{item.state.codigo}</td>
              <td>{item.state.descricao}</td>
              <td>{item.state.um}</td>
              <td>{item.state.codigoCliente}</td>
              <td>{item.state.pesoBruto}</td>
              <td>{item.state.pesoLiquido}</td>
              <td>{item.state.grupo}</td>
              <td>{item.state.saldo}</td>
            </tr>
          ))}
        </tbody> : null}
      </table>
    </div>
  );
};

export default Grid;
