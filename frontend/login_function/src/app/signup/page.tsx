'use client';
import React,{ useState } from "react";
import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
export default function AuthenticationPage(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [error,setError] = useState('');
  const [successmsg,setSuccessmsg] = useState('');
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      const response = await axios.post('http://localhost:3001/signup',{
        user: {
          name: name,
          email: email,
          password: password
        }
      });
      setError('');
      setSuccessmsg('登録が完了しました');
      const { token, refresh_token, expires_at } = response.data.user;
      localStorage.setItem('accessToken',token);
      localStorage.setItem('refreshToken',refresh_token);
      localStorage.setItem('expiresAt',expires_at);
    } catch(error: unknown){
      if(axios.isAxiosError(error)) {
        if (error.response) {
          setError('登録できませんでした');
          setSuccessmsg('');
          router.push("/")

        } else{
          setError('The request was made but noresponse was received');
          setSuccessmsg('');
          router.push("/")

        }
      } else{
        setError('予期しないエラーが起こりました');
        setSuccessmsg('');
        router.push("/")

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
    {successmsg && <p>{successmsg}</p>}
  </main>
  );
}


