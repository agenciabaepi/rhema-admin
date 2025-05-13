import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

export default function Sidebar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItem = (to: string, label: string) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)} // fecha menu ao navegar
      className={`block px-4 py-2 rounded hover:bg-blue-100 ${
        pathname === to ? "bg-blue-200 font-bold" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* Botão menu mobile */}
      <div className="md:hidden p-4">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen overflow-y-auto w-64 bg-gray-100 shadow-md p-4 z-50
          transition-transform transform
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-2xl font-bold mb-6">Painel Rhema</h2>
        <nav className="space-y-2">
          {navItem("/", "Notificações")}
        </nav>
      </div>
                {/* Overlay escuro para fechar o menu mobile */}
          {menuOpen && (
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            />
          )}
    </>
  );
}