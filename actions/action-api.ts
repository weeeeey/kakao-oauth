'use server';
import { db } from '@/prisma/db';

export const actionApi = async (id: string, password: string) => {
    try {
        const user = await db.user.create({
            data: {
                email: id,
                password,
            },
        });
        if (!user)
            return {
                error: 'user not found',
            };
        console.log(user);
        return user;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};
