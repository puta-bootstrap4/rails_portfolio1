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
  const params = new URLSearchParams();
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
      
      params.append("key1","登録完了しました");
      const href = `/?${params}`;

      router.push(href);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError('登録できませんでした');
        } else {
          setError('HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした');
        }
      } else {
        setError('予期しないエラーが起こりました');
        //router.push("/");
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
