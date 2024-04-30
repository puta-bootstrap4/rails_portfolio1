'use client';
import axios from 'axios';
import React,{ useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Link  from 'next/link';
import { useSearchParams } from 'next/navigation';
import {Suspense} from 'react';
export default function Mycomponent(){
    const query = useSearchParams();
        const key1 = query.get('key1');
        return(
        <>{key1 && <p>{key1}</p>}</>
        );
}