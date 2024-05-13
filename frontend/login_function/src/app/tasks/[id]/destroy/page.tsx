'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import {Suspense} from 'react';
import Mycomponent from '../../mycomponent'

export default function TasksDestroy ({ params }: { params: { id: string } }){
    const param = new URLSearchParams();
    const router = useRouter();

        

    const handleDeleteTaskDestroy = async() =>{
        
        try{
        const res = await axios.delete(`http://localhost:3001/tasks/${params.id}/destroy`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
        });
        } catch(e:unknown){
            if(axios.isAxiosError(e)) {
                if (e.response) {
                    if (e.response.status === 401){
                        param.append("key1","ログインしてください");
                        const href = `/?${param}`;
                        router.push(href);
                    }
                    else{
                        param.append("key1","削除できませんでした");
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
        param.append("key1","削除できました");
        const href= `/tasks/index?${param}`;
        router.push(href);
        }
        handleDeleteTaskDestroy();

    return (
        <>
        </>

    );
}