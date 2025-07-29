import axios from 'axios'

const API_URL = "https://universilandia-backend-24802697360.southamerica-west1.run.app/api/users";

export async function loginUser(correo: string, password: string) {
    try {
        const response = await axios.post(`${API_URL}/login`, {correo, password});
        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error.response?.data?.error || "Error al iniciar sesión";
    }
}