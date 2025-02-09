import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🚀 MyApp
        </Link>
        <nav className="space-x-6 text-lg">
          <Link to="/" className="hover:underline">Inicio</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 shadow">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 shadow">
                Registrarse
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
