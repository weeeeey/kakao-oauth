'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

interface AuthContextType {
    signIn: () => void;
    signOut: () => void;
    isLogin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    signIn: () => {},
    signOut: () => {},
    isLogin: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setIsLogin(true);
        }
    }, []);

    const signIn = async () => {
        try {
            const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&prompt=login`;

            window.location.href = kakaoAuthUrl;
        } catch (error) {
            console.log(error);
        }
    };
    const signOut = () => {};

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                signIn,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const currentUser = useContext(AuthContext);
    if (!currentUser)
        throw new Error('useAuth must be used within an AuthProvider');
    return { ...currentUser };
};

export default AuthProvider;
