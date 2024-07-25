'use server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import getUserInfo from './get-userInfo';

export const verifyJwt = (jwtToken: string) => {
    try {
        jwt.verify(jwtToken, process.env.SECRET_KEY!, async (err, decoded) => {
            if (err) throw new Error('Failed to verify JWT');

            const curDate = new Date();
            if (!decoded || typeof decoded === 'string')
                throw new Error('Failed to decode JWT');
            const decodedPayload = decoded as JwtPayload;

            if (!decodedPayload.exp) {
                throw new Error('JWT does not contain an exp claim');
            }

            const expireDate = new Date(decodedPayload.exp * 1000);
            if (curDate.getTime() > expireDate.getTime()) {
                const renewToken = await refetchAccessToken();
            }

            const userData = await getUserInfo(decodedPayload.accessToken);
            console.log(await userData);
        });
    } catch (error) {
        console.log(error);
    }
};

const refetchAccessToken = async () => {
    try {
        const res = await fetch('/api/auth/callback/kakao/refetch', {
            method: 'POST',
        });
        if (res.ok) console.log(await res.json());
    } catch (error) {
        console.log(error);
    }
};
