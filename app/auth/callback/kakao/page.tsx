'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const OAuthPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const code = searchParams.get('code');
            if (code) {
                try {
                    const res = await fetch('/api/auth/callback/kakao', {
                        method: 'POST',
                        body: JSON.stringify({ code }),
                    });
                    if (res.ok) {
                        const data = await res.json();

                        localStorage.setItem('jwt', data.jwt);

                        router.refresh();
                        router.push('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })();
    }, [searchParams, router]);
    return (
        <div className="h-full w-full flex justify-center items-center ">
            Loading
        </div>
    );
};

export default OAuthPage;
