import { Link } from "react-router-dom";
import confeitera from "../assets/confeiteria.jpg";

export default function QuemSomos() {
  return (
    <div className="flex bg-slate-100 items-center justify-center space-x-14">
      <div className="relative bg-transparent h-1/2 w-1/3 flex flex-col items-start justify-center  my-10">
        <h1 className="text-3xl font-bold my-2 text-blacktext-center drop-shadow-lg">
          Quem somos?
        </h1>
        <p className="bg-button text-lg p-2 text-black drop-shadow-lg">
          6 ANOS FAZENDO HISTORA
        </p>
        <p className="text-black text-regular my-4 drop-shadow-lg">
          Há 6 anos no mercado, a Ari's Cake Confeitaria se destaca na criação
          de bolos personalizados e temáticos, especialmente para festas
          infantis. Promovemos experiências únicas, sempre com foco na qualidade
          artesanal e na satisfação de nossos clientes
        </p>
        <Link
          to="/Login"
          className="text-black bg-button p-2 w-1/2 rounded font-bold text-center drop-shadow-lg text-center"
        >
          Encomendar
        </Link>
      </div>
      <img src={confeitera} className=" w-1/6 rounded-full" alt="" />
    </div>
  );
}
