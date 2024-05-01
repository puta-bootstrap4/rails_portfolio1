'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';
import Mycomponent from '../../mycomponent'

export default function TasksShow ({ params }: { params: { id: string } }){
    const param = new URLSearchParams();
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    type Task = {
 
            id: number;
            name: string;
            description: string;
            endoryet: boolean
            created_at: Date;
            updated_at: Date;
            user_id: number;
    };
        

    const handleGetTaskShow= async() =>{
        //strongparameterはユーザーから受け取ったデータを直接モデルに渡す場合に重要です。
        
        try{
        const res = await axios.get(`http://localhost:3001/tasks/${params.id}/show`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        });
        setTask(res.data)
        } catch(e:unknown){
            if(axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 401){
                        param.append("key1","ログインしてください");
                        const hreftop = `/?${param}`;
                        router.push(hreftop);
                    }
                    else{
                        param.append("key1","詳細を取得できませんでした");
                        const href = `/tasks/index?${param}`;
                        router.push(href);
                    }
                } else{
                    param.append("key1","HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした");
                    const href = `/tasks/index?${param}`;
                    router.push(href);
        
                }
              } else{
                    param.append("key1","予期しないエラーが起こりました");
                    const href = `/tasks/index?${param}`;
                    router.push(href);
        
              }
    
        }
    
        }
        useEffect(() =>{
            handleGetTaskShow();
        },[]);
    return (
        <>
            <div>
            {task ? (
                <div>
                    <h1>{task.name}</h1>
                    <p>{task.description}</p>
                </div>
            ) : (
                <p>Loading task details...</p>
            )}
        </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Mycomponent />
            </Suspense>
        
        </>

    );
}