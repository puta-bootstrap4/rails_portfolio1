'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';
import Mycomponent from '../../mycomponent'

import { Button, Grid } from '@mui/material';
import top from '../../../../../public/images/top.jpeg';


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
        

    const handleGetTaskShow = async() =>{

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
    return (        <>

        <style jsx>{`
            @media (min-width: 768px) { 
              .topmargin{
                height:200px;
              }
              .button1{
                display:inline-block;
                margin-right:20px;
              }
              .button2{
                display:inline-block;
                margin-left:20px;
              }
              .item{
                font-size:20px;
                margin-top:60px;
                text-align:center;
              }
              .topimage {
                height: 800px;
                background-size: cover;
                background-position: center;
                margin-top:50px;
                margin-left:50px;
                margin-right:50px;
              }
            }
             @media (max-width: 767px) { 
              .topmargin{
                height:200px;
              }
              .button1{
                display:inline-block;
                margin-right:20px;
              }
              .button2{
                display:inline-block;
                margin-left:20px;
              }
              .item{
                font-size:20px;
                margin-top:60px;
                text-align:center;
              }
              .topimage {
                height: 800px;
                background-size: cover;
                background-position: center;
                margin-top:50px;
                margin-left:50px;
                margin-right:50px;
              }
            }
    `}</style>
        
            <div className="topimage" style={{ backgroundImage: `url(${top.src})` }}>
                <div className='topmargin'>

                </div>
            {task ? (
                <div>
                    <p className='item'>仕事名:{task.name}</p>
                    <p className='item'>説明:{task.description}</p>
                    <div className='item'>
                    <div className='button1'>
                    <Link href={`/tasks/${task.id}/edit`}><Button variant="contained" color="primary">編集</Button></Link>
                    </div>
                    <div className='button2'>
                    <Link href={`/tasks/${task.id}/destroy`}><Button variant="contained" color="primary">削除</Button></Link>
                    </div>
                    </div>
                </div>
            ) : (
                <p>Loading task details...</p>
            )}

        
            <Suspense fallback={<div>Loading...</div>}>
                <Mycomponent />
            </Suspense>
            </div>

        </>

    );
}