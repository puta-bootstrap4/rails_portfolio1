'use client';
import {Suspense, useState} from 'react';
import { useSearchParams } from 'next/navigation';
function MyComponent(){
  const query = useSearchParams();
  const key1 = query.get('key1');
  return(
  <>
        {key1 && <p>{key1}</p>}

  </>
  );
}
export default function Top(){

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <a href="http://localhost:3000/signup"><button>SIGNUP</button></a>
      <a href="http://localhost:3000/login"><button>LOGIN</button></a>
      <MyComponent />
    </Suspense>
  );
}