import axios from "axios";

const API_URL = ":https://universilandia-backend-24802697360.southamerica-west1.run.app/api/carrerasUniversitarias";

export async function getCarrerasUniversitarias() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/listar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.error || "Error al obtener las carreras";
    }
}

export async function getCarreraPorId(id: string) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/listar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.error || "Error al obtener la carrera";
  }
}
