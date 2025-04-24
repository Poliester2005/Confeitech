import axios from 'axios';

// Criação da instância Axios com baseURL da variável de ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Criação de uma nova encomenda
export const criarEncomenda = async (boloId, usuarioId, dataRetirada, preco) => {
  const pedido = {
    bolo: boloId,
    user: parseInt(usuarioId),
    dataRetirada,
    preco,
    observacoes: "",
    peso: 2
  };
  
  try {
    const response = await api.post('/encomendas', pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar o pedido:", error.response?.data || error.message);
    throw new Error("Erro ao registrar o pedido.");
  }
};

export const buscarEncomendaUser = async (id) => {
  try {
    const response = await api.get(`/encomendas/user/${id}`);
    const encomenda = response.data;

  console.log(response)

    return encomenda
  } catch (error) {
    console.error("Erro ao buscar os Encomenda:", error.response?.data || error.message);
    throw new Error("Erro ao buscar os Encomenda.");
  }
};

export const buscarEncomenda = async () => {
  try {
    const response = await api.get('/encomendas');
    const encomendas = response.data;

    const pedidosPendentes = encomendas.filter(e => e.andamento === 'AGUARDANDO');
    const pedidosAceitos = encomendas.filter(e => e.andamento !== 'AGUARDANDO');

    return {
      pedidosPendentes,
      pedidosAceitos,
    };
  } catch (error) {
    console.error("Erro ao buscar as encomendas:", error.response?.data || error.message);
    throw new Error("Erro ao buscar as encomendas.");
  }
};




// Atualizar o status do pedido
export const atualizarAndamentoEncomenda = async (id, novoAndamento) => {
  try {
    const response = await api.patch(`/encomendas/${id}`, { andamentoEncomenda: novoAndamento });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o Encomenda ${id}:`, error.response?.data || error.message);
    throw new Error("Erro ao atualizar o Encomenda.");
  }
};

export const cancelarEncomendaLogica = async (id) => {
  try {
    // Aqui você altera o status da encomenda para "Cancelado" ou qualquer outro que defina como "deletado"
    const response = await api.patch(`/encomendas/${id}`, { andamentoEncomenda: "CANCELADA" });
    return response.data;
  } catch (error) {
    console.error(`Erro ao cancelar a encomenda com id ${id}:`, error.response?.data || error.message);
    throw new Error("Erro ao cancelar a encomenda.");
  }
};


// Aceitar pedido
export const aceitarEncomenda = async (id) => {
  return await atualizarAndamentoEncomenda(id, 'EM_PREPARO');
};

// Cancelar Encomenda
export const cancelarEncomenda = async (id) => {
  return await atualizarAndamentoEncomenda(id, 'CANCELADA');
};
