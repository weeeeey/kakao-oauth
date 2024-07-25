import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { calExpireDate } from '@/utils/cal-date';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { code } = body;
        if (!code) {
            return new NextResponse('Code is missing', { status: 402 });
        }

        const tokenResponse = await fetch(
            'https://kauth.kakao.com/oauth/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
                    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
                    client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
                    code,
                }),
            }
        );

        const tokenData = await tokenResponse.json();

        const payload = {
            accessToken: tokenData.access_token,
        };

        const jwtToken = jwt.sign(payload, process.env.SECRET_KEY!, {
            algorithm: 'HS256',
            expiresIn: tokenData.expires_in,
        });

        const response = NextResponse.json({
            jwt: jwtToken,
        });

        response.cookies.set('refresh_token', tokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: calExpireDate(tokenData.refresh_token_expires_in),
            path: '/',
        });

        return response;
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Server Error', {
            status: 500,
            statusText: 'Internal Server Error',
        });
    }
}
