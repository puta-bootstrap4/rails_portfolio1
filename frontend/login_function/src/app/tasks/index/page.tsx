'use client';
import { headers } from "next/headers";
import axios, { AxiosError } from 'axios';
import React,{ useState } from "react";
import { useRouter } from "next/navigation";


export default function tasksindex(){
    const handleGetTaskIndex = async(event:React.FormEvent<HTMLFormElement>) =>{
    const router = useRouter();
    const [error,setError] = useState('');
    const [successmsg,setSuccessmsg] = useState('');
    try{
    const response = await axios.get("http://localhost:3001/tasks/index",{
    headers:{
        Authorization: 'Bearer ${token}'
    }
    });
    const tasks = response.data
    } catch(e:unknown){
        if(axios.isAxiosError(error)) {
            if (error.response) {
              setError('仕事一覧を取得できませんでした');
              setSuccessmsg('');
              router.push("/")
    
            } else{
              setError('HTTPリクエストが正常に送信されたが、レスポンスが受信されませんでした');
              setSuccessmsg('');
              router.push("/")
    
            }
          } else{
            setError('予期しないエラーが起こりました');
            setSuccessmsg('');
            router.push("/")
    
          }
    }
    }
}