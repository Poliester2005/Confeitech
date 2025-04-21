import axios from 'axios';

// Recuperar a URL da API a partir da variável de ambiente
const API_URL = import.meta.env.API_URL;

// Criação de encomenda
export const criarEncomenda = async (boloId, usuarioId, dataRetirada) => {
  const pedido = {
    boloId,
    usuarioId,
    dataCriacao: new Date().toISOString(), // Data de criação
    dataRetirada, // Data de retirada
    andamento: 'AGUARDANDO', // Status inicial do pedido
  };

  try {
    // Envia a requisição para a API
    const response = await axios.post(`${API_URL}/encomendas`, pedido);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar o pedido:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

export const buscarPedidos = async () => {
  try {
    // Requisição para obter todos os pedidos da API
    const response = await axios.get(`${API_URL}/pedidos`);
    
    // Filtra os pedidos com o status 'AGUARDANDO'
    const pedidos = response.data;

    const pedidosPendentes = pedidos.filter((pedido) => pedido.andamento === 'AGUARDANDO');
    const pedidosAceitos = pedidos.filter((pedido) => pedido.andamento !== 'AGUARDANDO');

    return { pedidosPendentes, pedidosAceitos };
  } catch (error) {
    console.error("Erro ao buscar os pedidos:", error);
    throw error; // Propaga o erro para ser tratado no componente
  }
};

// Função para aceitar um pedido
export const aceitarPedido = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/pedidos/${id}`, { andamento: 'Pronto para entrega' });
    return response.data;
  } catch (error) {
    console.error("Erro ao aceitar o pedido:", error);
    throw error;
  }
};

// Função para cancelar um pedido
export const cancelarPedido = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/pedidos/${id}`, { andamento: 'Cancelado' });
    return response.data;
  } catch (error) {
    console.error("Erro ao cancelar o pedido:", error);
    throw error;
  }
};

