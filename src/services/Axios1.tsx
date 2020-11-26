import axios from 'axios';
import authHeader from './auth-header';
 export async function get<T>(
    path: string
): Promise<T> {
    const { data } = await axios.get(path,{ headers: authHeader() });
    console.log(data)
    return data;
};
export async function put(path:string,params:null)
 {
    await axios.post(path,params,{ headers: authHeader() })
    .then(response=> { return response.data })
    .catch(error =>{ return error })
    
};

export async function delet(path:string)
 {
     await axios.delete(path,{ headers: authHeader() })
    .then(response=> { return response.data })
    .catch(error =>{ return error })
    
};