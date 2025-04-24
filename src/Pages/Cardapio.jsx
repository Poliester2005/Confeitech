import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import CardBolos from "../components/CardBolos";
import { getBolos, addBolo } from "../services/CakeService";

const Cardapio = () => {
  const navigate = useNavigate();

  const [bolos, setBolos] = useState([]);
  const [error, setError] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [newBolo, setNewBolo] = useState({ name: "", price: "", image: "" });

  const isAdmin = localStorage.getItem("admin");

  useEffect(() => {
    const fetchBolos = async () => {
      try {
        const bolosData = await getBolos();
        setBolos(bolosData);
      } catch (error) {
        setError(error || "Erro ao carregar bolos.");
      }
    };

    fetchBolos();
  }, []);

  const destaque = bolos[0];
  const outros = bolos.slice(1);

  const addNewBolo = async () => {
    try {
      const novoBolo = {
        nome: newBolo.name,
        preco: parseFloat(newBolo.price),
        descricao: newBolo.description,
        adicionais: [],
      };
      const boloAdicionado = await addBolo(novoBolo);
      setBolos([...bolos, boloAdicionado]);
      setNewBolo({ name: "", price: "", image: "" });
      setModalAberto(false);
    } catch (error) {
      setError(error || "Erro ao adicionar bolo.");
    }
  };

  return (
    <>
      <NavBar />

      {isAdmin && (
        <div className="w-full flex justify-end px-6 pt-6 bg-card">
          <button
            onClick={() => setModalAberto(true)}
            className="bg-button text-white px-4 py-2 rounded-lg hover:bg-backGround transition"
          >
            + Adicionar Bolo
          </button>
        </div>
      )}

      {/* Destaque da Semana */}
      <section className="w-full px-6 py-10 flex flex-col items-center bg-card">
        <h2 className="text-3xl font-bold text-backGround mb-6">
          Destaque da Semana
        </h2>
        {destaque ? (
          <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl">
            <img
              src={destaque.image}
              alt={destaque.nome}
              className="w-full md:w-1/2 h-80 object-cover"
            />
            <div className="p-6 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3">
              <h3 className="text-2xl font-bold text-[#702f26]">
                {destaque.nome}
              </h3>
              <p className="text-[#FFCC00] text-xl font-semibold">
                R${" "}
                {typeof destaque?.preco === "number"
                  ? destaque.preco.toFixed(2)
                  : "0.00"}
              </p>

              <p className="text-gray-600">{destaque.descricao}</p>
              <button
                onClick={() =>
                  navigate("/detalhes", { state: { bolo: destaque } })
                }
                className="mt-4 bg-[#702f26] text-white px-6 py-2 rounded-xl hover:bg-[#8e3a2d] transition"
              >
                Ver mais
              </button>
            </div>
          </div>
        ) : (
          <p>Carregando destaque...</p>
        )}
      </section>

      {/* Lista de outros bolos */}
      <section className="w-full px-6 py-10 bg-white">
        <h2 className="text-2xl font-bold text-button mb-6 text-center">
          Outros Bolos
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Array.isArray(outros) && outros.length > 0 ? (
            outros.map((bolo) => (
              <CardBolos
                key={bolo.id}
                image={bolo.image}
                name={bolo.nome}
                price={bolo.preco}
                onClick={() => navigate("/detalhes", { state: { bolo } })}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Nenhum bolo disponível.</p>
          )}
        </div>
      </section>

      {/* Modal para adicionar novo bolo */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setModalAberto(false)}
              className="absolute top-2 right-4 text-gray-500 text-xl hover:text-red-500"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#702f26] mb-4">
              Adicionar Novo Bolo
            </h2>
            <input
              type="text"
              placeholder="Nome do Bolo"
              value={newBolo.name}
              onChange={(e) => setNewBolo({ ...newBolo, name: e.target.value })}
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-4"
            />
            <input
              type="number"
              placeholder="Preço"
              value={newBolo.price}
              onChange={(e) =>
                setNewBolo({ ...newBolo, price: e.target.value })
              }
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-4"
            />
            <textarea
              placeholder="Descrição do Bolo"
              value={newBolo.description}
              onChange={(e) =>
                setNewBolo({ ...newBolo, description: e.target.value })
              }
              className="w-full p-2 border-2 border-gray-300 rounded-lg mb-4 resize-none"
              rows={4}
            />
            <button
              onClick={addNewBolo}
              className="w-full bg-[#702f26] text-white px-6 py-2 rounded-xl hover:bg-[#8e3a2d] transition"
            >
              Adicionar Bolo
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cardapio;
