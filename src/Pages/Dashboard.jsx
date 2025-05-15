import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { getTexts } from "../services/TextService";

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchTexts = async () => {
      const texts = await getTexts();
      console.log(texts);
      setData(texts);
    };

    fetchTexts();
  }, []);

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#702f26] flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-[#f5f5f5] mb-10">Destaques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          <Card title="Bolo mais vendido" data={data.boloMaisVendido} />
          <Card title="Encomendas concluídas no último mês" data={data.qtdEncomendasConcluidasUltimoMes} />
          <Card title="Encomendas não aceitas na semana" data={data.qtdEncomendasNaoAceitasSemana} />
          <Card title="Total de encomendas no último mês" data={data.qtdEncomendasUltimoMes} />
        </div>
      </div>
    </>
  );
}

const Card = ({ title, data }) => {
  return (
    <div className="bg-white border border-[#f5f5f5] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-[#702f26] h-40 hover:scale-[1.02] transition-transform text-center">
      <h3 className="text-md font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{data ?? "Carregando..."}</p>
    </div>
  );
};

