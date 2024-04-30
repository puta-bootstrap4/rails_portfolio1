'use client';
import {Suspense, useState} from 'react';
import Mycomponent from './tasks/mycomponent';
export default function Top(){

  return(
    <>
      <a href="http://localhost:3000/signup"><button>SIGNUP</button></a>
      <a href="http://localhost:3000/login"><button>LOGIN</button></a>
      <Suspense fallback={<div>Loading...</div>}>
      <Mycomponent />
      </Suspense>
    </>
  );
}