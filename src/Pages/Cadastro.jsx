import React, { useState } from 'react';
import { cadastrarUsuario } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    dtNasc: '',
    cep: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await cadastrarUsuario(formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Correção aqui: useNavigate() ao invés de Navigate()
    } catch (error) {
      setError(error.message || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-backGround min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-center text-3xl font-semibold text-baby-blue mb-6">Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <Input label="Nome" id="nome" type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          <Input label="Email" id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Senha" id="senha" type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          <Input label="Telefone" id="telefone" type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
          <Input label="Data de Nascimento" id="dtNasc" type="date" name="dtNasc" value={formData.dtNasc} onChange={handleChange} required />
          <Input label="CEP" id="cep" type="text" name="cep" value={formData.cep} onChange={handleChange} required />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button type="submit" className="w-full bg-button hover:bg-button text-white font-bold py-3 px-4 rounded-lg transition duration-300">
            Cadastrar
          </button>

          {loading && <p className="text-blue-500 text-sm text-center mt-2">Carregando...</p>}
        </form>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-button font-medium mb-2" htmlFor={props.id}>
      {label}
    </label>
    <input
      {...props}
      className="w-full px-4 py-3 border border-button rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-tiffany-blue focus:border-transparent"
    />
  </div>
);

export default Cadastro;
