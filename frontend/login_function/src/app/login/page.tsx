'use client';
import React ,{useState} from 'react';
import axios, {AxiosError} from 'axios';
import { useRouter } from "next/navigation";

export default function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [successmsg,setSuccessmsg] = useState('');
    const router = useRouter();


    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try{
    const response = await axios.post('http://localhost:3001/login',{
    user:{
        email: email,
        password: password
    }
    });
    const{token, refresh_token,expires_at} = response.data.user;
    localStorage.setItem('accessToken',token);
    localStorage.setItem('refreshToken',refresh_token);
    localStorage.setItem('expiresAt',expires_at);
    router.push("/tasks/index");
    } catch(error:unknown){
        if(axios.isAxiosError(error)) {
            if (error.response) {
              setError('ログインできませんでした');
              setSuccessmsg('');
              router.push("/")
            } else{
              setError('HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした');
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
    return(
        <>
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
    {error && <p>{error}</p>}
    {successmsg && <p>{successmsg}</p>}
        </>
    );
}