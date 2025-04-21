import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_URL, 
});

// Cadastro de usuário
export const cadastrarUsuario = async (dados) => {
  try {
    const response = await api.post("/users", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao cadastrar usuário.";
  }
};

// Login de usuárioimport api from "../services/api";

export const loginUsuario = async (credenciais) => {
    try {
      const response = await api.get("/users");
      const usuarios = response.data;
  
      // Verifica se algum usuário tem o email e senha informados
      const usuario = usuarios.find(
        (u) => u.email === credenciais.email && u.senha === credenciais.senha
      );
  
      if (!usuario) {
        throw "Usuário ou senha inválidos.";
      }
  
      return usuario; // ou salve em sessão/localStorage
    } catch (error) {
      throw error.response?.data || "Erro ao buscar usuário(s).";
    }
  };
  