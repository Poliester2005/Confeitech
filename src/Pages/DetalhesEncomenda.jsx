/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { atualizarAndamentoEncomenda } from "../services/EncomendaService";

const DetalhesEncomenda = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedido } = location.state || {};

  const [statusAtual, setStatusAtual] = useState(pedido?.andamento || "");
  const [modalAberta, setModalAberta] = useState(false);

  if (!pedido) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 text-lg">Nenhuma encomenda selecionada.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-backGround text-white px-4 py-2 rounded-xl hover:bg-[#8e3a2d]"
        >
          Voltar
        </button>
      </div>
    );
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const handleStatusChange = (e) => {
    const novoStatus = e.target.value;
    setStatusAtual(novoStatus);
  };

  const salvarStatus = () => {
    atualizarAndamentoEncomenda(pedido.id, statusAtual);
    setModalAberta(false);
  };

  return (
    <>
      <div className="bg-card min-h-screen">
        <NavBar />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
          <h2 className="text-3xl font-bold text-[#702f26] mb-6 text-center">Detalhes da Encomenda</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#702f26] mb-2">{pedido.bolo.nome}</h3>
              <p className="text-[#FFCC00] text-xl font-semibold mb-2">R$ {pedido.preco.toFixed(2)}</p>
              <p className="text-gray-700 mb-2"><strong>Descrição:</strong> {pedido.bolo.descricao}</p>
              <p className="text-gray-700 mb-2"><strong>Peso:</strong> {pedido.peso} kg</p>
              <p className="text-gray-700 mb-2"><strong>Observações:</strong> {pedido.observacoes || "Nenhuma"}</p>
              <p className="text-gray-700 mb-2"><strong>Status:</strong> {statusAtual}</p>
              <p className="text-gray-700 mb-2"><strong>Data de Criação:</strong> {formatarData(pedido.dataCriacao)}</p>
              <p className="text-gray-700 mb-2"><strong>Data de Retirada:</strong> {formatarData(pedido.dataRetirada)}</p>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#702f26] mb-4">Cliente</h3>
              <p className="text-gray-700 mb-2"><strong>Nome:</strong> {pedido.userDTO.nome}</p>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {pedido.userDTO.email}</p>
              <p className="text-gray-700 mb-2"><strong>Telefone:</strong> {pedido.userDTO.telefone}</p>
              <p className="text-gray-700 mb-2"><strong>Data de Nascimento:</strong> {formatarData(pedido.userDTO.dtNasc)}</p>
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#702f26] text-white px-4 py-2 rounded-xl hover:bg-[#8e3a2d] transition"
            >
              Voltar
            </button>
            <button
              onClick={() => setModalAberta(true)}
              className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
            >
              Editar Status
            </button>
          </div>
        </div>
      </div>

      {modalAberta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-[#702f26]">Editar Status da Encomenda</h3>
            <select
              value={statusAtual}
              onChange={handleStatusChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            >
              <option value="AGUARDANDO">AGUARDANDO</option>
              <option value="PRONTA">PRONTA</option>
              <option value="CANCELADA">CANCELADA</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalAberta(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={salvarStatus}
                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetalhesEncomenda;
