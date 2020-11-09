import { useEffect, useState } from "react";
import { get } from "./Axios1";
import { Profesor , Profesores, Escuela} from "./tipos";

export const useGetProfe = () => {
    const [profes , setProfes ] = useState<Profesor[]>([]);
    const getData = async () => {
      const  {list} = await get<Profesores>('http://secretaria-deportes.herokuapp.com/api/profesor/all');
      setProfes(list)
      }
      useEffect(()=>{
        getData()
       
  },[]);
  
    return profes;
  }