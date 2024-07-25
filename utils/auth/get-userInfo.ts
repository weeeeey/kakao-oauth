const getUserInfo = async (accessToken: string) => {
    try {
        const res = await fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.log('internal server error');
    }
};

export default getUserInfo;
