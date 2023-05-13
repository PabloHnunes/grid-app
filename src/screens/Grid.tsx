import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import Input from "components/Input/Input";
import Select from "components/Select";

interface GridProps {
  userState: User;
}

interface Option {
  value: string;
  label: string;
}
interface ProdutoState {
  codigo: string;
  codigoCliente: string;
  descricao: string;
  um: string;
  pesoBruto: number;
  pesoLiquido: number;
  grupo: string;
  saldo: number;
}

const Grid: React.FC<GridProps> = ({ userState }) => {
  const [produto, setProduto] = useState<ProdutoState>({
    codigo: "",
    codigoCliente: "",
    descricao: "",
    um: "",
    pesoBruto: 0,
    pesoLiquido: 0,
    grupo: "",
    saldo: 0,
  });
  const [data, setData] = useState<ProdutoState[]>([]);
  const [grupos, setGrupos] = useState<Option[]>([]);
  const [unidadeMedida, setUnidadeMedida] = useState<Option[]>([]);
  let [isOpen, setIsOpen] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [codigoCliente, setCodigoCliente] = useState("");
  const [descricao, setDescricao] = useState("");
  const [um, setUm] = useState("");
  const [pesoBruto, setPesoBruto] = useState(0);
  const [pesoLiquido, setPesoLiquido] = useState(0);
  const [grupo, setGrupo] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);
  const [textModal , setTextModal] = useState("");
  const [rowClick, setRowClick] = useState(false);

  function getRowValues(item: ProdutoState): (string | number)[] {
    return [
      item.codigo,
      item.descricao,
      item.um,
      item.codigoCliente,
      item.pesoBruto,
      item.pesoLiquido,
      item.grupo,
      item.saldo,
    ];
  }

  const handleRowClick = (index: number) => {
    setRowClick(true);
    setSelectedRowIndex(index);
    const rowValues = getRowValues(data[index]);
    setProduto({
      codigo: rowValues[0].toString(),
      codigoCliente: rowValues[3].toString(),
      descricao: rowValues[1].toString(),
      um: rowValues[2].toString(),
      pesoBruto: Number(rowValues[4]),
      pesoLiquido: Number(rowValues[5]),
      grupo: rowValues[6].toString(),
      saldo: Number(rowValues[7]),
    });
    console.log(produto);
  };

  function closeModal() {
    setIsEdit(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function normalized(list: Array<string>): Array<Option> {
    return list.map((item) => {
      return { value: item, label: item };
    });
  }

  function setProdutoAtual(produto: ProdutoState){
    setCodigo(produto.codigo);
    setCodigoCliente(produto.codigoCliente);
    setDescricao(produto.descricao);
    setPesoBruto(produto.pesoBruto);
    setPesoLiquido(produto.pesoLiquido);
    setGrupo(produto.grupo);
    setUm(produto.um);
  }

  const navigate = useNavigate();

  const getGrupos = async () => {
    const token = userState.state.access_token;
    await axios
      .get(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto/grupo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: { data: { list: Array<string> } }) => {
        console.log(response.data.list);
        setGrupos(normalized(response.data.list));
      })
      .catch((error) => {
        console.log(error.response.data); // mensagem de erro
      });
  };

  const getUnidadeMedida = async () => {
    const token = userState.state.access_token;
    await axios
      .get(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto/um`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: { data: { list: Array<string> } }) => {
        console.log(response.data.list);
        setUnidadeMedida(normalized(response.data.list));
      })
      .catch((error) => {
        console.log(error.response.data); // mensagem de erro
      });
  };

  const fetchData = async () => {
    const token = userState.state.access_token;
    await axios
      .get(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto?offset=0&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: { data: { list: Array<string> } }) => {
        console.log(response.data);
        //setData(response.data.list);
      })
      .catch((error: { response: { data: any } }) => {
        console.log(error.response.data); // mensagem de erro
      });
  };

  const createProduto = async (produto: ProdutoState) => {
    const token = userState.state.access_token;
    const data = {
      codigoCliente: produto.codigoCliente,
      descricao: produto.descricao,
      um: produto.um,
      pesoBruto: produto.pesoBruto,
      pesoLiquido: produto.pesoLiquido,
      grupo: produto.grupo,
    };
    await axios
      .post(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data); // mensagem de erro
      });
  };


  const updateProduto = async (produto: ProdutoState) => {
    const token = userState.state.access_token;
    const data = {
      codigo: produto.codigo,
      codigoCliente: produto.codigoCliente,
      descricao: produto.descricao,
      um: produto.um,
      pesoBruto: produto.pesoBruto,
      pesoLiquido: produto.pesoLiquido,
      grupo: produto.grupo,
    };
    await axios
      .put(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data); // mensagem de erro
      });
  };

  const deleteProduto = async (produto: ProdutoState) => {
    const token = userState.state.access_token;
    await axios
      .delete(
        `https://tecadilabs.tecadi.com.br:8088/tecadi/treinamento/produto?codigo=${produto.codigo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data); // mensagem de erro
      });
  };


  useEffect(() => {
    if (userState.state.access_token === "") {
      navigate("/", { replace: true });
    } else {
      getGrupos();
      getUnidadeMedida();
    }
  }, []);
  useEffect(() => {
    if(produto.codigoCliente !== "" && !isEdit && !rowClick){
      data.push(produto);
    }
  }, [produto]);

  useEffect(() => {
    if(!isEdit){
      setCodigo("");
      setCodigoCliente("");
      setDescricao("");
      setGrupo("");
      setUm("");
      setPesoBruto(0);
      setPesoLiquido(0);
    }
  }, [isOpen]);

  useEffect(()=>{
    setTextModal(!isEdit ? "Cadastrar Produto" : `Editar Produto:${codigo}`);
  },[isEdit])

  return (
    <>
      <div className=" shadow-lg flex justify-center">
        <div className="mt-10 w-64 mb-10">
          <button
            type="button"
            onClick={openModal}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-200"
          >
            Cadastrar Produto
          </button>
        </div>
      </div>
      <div className=" shadow-lg ">
        <table className="w-full">
          <thead>
            <tr className="  grid grid-cols-10 mt-5 justify-items-center">
              <th>Código</th>
              <th>Descrição</th>
              <th>Unidade Medida</th>
              <th>Cod. Cliente</th>
              <th>Peso Bruto</th>
              <th>Peso Liquído</th>
              <th>Grupo</th>
              <th>Saldo</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {data ? (
            <tbody className="w-full">
              {data.map((item, index) => (
                <tr
                  className={`grid grid-cols-10 text-center justify-items-center ${
                    selectedRowIndex === index ? "bg-gray-300" : ""
                  }`}
                  key={item.codigo}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="m-3">{item.codigo}</td>
                  <td className="m-3">{item.descricao}</td>
                  <td className="m-3">{item.um}</td>
                  <td className="m-3">{item.codigoCliente}</td>
                  <td className="m-3">{item.pesoBruto}</td>
                  <td className="m-3">{item.pesoLiquido}</td>
                  <td className="m-3">{item.grupo}</td>
                  <td className="m-3">{item.saldo}</td>
                  <td className="m-3 cursor-pointer ">
                    {
                      <button
                        type="button"
                        className="px-4 py-2 text-white font-medium bg-cyan-700 hover:bg-cyan-600 rounded-md"
                        onClick={() =>{
                          setRowClick(false);
                          setIsEdit(true);
                          setProdutoAtual(produto);
                          openModal();
                        }}
                      >
                        Editar
                      </button>
                    }
                  </td>
                  <td className="m-3 cursor-pointer ">
                    {
                      <button
                        type="button"
                        className="px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 rounded-md"
                        onClick={() => {deleteProduto(produto)}}
                      >
                        Delete
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="float z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Overlay className="content-center inset-0 z-10 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-md shadow-md w-full sm:w-96">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-center mt-3"
                >
                  {textModal}
                </Dialog.Title>
                <form onSubmit={() => {}}>
                  <div className="p-4 grid grid-cols-2 gap-2">
                    <Input
                      error={false}
                      type="text"
                      id="cod_cliente"
                      label="Cód. Cliente"
                      value={codigoCliente}
                      onChange={(e) => {
                        setCodigoCliente(e.target.value);
                      }}
                    />
                    <Input
                      error={false}
                      id="descricao"
                      label="Descrição"
                      value={descricao}
                      onChange={(e) => {
                        setDescricao(e.target.value);
                      }}
                    />

                    <Input
                      error={false}
                      id="peso_bruto"
                      label="Peso bruto"
                      type="number"
                      value={pesoBruto}
                      onChange={(e) => {
                        if (e.target.valueAsNumber >= 0) {
                          setPesoBruto(e.target.valueAsNumber);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "Subtract") {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Input
                      error={false}
                      id="peso_liq"
                      label="Peso Liquído"
                      type="number"
                      value={pesoLiquido}
                      onChange={(e) => {
                        if (e.target.valueAsNumber >= 0) {
                          setPesoLiquido(e.target.valueAsNumber);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "Subtract") {
                          e.preventDefault();
                        }
                      }}
                    />

                    <Select
                      id="select"
                      label="Grupo"
                      data={grupos}
                      className="h-10 w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      selectedValue={grupo}
                      onSelectedValueChange={(value: string) => setGrupo(value)}
                    />
                    <Select
                      id="select"
                      label="Unidade de Medidas"
                      data={unidadeMedida}
                      className="h-10 w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                      selectedValue={um}
                      onSelectedValueChange={(value: string) => setUm(value)}
                    />
                  </div>
                  <div className="flex justify-center mb-5">
                    <button
                      type="button"
                      className="px-4 py-2 text-white font-medium bg-red-500 rounded-md"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      disabled={
                        codigoCliente === "" ||
                        descricao === "" ||
                        grupo === "" ||
                        um === ""
                      }
                      onClick={() => {
                        const newProduto: ProdutoState = {
                          codigo,
                          codigoCliente,
                          descricao,
                          um,
                          pesoBruto,
                          pesoLiquido,
                          grupo,
                          saldo,
                        };
                        console.log({isEdit});
                        isEdit ? updateProduto(newProduto): createProduto(newProduto)
                        setProduto(newProduto);
                        closeModal();
                      }}
                      className="px-4 py-2 ml-4 bg-blue-600 text-white rounded-md disabled:cursor-not-allowed disabled:bg-indigo-200"
                    >
                      Salvar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default Grid;
