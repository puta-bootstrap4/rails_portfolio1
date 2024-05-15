// newページに直接きたらtopページになるように実装すること


'use client';
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";


import top from '../../../../public/images/top.jpeg';
import { Button, Grid } from '@mui/material';

export default function TasksNew (){
    const router = useRouter();  // ここで常にuseRouterを呼び出す
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const params = new URLSearchParams();
    params.append("key1","登録完了しました");
    const href = `/tasks/index?${params}`;

    const handleTasksCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/tasks/create', {
                task: {
                    name: name,
                    description: description,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // アクセストークンをヘッダーに設定
                }
            });
            router.push(href);
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                params.append("key1","登録できませんでした");
            } else {
                params.append("key1","HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした");
              }
            } else {
                params.append("key1","予期しないエラーが起こりました");
              //router.push("/");
            }
          }
    }

    return (
        <>

        <style jsx>{`
            @media (min-width: 768px) { 
              .topmargin{
                height:200px;
              }
              #bottommargin{
                margin-bottom:60px;
              }
              .item{
                font-size:20px;
                margin-top:60px;
              }
              .topimage {
                height: 800px;
                background-size: cover;
                background-position: center;
                margin-top:50px;
                margin-left:50px;
                margin-right:50px;
                text-align:center;

              }
            }
             @media (max-width: 767px) { 
              .topmargin{
                height:200px;
              }
              #bottommargin{
                margin-bottom:60px;
              }
              .item{
                font-size:20px;
                margin-top:60px;
              }
              .topimage {
                height: 800px;
                background-size: cover;
                background-position: center;
                margin-top:50px;
                margin-left:50px;
                margin-right:50px;
                text-align:center;
              }
            }
    `}</style>
                <div className="topimage" style={{ backgroundImage: `url(${top.src})` }}>
                <div className='topmargin'>

                </div>
            <form onSubmit={handleTasksCreate}>
                <div className='item'>
                <label>
                    仕事名:
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                </div>
                <div className='item' id="bottommargin">

                <label>
                    説明:
                    <input type="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>

                </div>
                <Button variant="contained" color="primary" type="submit">登録</Button>
            </form>
            </div>

        </>
    );
}