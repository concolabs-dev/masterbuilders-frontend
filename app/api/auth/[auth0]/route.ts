import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
// import { env } from 'process';

export const GET = handleAuth(
    {login: handleLogin(
        {
        authorizationParams: {
            audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE , // or AUTH0_AUDIENCE
            scope: 'openid profile' // or AUTH0_SCOPE
            }
        })
    }
);