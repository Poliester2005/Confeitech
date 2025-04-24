import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
});

// Cadastro de usuário
export const cadastrarUsuario = async (dados) => {
  try {
    console.log(dados)
    const response = await api.post("/users", dados);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Erro ao cadastrar usuário.";
  }
};


export const loginUsuario = async (credenciais) => {
    try {
      const response = await api.get("/users");
      const usuarios = response.data;

      console.log(response.data)

      const usuario = usuarios.find(
        (u) => u.email === credenciais.email
      );

      if (!usuario) {
        throw "Usuário ou senha inválidos.";
      }

      return usuario; // ou salve em sessão/localStorage
    } catch (error) {
      throw error.response?.data || "Erro ao buscar usuário(s).";
    }
  };
  