'use client';
import { headers } from "next/headers";
import axios, { AxiosError } from 'axios';


export default function tasksindex(){
    const handleGetTaskIndex = async(event:React.FormEvent<HTMLFormElement>) =>{
    try{
    const response = await axios.get("https://localhost:3001/tasks/index",{
    headers:{
        Authorization: 'Bearer ${token}'
    }
    });
    } catch(e:unknown){
        
    }
    }
}