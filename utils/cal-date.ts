export const calExpireDate = (secondes: string) => {
    const curDate = new Date();
    return curDate.setSeconds(curDate.getSeconds() + +secondes);
};

export const calDiffDate = (expireDate: Date) => {
    const curDate = new Date();
    return Math.floor((expireDate.getTime() - curDate.getTime()) / 1000);
};
