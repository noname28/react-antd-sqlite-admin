import axios from "axios";
import base_api from "../base.api";

const api = axios.create({
    baseURL: base_api
})

export async function createUser(data){
    const resp = await api.post( base_api + '/management/origins', data)
    return resp.data
}

export async function getUsers() {
    const resp = await api.get(base_api + 'posts')
    return resp.data
}

export async function getUser(id){
    const resp = await api.get(base_api + '/posts/'+id)
    return resp.data
}

export async function checkUser(id,password){
    const resp = await api.get(base_api + 'posts?username='+id+'&password='+password)
    return resp.data
}

export async function updateUser(id, data){
    const resp = await api.put(base_api + '/management/origin/'+id, data)
    return resp.data
}

export async function deleteUser(id){
    const resp = await api.delete(base_api + '/management/origin/'+id)
    return resp.data
}
