import api from "./Api"

const getAllValues = async (user_id) => {
    return await
        api.get(`values?user_id=${user_id}`)
}

const register = async (data) => {
    return await
        api.post('values', data)
}

const deleteItem = async (id) => {
    return await
        api.delete(`values/${id}`)
}

const searchByDescription = async (user_id, desc) => {
    return await
        api.get(`values?user_id=${user_id}&description_like=${desc}`)
}

const filters = async (query) => {
    console.log(query)
    return await
        api.get(`values${query}`)
}

const getById = async (id) => {
    return await
        api.get(`values/${id}`)
}

const edit = async (id, data) => {
    return await
        api.put(`values/${id}`, data)
}

export default {
    getAllValues,
    register,
    deleteItem,
    searchByDescription,
    filters,
    getById,
    edit
}