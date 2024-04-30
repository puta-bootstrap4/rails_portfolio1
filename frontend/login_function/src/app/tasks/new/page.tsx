// newページに直接きたらtopページになるように実装すること


'use client';
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
export default function TasksNew (){
    const router = useRouter();  // ここで常にuseRouterを呼び出す
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const params = new URLSearchParams();
    params.append("key1","登録完了しました");
    const href = `/tasks/index?${params}`;

    const handleTasksCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/tasks/create', {
                task: {
                    name: name,
                    description: description,
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // アクセストークンをヘッダーに設定
                }
            });
            router.push(href);
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                params.append("key1","登録できませんでした");
            } else {
                params.append("key1","HTTPリクエストが正常に送信されましたが、レスポンスが受信されませんでした");
              }
            } else {
                params.append("key1","予期しないエラーが起こりました");
              //router.push("/");
            }
          }
    }

    return (
        <>
            <form onSubmit={handleTasksCreate}>
                <label>
                    名前:
                    <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    説明:
                    <input type="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">登録</button>
            </form>
        </>
    );
}