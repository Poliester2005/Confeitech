/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { buscarEncomenda, aceitarEncomenda, cancelarEncomenda } from "../services/EncomendaService";

const Encomendas = () => {
  const navigate = useNavigate();

  const [pedidosPendentes, setPedidosPendentes] = useState([]);
  const [pedidosAceitos, setPedidosAceitos] = useState([]);
  const [tab, setTab] = useState("pendentes");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const { pedidosPendentes, pedidosAceitos } = await buscarEncomenda();
        setPedidosPendentes(pedidosPendentes);
        setPedidosAceitos(pedidosAceitos);
      } catch (error) {
        alert("Erro ao carregar os pedidos");
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Em preparação":
        return "text-yellow-500";
      case "Pronto para entrega":
        return "text-green-500";
      case "Cancelado":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleAceitarPedido = async (id) => {
    try {
      await aceitarEncomenda(id);
      window.location.reload(false);
    } catch (error) {
      alert("Erro ao aceitar o pedido");
    }
  };

  const handleCancelarPedido = async (id) => {
    try {
      await cancelarEncomenda(id);
      window.location.reload(false);
    } catch (error) {
      alert("Erro ao cancelar o pedido");
    }
  };

  const listaAtual = tab === "pendentes" ? pedidosPendentes : pedidosAceitos;

  return (
    <>
      <NavBar />

      <section className="w-full px-6 py-10 bg-card">
        <h2 className="text-3xl font-bold text-backGround mb-6 text-center">
          Encomendas
        </h2>

        {/* Abas de navegação */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setTab("pendentes")}
            className={`px-6 py-2 rounded-l-full border-y-2 border-l-2 ${
              tab === "pendentes" ? "bg-[#702f26] text-white" : "bg-white text-[#702f26]"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setTab("aceitos")}
            className={`px-6 py-2 rounded-r-full border-y-2 border-r-2 ${
              tab === "aceitos" ? "bg-[#702f26] text-white" : "bg-white text-[#702f26]"
            }`}
          >
            Aceitos
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando pedidos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listaAtual.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                Nenhum pedido {tab === "pendentes" ? "pendente" : "aceito"} no momento.
              </p>
            ) : (
              listaAtual.map((pedido) => (
                <div key={pedido.id} className="bg-white rounded-3xl shadow-xl p-6">
                  <img
                    src={pedido.image}
                    alt={pedido.bolo.nome}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-2xl font-bold text-[#702f26]">{pedido.bolo.nome}</h3>
                  <p className="text-lg text-gray-600">Cliente: {pedido.userDTO.nome}</p>
                  <p className="text-sm text-gray-500 mb-2">Pedido para: {pedido.dataRetirada}</p>

                  {tab === "aceitos" && (
                    <p className={`text-xl font-semibold ${getStatusColor(pedido.status)}`}>
                      {pedido.status}
                    </p>
                  )}

                  {tab === "pendentes" ? (
                    <div className="flex flex-col gap-2 mt-4">
                      <button
                        onClick={() => handleAceitarPedido(pedido.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                      >
                        Aceitar pedido
                      </button>
                      <button
                        onClick={() => handleCancelarPedido(pedido.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                      >
                        Cancelar pedido
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/detalhesEncomendas", { state: { pedido } })}
                      className="mt-4 bg-[#702f26] text-white px-6 py-2 rounded-xl hover:bg-[#8e3a2d] transition"
                    >
                      Ver detalhes
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Encomendas;
