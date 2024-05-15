'use client';
import { Suspense } from 'react';
import Mycomponent from './tasks/mycomponent';
import { Button, Grid } from '@mui/material';
import top from '../../public/images/top.jpeg';

export default function Top() {
  return (
    <>
      <style jsx>{`
        @media (min-width: 768px) { 

        .topimage {
          height: 800px;
          background-size: cover;
          background-position: center;
          margin-top:50px;
          margin-left:50px;
          margin-right:50px;
        }
        .firstitem{
          text-align:center;
          margin-top:50px;
        }
        .firsttwo{
          display:inline-block;
          margin-right:50px;
        }
        .firstthree{
          display:inline-block;
          margin-left:50px;
        }
        .title{
          padding-bottom:100px;
          padding-top:200px;
        }
      }
        @media (max-width: 767px) { 
          .title{
            padding-bottom:100px;
            padding-top:200px;
          }
          .topimage {
            height: 800px;
            background-size: cover;
            background-position: center;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;
          }
          .firstitem{
            text-align:center;
            margin-top:50px;
          }
          .firsttwo{
            display:inline-block;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;

          }
          .firstthree{
            display:inline-block;
            margin-top:50px;
            margin-left:50px;
            margin-right:50px;
          }
         }
      `}</style>
<div className="topimage" style={{ backgroundImage: `url(${top.src})` }}>
      <div>

        <div>
          <div className='firstitem'>
            <div className='title'>
              <h1>TASKLEAFAPP</h1>
            </div>
            <div className='firstitemone'>
              <a href="http://localhost:3000/signup" className='firsttwo'>
                <Button variant="contained" color="primary">SIGNUP</Button>
              </a>
              <a href="http://localhost:3000/login" className='firstthree'>
                <Button variant="contained" color="primary">LOGIN</Button>
              </a>
            </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Mycomponent />
          </Suspense>
          </div>
      </div>
</div>
</div>
    </>
  );
}
