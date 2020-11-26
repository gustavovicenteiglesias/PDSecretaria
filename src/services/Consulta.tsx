import { useEffect, useState } from "react";
import { get } from "./Axios1";
import { Profesor , Profesores, Escuela} from "./tipos";

export const useGetProfe = () => {
    const [profes , setProfes ] = useState<Profesor[]>([]);
    const getData = async () => {
      const  {list} = await get<Profesores>('https://secretaria-educacion.herokuapp.com/api/profesor/all');
      setProfes(list)
      }
      useEffect(()=>{
        getData()
       
  },[]);
  
    return profes;
  }
  export const useGetEscuelas=()=>{
    const [esc,setEsc]=useState<Escuela>();
    const URLESC='https://secretaria-educacion.herokuapp.com/api/profesor/create';
    const getEscuela = async () => {
      const  {list} = await get(URLESC);
      setEsc(list)
      }
      useEffect(()=>{
        getEscuela()
       
  },[]);
  return  esc 
  }
