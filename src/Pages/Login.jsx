import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/AuthService"; // Importe a função de login

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Chama a função loginUsuario com as credenciais do formulário
      const usuario = await loginUsuario(formData);

      if (usuario.id === 1){
        localStorage.setItem("admin", true)
      }
      localStorage.setItem("user", usuario.nome);
      localStorage.setItem("usuarioId", usuario.id);

      navigate("/home"); // Substitua "/home" com o caminho que deseja redirecionar após o login
    } catch (error) {
      setError(error || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-rosa min-h-screen flex items-center justify-center">
      {/* Container de Login */}
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        {/* Cabeçalho */}
        <h1 className="text-center text-3xl font-semibold text-baby-blue mb-8">
          Acesse sua conta
        </h1>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit}>
          {/* Campo de E-mail */}
          <div className="mb-6">
            <label
              className="block text-lavender font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-lavender rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-babtext-baby-blue focus:border-transparent"
              placeholder="Digite seu email"
              required
            />
          </div>

          {/* Campo de Senha */}
          <div className="mb-8">
            <label
              className="block text-lavender font-medium mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-lavender rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-babtext-baby-blue focus:border-transparent"
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Erro */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full bg-baby-blue hover:bg-bubblegum-pink text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        {/* Link de Registro */}
        <p className="text-center text-gray-500 mt-6">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-baby-blue hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
