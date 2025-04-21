import fundoBolo from './../assets/fundoBolo.jpg'; // Caminho relativo para a imagem

export default function Diferencal() {
  return (
    <div
      className="flex bg-slate-100 flex-row-reverse items-center h-4/6 w-full relative"
      style={{
        backgroundImage: `url(${fundoBolo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative bg-card h-full w-1/3 flex flex-col items-start justify-center my-10 mr-24 rounded p-4">
        <h1 className="text-3xl font-bold my-2 text-white text-center drop-shadow-lg">
          O Diferencial
        </h1>
        <p className="bg-button text-lg p-2 text-black drop-shadow-lg">
          6 ANOS FAZENDO HISTÓRIA
        </p>
        <p className="text-white text-regular my-4 drop-shadow-lg">
          Há 6 anos no mercado, a Ari's Cake Confeitaria se destaca na criação
          de bolos personalizados e temáticos, especialmente para festas
          infantis. Promovemos experiências únicas, sempre com foco na qualidade
          artesanal e na satisfação de nossos clientes.
        </p>
        <p className="text-black bg-button p-2 w-1/2 rounded font-bold text-center drop-shadow-lg">
          Saiba Mais
        </p>
      </div>
    </div>
  );
}
