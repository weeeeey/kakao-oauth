import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const refreshToken = req.cookies.get('refresh_token');
        if (!refreshToken) {
            return new NextResponse('No refresh token', { status: 401 });
        }

        const { value: refresh_token } = refreshToken;

        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
            client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
            refresh_token,
        }).toString();

        const res = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=utf-8',
            },
            body,
        });

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json({ accessToken: data.access_token });
        }

        const errorData = await res.json();
        console.error('Failed to refresh token:', errorData);
        return new NextResponse('Failed to refresh token', { status: 401 });
    } catch (error) {
        console.error('Internal Server Error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
