import { Button } from "@/components/ui/button";
import { useLocation } from "@/lib/utils";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">Página no encontrada</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Volver al inicio
      </Button>
    </div>
  );
}
