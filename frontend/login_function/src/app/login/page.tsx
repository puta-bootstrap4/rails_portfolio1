'use client';
import React ,{useState} from 'react';
import axios, {AxiosError} from 'axios';
import { useRouter } from "next/navigation";
import { Button, Grid } from '@mui/material';
import top from '../../../public/images/top.jpeg';

export default function Login(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [successmsg,setSuccessmsg] = useState('');
    const router = useRouter();
    const param = new URLSearchParams();


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

      
    param.append("key1","ログイン完了しました");
    const href = `/tasks/index?${param}`;

    router.push(href);    
  } catch(e:unknown){
    if(axios.isAxiosError(e)) {
      if (e.response) {
          if (e.response.status === 401){
              param.append("key1","ログインに失敗しました。メールアドレスまたはパスワードが正しくありません。");
              const hreftop = `/?${param}`;
              router.push(hreftop);
          }
          else{
              param.append("key1","ログインできませんでした");
              const href = `/?${param}`;
              router.push(href);


          }
      } else{
          param.append("key1","HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした");
          const href = `/?${param}`;
          router.push(href);

      }
    } else{
          param.append("key1","予期しないエラーが起こりました");
          const href = `/?${param}`;
          router.push(href);

    }
    }
  }
    return(
        <>
        <style jsx>{`
            @media (min-width: 768px) { 
              .topmargin{
                height:200px;
              }
              #inputitem1{
                padding-top:200px;
              }
              .inputitem{
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
              #inputitem1{
                padding-top:200px;
              }
              .inputitem{
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
    `}
    </style>
    <div className="topimage" style={{ backgroundImage: `url(${top.src})` }}>

    <form onSubmit={handleLogin}>
    <div className="topmargin">

    </div>
    <div className='inputitem'>
      <label>
        メールアドレス:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      </div>
      <div className='inputitem'>

      <label>
        パスワード:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      </div>
      <div className='inputitem'>

      <Button variant="contained" type="submit" color="primary">LOGIN</Button>
      </div>
    </form>
    {error && <p>{error}</p>}
    {successmsg && <p>{successmsg}</p>}
    </div>
        </>
    );
}