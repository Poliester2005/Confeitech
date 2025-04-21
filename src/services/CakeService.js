// src/services/boloService.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL da API no Vite
});

export const getBolos = async () => {
  try {
    const response = await api.get("/cake");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao buscar bolos.";
  }
};

export const addBolo = async (bolo) => {
  try {
    const response = await api.post("/cake", bolo);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao adicionar bolo.";
  }
};
