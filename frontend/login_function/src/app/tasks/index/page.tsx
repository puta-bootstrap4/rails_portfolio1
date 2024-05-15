'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import {Suspense} from 'react';
import Mycomponent from '../mycomponent';
import top from '../../../../public/images/top.jpeg';
import { Button, Grid } from '@mui/material';

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
    
        const handleLogout = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            if (token) {
              await axios.post('http://localhost:3001/logout', {}, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              localStorage.removeItem('accessToken');
              params.append("key1","ログアウトに成功しました");
                const href = `/?${params}`;
                router.push(href)
    
            }
          } catch (error) {
            console.error('Logout failed', error);
            alert('Logout failed');
          }
        };
    
      

    useEffect(() => {
        handleGetTaskIndex();
    }, []);
    return(
        <>
        <style jsx>{`
        @media (min-width: 768px) { 
            .newbutton{
                margin-top:-40px;
                margin-bottom:20px;
            }
            .buttonmargin{
                margin-bottom:10px;
                display:inline-block;
                margin-left:10px;
                margin-right:10px;
            }
            .title{
                padding-bottom:30px;
                padding-top:200px;
              }
        .topimage {
          text-align:center;
          height: 800px;
          background-size: cover;
          background-position: center;
          margin-top:50px;
          margin-left:50px;
          margin-right:50px;
        }
        .firstitem{
          text-align:center;
          margin-top:50px;
        }
        .firsttwo{
          display:inline-block;
          margin-right:50px;
        }
        .firstthree{
          display:inline-block;
          margin-left:50px;
        }
        .title{
          padding-bottom:100px;
          padding-top:200px;
        }
      }
        @media (max-width: 767px) { 
            .newbutton{
                margin-top:-40px;
                margin-bottom:20px;
            }
            .buttonmargin{
                display:inline-block;
                margin-bottom:10px;
                margin-left:10px;
                margin-right:10px;
            }
          .title{
            padding-bottom:30px;
            padding-top:200px;
          }
          .topimage {
            text-align:center;
            height: 800px;
            background-size: cover;
            background-position: center;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;
          }
          .firstitem{
            text-align:center;
            margin-top:50px;
          }
          .firsttwo{
            display:inline-block;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;

          }
          .firstthree{
            display:inline-block;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;
          }
         }
      `}</style>
        <div className='topimage' style={{ backgroundImage: `url(${top.src})` }}>
            <div className='title'>
                <h1>仕事一覧</h1>
            </div>
            <div className="newbutton">
            <Button href="/tasks/new" color="success" variant="contained">新規作成</Button>
            </div>
            <ul>
                {tasks && tasks.map(task => (
                    <li key={task.id}>仕事名:{task.name}<div className="buttonmargin"><Button href={`/tasks/${task.id}/show`} variant="contained" color="primary">詳細</Button></div><div className="buttonmargin"><Link href={`/tasks/${task.id}/destroy`}><Button className="buttonmargin" variant="contained" color="primary">削除</Button></Link></div></li>
                ))}
            </ul>
            <div>
            <Button color="primary" variant="contained" onClick={handleLogout}>ログアウト</Button>

            </div>
            {error && <p>{error}</p>}
            <Suspense fallback={<div>Loading...</div>}>
                <Mycomponent />
            </Suspense>
        </div>
        </>
    );
}
