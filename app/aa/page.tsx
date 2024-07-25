import { cookies } from 'next/headers';

const Page = () => {
    console.log(cookies().get('refresh_token'));
    return <div>Page</div>;
};

export default Page;
