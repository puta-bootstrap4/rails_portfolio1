'use client';
import React,{ useState } from "react";
import axios, { AxiosError } from 'axios';
export default function LoginPage(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [error,setError] = useState('');
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
      const { token, refresh_token, expires_at } = response.data.user;
      localStorage.setItem('accessToken',token);
      localStorage.setItem('refreshToken',refresh_token);
      localStorage.setItem('expiresAt',expires_at);
    } catch(error: unknown){
      if(axios.isAxiosError(error)) {
        if (error.response) {
          setError('could not subscribe');
        } else{
          setError('The request was made but noresponse was received');
        }
      } else{
        setError('An unexpected error occurred.');
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