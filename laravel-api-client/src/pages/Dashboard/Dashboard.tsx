import Header from "../../components/ui/Header";
import { useAuth } from "../../hooks/useAuth";


const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
          <p className="text-gray-700 mt-2">
            Bienvenido, <span className="font-bold">{user?.name}</span>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Aquí puedes ver tu información y acceder a tus datos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
