import { Routes, Route } from "react-router-dom";
import Cardapio from "./Pages/Cardapio";
import DetalhesBolo from "./Pages/DetalhesBolo";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Pedidos from "./Pages/Pedidos";
import Encomendas from "./Pages/Encomendas";
import DetalhesEncomenda from "./Pages/DetalhesEncomenda";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/detalhes" element={<DetalhesBolo />} />
        <Route path="/encomendas" element={<Encomendas />} />
        <Route path="/detalhesEncomendas" element={<DetalhesEncomenda/>}/>
      </Routes>
    </>
  );
}

export default App;
