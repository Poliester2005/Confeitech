import { Routes, Route } from "react-router-dom";
import Cardapio from "./Pages/Cardapio";
import DetalhesBolo from "./Pages/DetalhesBolo";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Pedidos from "./Pages/Pedidos";
import Encomendas from "./Pages/Encomendas";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/detalhes" element={<DetalhesBolo />} />
        <Route path="/encomendas" element={<Encomendas />} />
      </Routes>
    </>
  );
}

export default App;
