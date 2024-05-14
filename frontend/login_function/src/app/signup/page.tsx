'use client'
import React, { useEffect,useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function AuthenticationPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // ここで常にuseRouterを呼び出す
  const param = new URLSearchParams();

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
      <form onSubmit={handleSignup}>
        <label>
          Name:
          <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">SignUp</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}
