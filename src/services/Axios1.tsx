import axios from 'axios';
import authHeader from './auth-header';
 export async function get<T>(
    path: string
): Promise<T> {
    const { data } = await axios.get(path,{ headers: authHeader() });
    console.log(data)
    return data;
};