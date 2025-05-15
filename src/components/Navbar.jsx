import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setAdmin(localStorage.getItem("admin"));
  }, []);

  const adminRoutes = [
    { path: "/encomendas", label: "Encomendas" },
    { path: "/cardapio", label: "Cardápio" },
    { path: "/dashboard", label: "Relatórios" },
  ];

  const clientRoutes = [
    { path: "/home", label: "Início" },
    { path: "/Cardapio", label: "Cardápio" },
    { path: "/pedidos", label: "Meus Pedidos" },
  ];

  const routes = admin ? adminRoutes : clientRoutes;

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout =() => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <nav className="relative w-full h-[20vh] bg-[#f5f5f5] shadow-[0_3px_4px_0_rgba(0,0,0,0.2)]">
      {/* Botão de login no canto superior direito */}
      <div className="absolute top-2 right-4">
        {user ? (
          <div className="flex flex-col items-end">
            <span className="text-[#702f26] font-semibold text-sm">
              {user}
            </span>
            <button
            onClick={handleLogout}
            className="bg-[#702f26] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#8e3a2d] transition"
          >
            Logout
          </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-[#702f26] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#8e3a2d] transition"
          >
            Entrar
          </button>
        )}
      </div>

      <div className="flex flex-col justify-between items-center w-full h-full">
        {/* Títulos */}
        <div className="flex flex-col justify-between items-center w-full h-[40%] mt-2.5">
          <h1 className="flex justify-center items-center text-[#702f26] w-full h-[15%] text-2xl font-bold">
            Cakes AriCroce
          </h1>
          <h3 className="flex justify-center items-center text-[#702f26] w-full h-[15%] text-lg">
            {admin ? "Painel Administrativo" : "Bolos para todos os momentos"}
          </h3>
        </div>

        {/* Navegação */}
        <div className="flex justify-center items-center w-full h-1/3 px-4 gap-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`flex justify-center items-center w-[30%] h-full font-bold text-[110%] text-[#702f26] cursor-pointer transition-all duration-500 ${
                location.pathname === route.path
                  ? "underline decoration-[#FFCC00]"
                  : "hover:bg-[#cacaca]"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
