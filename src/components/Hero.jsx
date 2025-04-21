import { Link } from 'react-router-dom'; // Importar o Link
import bolo from './../assets/bolo.png'; // Caminho relativo para a imagem

export default function Hero() {
  return (
    <div
      className="relative h-screen w-full flex flex-col items-start justify-center px-10"
      style={{
        backgroundImage: `url(${bolo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Conteúdo por cima da imagem e overlay */}
      <div className="relative bg-transparent h-1/2 w-1/3 flex flex-col items-start justify-center ml-44 mt-10">
        <h1 className="text-lg font-bold bg-button text-black p-2 text-center drop-shadow-lg rounded">
          DEDICAÇÃO, SABOR E QUALIDADE
        </h1>
        <p className="text-lg text-white drop-shadow-lg"> Ari's Cake Confeitaria </p>
        <p className="text-white text-regular my-4 drop-shadow-lg">
          Bolos artesanais feitos com carinho e ingredientes selecionados,
          transformando momentos especiais em memórias inesquecíveis. Com uma
          tradição de excelência, trazemos para a mesa o sabor perfeito para
          cada ocasião.
        </p>
        <Link to="/Login" className="text-black bg-button p-2 w-1/2 rounded font-bold text-center drop-shadow-lg text-center">
          Ver cardápio
        </Link>
      </div>
    </div>
  );
}
