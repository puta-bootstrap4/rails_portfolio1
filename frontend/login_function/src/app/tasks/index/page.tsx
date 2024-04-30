'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';
import Mycomponent from '../mycomponent';
export default function TasksIndex(){
    const params = new URLSearchParams();
    const router = useRouter();
    const [error,setError] = useState('');
    const [tasks,setTasks] = useState<Task[]>([]);
    type Task = {
        id: number;
        name: string;
    };

    const handleGetTaskIndex = async() =>{

    try{
    const res = await axios.get("http://localhost:3001/tasks/index",{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
    });
    params.append("key1","仕事一覧を取得しました");

    setTasks(res.data)
    } catch(e:unknown){
        if(axios.isAxiosError(e)) {
            if (e.response) {
                if(e.response.status === 401){
                    params.append("key1","ログインしてください");
                    const href = `/?${params}`;
                    router.push(href);
                }else{
                    params.append("key1","仕事一覧を取得できませんでした");
                    const href = `/?${params}`;
                    router.push(href)
                }
            } else{
                params.append("key1","HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした");
                const href = `/?${params}`;
                router.push(href)
    
            }
          } else{
                params.append("key1","予期しないエラーが起こりました");
                const href = `/?${params}`;
                router.push(href)
    
          }

    }

    }
    useEffect(() => {
        handleGetTaskIndex();
    }, []);
    return(
        <>
        <div>
            
            <h1>Task List</h1>
            <Link href="/tasks/new">新規作成</Link>
            <ul>
                {tasks && tasks.map(task => (
                    <li key={task.id}>タスク名:{task.name}<Link href={`/tasks/${task.id}/show`}><button>詳細</button></Link><Link href="/tasks/destroy"><button>削除</button></Link></li>
                ))}
            </ul>
            {error && <p>{error}</p>}
            <Suspense fallback={<div>Loading...</div>}>
                <Mycomponent />
            </Suspense>
        </div>
        </>
    );
}
