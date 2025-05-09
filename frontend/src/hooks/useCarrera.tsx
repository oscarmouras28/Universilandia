import { useEffect, useState } from "react";
import { getCarreraPorId } from "../services/carreraAPI";

export function useCarrera(id: string) {
  const [carrera, setCarrera] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarrera = async () => {
      try {
        const data = await getCarreraPorId(id);
        setCarrera(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarrera();
  }, [id]);

  return { carrera, loading, error };
}
