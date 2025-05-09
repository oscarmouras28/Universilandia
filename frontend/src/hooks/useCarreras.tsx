import { useEffect, useState } from "react";
import { getCarrerasUniversitarias } from "../services/carreraAPI";

export function useCarreras() {
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const data = await getCarrerasUniversitarias();
        setCarreras(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarreras();
  }, []);

  return { carreras, loading, error };
}
