import http from "../http-common";

const baseURL = "https://localhost:7142/api/Government";

export const createGovernment = async (data) => {
    try {
        const postData = {
            name: data.name,
            description: data.description,
        };
        const response = await http.post(baseURL, postData);
        return response.status === 201;
    } catch (error) {
        console.error("Error al agregar Government:", error.message);
        throw new Error("Error al agregar Government");
    }
};

export const getGovernments = async () => {
    try {
        const response = await http.get(baseURL);
        if (response.status === 200) {
            return response.data
                .map((item) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                }))
                .sort((a, b) => b.id - a.id); // Ordenar por ID descendente.
        }
        throw new Error("Error en la respuesta al obtener Governments");
    } catch (error) {
        console.error("Error al obtener Governments:", error.message);
        throw new Error("Error al obtener Governments");
    }
};

export const getGovernment = async (id) => {
    try {
        const response = await http.get(`${baseURL}/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Error en la respuesta al obtener Government");
    } catch (error) {
        console.error("Error al obtener Government:", error.message);
        throw new Error("Error al obtener Government");
    }
};

export const updateGovernment = async (data) => {
    try {
        const response = await http.put(`${baseURL}/${data.id}`, data);
        return response.status === 200;
    } catch (error) {
        console.error("Error al actualizar Government:", error.message);
        throw new Error("Error al actualizar Government");
    }
};

export const removeGovernment = async (id) => {
    try {
        const response = await http.delete(`${baseURL}/${id}`);
        return response.status === 204;
    } catch (error) {
        console.error("Error al eliminar Government:", error.message);
        throw new Error("Error al eliminar Government");
    }
};
