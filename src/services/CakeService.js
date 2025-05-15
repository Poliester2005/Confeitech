import axios from "axios";

// Criação da instância do Axios com a URL base vinda do .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Função para buscar os bolos
export const getBolos = async () => {
  try {
    const response = await api.get('/cakes');
    console.log(import.meta.env.VITE_API_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao buscar bolos.";
  }
};

// Função para adicionar um novo bolo
export const addBolo = async (bolo) => {
  try {
    const response = await api.post('/cakes', bolo);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao adicionar bolo.";
  }
};

// Função para deletar um bolo por ID
export const deleteBolo = async (id) => {
  try {
    const response = await api.delete(`/cakes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao deletar bolo.";
  }
};
