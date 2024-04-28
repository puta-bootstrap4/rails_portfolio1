'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';

export default function TasksIndex(){
    const router = useRouter();
    function MyComponent(){
        const query = useSearchParams();
        const key1 = query.get('key1');
        return(
        <>
              {key1 && <p>{key1}</p>}
      
        </>
        );
      }
    const [error,setError] = useState('');
    const [tasks,setTasks] = useState<Task[]>([]);
    type Task = {
        id: number;
        name: string;
        description: string;
    };

    const handleGetTaskIndex = async() =>{

    try{
    const res = await axios.get("http://localhost:3001/tasks/index",{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
    });
    setTasks(res.data)
    } catch(e:unknown){
        if(axios.isAxiosError(e)) {
            if (e.response) {
              setError('仕事一覧を取得できませんでした');
              router.push("/")
    
            } else{
              setError('HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした');
              router.push("/")
    
            }
          } else{
            setError('予期しないエラーが起こりました');
            router.push("/")
    
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
                    <li key={task.id}>タスク名:{task.name}説明:{task.description}<Link href="/tasks/show"><button>詳細</button></Link><Link href="/tasks/show"><button>削除</button></Link></li>
                ))}
            </ul>
            {error && <p>{error}</p>}
            <Suspense fallback={<div>Loading...</div>}>
                <MyComponent />
            </Suspense>
        </div>
        </>
    );
}
