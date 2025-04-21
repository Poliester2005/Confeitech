import React from "react";

const getStatusColor = (status) => {
  switch (status) {
    case "Em preparo":
      return "text-yellow-500";
    case "Pronto para retirada":
      return "text-green-600";
    case "Entregue":
      return "text-gray-500";
    default:
      return "text-black";
  }
};

const PedidoCard = ({ image, name, description, status, onDelete }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
      <img
        src={image}
        alt={name}
        className="w-full md:w-1/3 h-56 object-cover"
      />
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-2xl font-bold text-[#702f26] mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className={`font-semibold ${getStatusColor(status)} mb-4`}>
            Status: {status}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="self-end bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Excluir pedido
        </button>
      </div>
    </div>
  );
};

export default PedidoCard;
