'use client';

import { AuthContext } from '@/provider/auth';
import { useContext, useEffect } from 'react';

const HomePage = () => {
    const { signIn, isLogin } = useContext(AuthContext);
    const handleClick = async () => {
        try {
            const res = await fetch('/api/auth/callback/kakao/refetch', {
                method: 'POST',
            });
            if (res.ok) console.log(await res.json());
        } catch (error) {
            console.log(error);
        }
    };

    if (isLogin)
        return (
            <div className="flex h-full w-full justify-center items-center">
                Login Success
            </div>
        );
    return (
        <div className="full center flex-col  mx-auto space-y-4">
            <Credential />
            <div className="w-full h-[0.5px] bg-slate-400" />
            <button
                onClick={signIn}
                className="w-full px-10 py-3 bg-yellow-400 rounded-xl text-white"
            >
                Kakao
            </button>
            <button
                onClick={handleClick}
                className="w-full px-10 py-3 bg-yellow-400 rounded-xl text-white"
            >
                액세스 재발급
            </button>
        </div>
    );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type?: string;
    placeholder?: string;
}
const Input = ({ label, placeholder, type }: InputProps) => {
    return (
        <div className="space-y-2 w-full ">
            <div className="text-xl"> {label}</div>
            <input
                className="w-full h-10 border rounded-lg px-2 py-1"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

const Credential = () => {
    return (
        <>
            <Input label="id" placeholder="id" />
            <Input label="password" placeholder="password" type="password" />
            <button className="w-full px-10 py-3 bg-blue-400 rounded-xl text-white">
                로그인
            </button>
        </>
    );
};

export default HomePage;
