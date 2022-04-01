import api from "./Api"

const getUsers = async () => {
    return await
        api.get('users')
}

const getByEmailAndPassword = async (email, password) => {
    return await
        api.get(`users?email=${email}&password=${password}`)
}

const create = async (data) => {
    return await
        api.post('users', data)
}

export default {
    getUsers,
    getByEmailAndPassword,
    create
}