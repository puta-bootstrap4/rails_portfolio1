'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';
import Mycomponent from '../../mycomponent'
import top from '../../../../../public/images/top.jpeg';
import { Button, Grid } from '@mui/material';

export default function TasksEdit ({ params }: { params: { id: string } }){
    const param = new URLSearchParams();
    const router = useRouter();
    const [name,setName] = useState('');
    const [description,setDescription]= useState('');
 
    
        
        


        const handleGetTaskEdit = async() =>{
            //strongparameterはユーザーから受け取ったデータを直接モデルに渡す場合に重要です。
            
            try{
            const res = await axios.get(`http://localhost:3001/tasks/${params.id}/show`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
            });
            setName(res.data.name);
            setDescription(res.data.description);
            } catch(e:unknown){
                if(axios.isAxiosError(e)) {
                    if (e.response) {
                        if (e.response.status === 401){
                            param.append("key1","ログインしてください");
                            const hreftop = `/?${param}`;
                            router.push(hreftop);
                        }
                        else{
                            param.append("key1","編集できません");
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

            const handleGetTaskUpdate = async(event: React.FormEvent) =>{
                event.preventDefault(); // デフォルトのフォーム送信動作を防ぐ

                try{
                const res = await axios.patch(`http://localhost:3001/tasks/${params.id}/update`,{
                 task:{name,
                 description}
                },{headers:{
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
                });
            setName(res.data.name)
            setDescription(res.data.description)
            param.append("key1","登録完了しました");
            const href = `/tasks/index/?${param}`;
          
            router.push(href);
            } catch(e:unknown){
                    if(axios.isAxiosError(e)) {
                        if (e.response) {
                            if (e.response.status === 401){
                                param.append("key1","ログインしてください");
                                const hreftop = `/?${param}`;
                                router.push(hreftop);
                            }
                            else{
                                param.append("key1","登録できませんでした");
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
            handleGetTaskEdit();
        },[]);
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
         
               <form onSubmit={handleGetTaskUpdate}>
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
               <Button color="primary" variant="contained" type="submit">再登録</Button>
               </form>
        </div>
                
            <Suspense fallback={<div>Loading...</div>}>
                <Mycomponent />
            </Suspense>
        
        </>

    );
}