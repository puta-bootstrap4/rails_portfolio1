'use client'
import React, { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

import top from '../../../public/images/top.jpeg';
import { Button, Grid } from '@mui/material';

export default function AuthenticationPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // ここで常にuseRouterを呼び出す
  const param = new URLSearchParams();


export default function AuthenticationPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // ここで常にuseRouterを呼び出す
  const params = new URLSearchParams();
  const href = `/?${params}`;
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        user: {
          name: name,
          email: email,
          password: password
        }
      });
      const { token, refresh_token, expires_at } = response.data.user;
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('expiresAt', expires_at);

      
      param.append("key1","登録完了しました");
      const href = `/?${param}`;

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

  };

  return (
    <main>

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

      <form onSubmit={handleSignup}>
        <div className="topmargin">

        </div>
        <div className="inputitem">
        <label>
          名前:
          <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        </div>
        <div className="inputitem">
        <label>
          メールアドレス:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        </div>
        <div className="inputitem">
        <label>
          パスワード:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="inputitem">
        <Button variant="contained" type="submit" color="primary">SignUP</Button>
        </div>
        </div>
              </form>
      {error && <p>{error}</p>}
      </div>

    </main>
  );
}
