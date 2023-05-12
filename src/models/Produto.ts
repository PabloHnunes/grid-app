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

class Produto {
  state: ProdutoState = {
    codigo : "",
    codigoCliente : "",
    descricao: "",
    um: "",
    pesoBruto: 0,
    pesoLiquido: 0,
    grupo: "",
    saldo: 0,
  };

  constructor() {}

  setState(newState: Partial<ProdutoState>) {
    this.state = { ...this.state, ...newState };
  }
}

export default Produto;