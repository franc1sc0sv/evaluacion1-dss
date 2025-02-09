import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../api/auth";
import { getUser } from "../../api/user";
import Header from "../../components/ui/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password)
      .then((token) => {
        localStorage.setItem("token", token);
        return getUser();
      })
      .then(setUser)
      .then(() => navigate("/dashboard"))
      .catch(() => alert("Error en el login"));
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-blue-600">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" 
              type="email" placeholder="Correo" 
              onChange={(e) => setEmail(e.target.value)} required 
            />
            <input 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" 
              type="password" placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)} required 
            />
            <button 
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-all" 
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
