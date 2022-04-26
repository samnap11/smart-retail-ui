import axios from 'axios';
import { CreateUserRequest } from '../interface/user';

const baseUrl = 'http://localhost:8080/'

export const createUserApi = async (payload: CreateUserRequest):Promise<any> =>{
    const { data } = await axios.post(baseUrl+'users', payload)
    return data
}