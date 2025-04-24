import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import PedidoCard from "../components/PedidoCard";
import {
  buscarEncomendaUser,
  cancelarEncomendaLogica,
} from "../services/EncomendaService"; // importe seu service

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const usuarioId = localStorage.getItem("usuarioId"); // <- Substitua isso com o ID real do usuário logado (ex: via contexto ou localStorage)

  useEffect(() => {
    const carregarPedidos = async () => {
      try {
        const pedidosAPI = await buscarEncomendaUser(usuarioId);
        setPedidos(pedidosAPI);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarPedidos();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja realmente excluir este pedido?");
    if (confirm) {
      cancelarEncomendaLogica(id);
    }
  };

  return (
    <>
      <NavBar />
      <section className="w-full px-6 py-10 bg-card min-h-screen">
        <h2 className="text-3xl font-bold text-backGround mb-8 text-center">
          Meus Pedidos
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Carregando pedidos...</p>
        ) : localStorage.getItem("usuarioId") === null ? (
          <p className="text-gray-600 text-lg text-center">
            Você precisa estar logado
          </p>
        ) : pedidos.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">
            Você não tem pedidos no momento.
          </p>
        ) : (
          <div className="flex flex-col gap-6 items-center">
            {pedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                image={
                  pedido.image || "https://source.unsplash.com/featured/?cake"
                } // fallback
                name={pedido.bolo.nome || "Bolo"}
                description={pedido.bolo.descricao || "Sem descrição"}
                status={pedido.andamento || "Status desconhecido"}
                onDelete={() => handleDelete(pedido.id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Pedidos;
