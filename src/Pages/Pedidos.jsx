import React, { useState } from "react";
import NavBar from "../components/Navbar";
import PedidoCard from "../components/PedidoCard";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      name: "Bolo de Chocolate",
      image: "https://source.unsplash.com/featured/?chocolate-cake",
      description: "Delicioso bolo de chocolate com recheio cremoso.",
      status: "Em preparo",
    },
    {
      id: 2,
      name: "Bolo Red Velvet",
      image: "https://source.unsplash.com/featured/?redvelvet-cake",
      description: "Clássico Red Velvet com cobertura de cream cheese.",
      status: "Pronto para retirada",
    },
    {
      id: 3,
      name: "Bolo de Morango",
      image: "https://source.unsplash.com/featured/?strawberry-cake",
      description: "Camadas de bolo branco com morangos frescos.",
      status: "Entregue",
    },
  ]);

  const handleDelete = (id) => {
    const confirm = window.confirm("Deseja realmente excluir este pedido?");
    if (confirm) {
      setPedidos(pedidos.filter((pedido) => pedido.id !== id));
    }
  };

  return (
    <>
      <NavBar />
      <section className="w-full px-6 py-10 bg-card min-h-screen">
        <h2 className="text-3xl font-bold text-backGround mb-8 text-center">Meus Pedidos</h2>
        <div className="flex flex-col gap-6 items-center">
          {pedidos.length === 0 ? (
            <p className="text-gray-600 text-lg">Você não tem pedidos no momento.</p>
          ) : (
            pedidos.map((pedido) => (
              <PedidoCard
                key={pedido.id}
                image={pedido.image}
                name={pedido.name}
                description={pedido.description}
                status={pedido.status}
                onDelete={() => handleDelete(pedido.id)}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Pedidos;
