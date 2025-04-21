/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { criarEncomenda } from "../services/EncomendaService"; // Importando o serviço

const DetalhesBolo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bolo } = location.state || {}; // Acessando o objeto completo do bolo

  const [dataRetirada, setDataRetirada] = useState("");

  // Se não encontrar o bolo no estado, exibe uma mensagem de erro
  if (!bolo) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 text-lg">Nenhum bolo selecionado.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-backGround text-white px-4 py-2 rounded-xl hover:bg-[#8e3a2d]"
        >
          Voltar
        </button>
      </div>
    );
  }

  // Função para registrar o pedido
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se o usuário está logado no localStorage
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      alert("Você precisa estar logado para fazer um pedido.");
      return;
    }

    try {
      // Chama o serviço para registrar o pedido
      const pedidoCriado = await criarEncomenda(bolo.id, usuarioId, dataRetirada);
      alert("Pedido realizado com sucesso!");
      navigate("/"); // Redireciona para a página principal após o sucesso
    } catch (error) {
      alert("Ocorreu um erro ao realizar o pedido.");
    }
  };

  return (
    <>
      <div className="bg-card h-screen">
        <NavBar />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={bolo.image}
              alt={bolo.name}
              className="w-full md:w-1/2 rounded-xl object-cover"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#702f26]">
                  {bolo.name}
                </h2>
                <p className="text-[#FFCC00] text-xl font-semibold mt-2">
                  {/* Verifique se bolo.price está disponível antes de usar toFixed */}
                  {bolo.price ? `R$ ${bolo.price.toFixed(2)}` : "Preço não disponível"}
                </p>
                <p className="mt-4 text-gray-700">
                  Este bolo é feito com ingredientes selecionados para garantir
                  o sabor e a qualidade.
                </p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-4"
              >
                <label className="text-[#702f26] font-semibold">
                  Escolha a data de retirada:
                </label>
                <input
                  type="date"
                  required
                  value={dataRetirada}
                  onChange={(e) => setDataRetirada(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                  type="submit"
                  className="bg-[#702f26] text-white px-4 py-2 rounded-xl hover:bg-[#8e3a2d] transition"
                >
                  Confirmar Pedido
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesBolo;
