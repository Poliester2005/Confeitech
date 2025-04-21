import React, { useState } from 'react';
import { cadastrarUsuario } from '../services/AuthService'; // Importe a função do arquivo authService
import { Navigate } from 'react-router-dom';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    dataNascimento: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const buscarEndereco = async (cep) => {
    if (!cep || cep.length < 8) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        throw new Error('CEP inválido');
      }

      setFormData((prevData) => ({
        ...prevData,
        rua: data.logradouro,
        cidade: data.localidade,
      }));
    } catch (error) {
      setError(error.message);
      setFormData((prevData) => ({
        ...prevData,
        rua: '',
        cidade: '',
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Chama a função cadastrarUsuario passando os dados do form
      await cadastrarUsuario(formData);
      // Caso o cadastro seja bem-sucedido, você pode redirecionar o usuário ou limpar o formulário
      alert("Cadastro realizado com sucesso!");
      Navigate("/login");
    } catch (error) {
      setError(error || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-backGround min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-center text-3xl font-semibold text-baby-blue mb-6">Cadastro</h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            required
          />
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            required
          />
          <Input
            label="Senha"
            id="senha"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
          <Input
            label="Telefone"
            id="telefone"
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            required
          />
          <Input
            label="Data de Nascimento"
            id="dataNascimento"
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
          <Input
            label="CEP"
            id="cep"
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={() => buscarEndereco(formData.cep)}
            placeholder="Digite seu CEP"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <Input
            label="Rua"
            id="rua"
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            placeholder="Rua"
            readOnly
            required
          />
          <Input
            label="Número"
            id="numero"
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            placeholder="Número"
            required
          />
          <Input
            label="Cidade"
            id="cidade"
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder="Cidade"
            readOnly
            required
          />

          <button
            type="submit"
            className="w-full bg-button hover:bg-button text-white font-bold py-3 px-4 rounded-lg transition duration-300"
          >
            Cadastrar
          </button>

          {loading && <p className="text-blue-500 text-sm text-center mt-2">Carregando...</p>}
        </form>
      </div>
    </div>
  );
};

// Componente reaproveitável para inputs
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
