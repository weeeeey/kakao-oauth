import { NextRequest } from 'next/server';

const URL = 'https://kauth.kakao.com/oauth/token';
const refetchAccessToken = async (req: NextRequest) => {
    try {
        const refresh_token = req.cookies.get('refresh_token');
        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-type':
                    'application/x-www-form-urlencoded;charset=utf-8',
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
                client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
                refresh_token,
            }),
        });
        if (res.ok) {
            console.log(await res.json());
        }
    } catch (error) {
        console.log('Internal Server Error');
    }
};

export default refetchAccessToken;
