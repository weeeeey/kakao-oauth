'use server';

export const actionOauth = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!);
        console.log(res);
    } catch (error) {
        console.log('internal error');
    }
};
