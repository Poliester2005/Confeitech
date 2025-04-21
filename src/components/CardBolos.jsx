import React from "react";

const CardBolos = ({ image, name, price, onClick }) => {
  return (
    <div
      className="w-64 bg-[#fdf7f4] rounded-2xl shadow-lg hover:shadow-xl transition p-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-xl mb-4" />
      <h4 className="text-xl font-bold text-[#702f26]">{name}</h4>
      <p className="text-[#FFCC00] text-lg font-semibold">R$ {price.toFixed(2)}</p>
    </div>
  );
};

export default CardBolos;
