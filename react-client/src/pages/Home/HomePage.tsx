import Header from "../../components/ui/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
        <h1 className="text-5xl font-bold text-blue-700">Bienvenido a MyApp 🚀</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-lg">
          Una aplicación moderna con autenticación segura basada en JWT. 
          Regístrate y accede a funcionalidades avanzadas.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/login" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700">
            Iniciar Sesión
          </a>
          <a href="/register" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-700">
            Registrarse
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
