import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import { register } from "../../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, password)
      .then(() => navigate("/login"))
      .catch(() => alert("Error en el registro"));
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-green-600">Registrarse</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-300" 
              type="text" placeholder="Nombre" 
              onChange={(e) => setName(e.target.value)} required 
            />
            <input 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-300" 
              type="email" placeholder="Correo" 
              onChange={(e) => setEmail(e.target.value)} required 
            />
            <input 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-green-300" 
              type="password" placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)} required 
            />
            <button 
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 transition-all" 
              type="submit"
            >
              Registrarse
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 hover:underline">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
