import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config(
    process.env.NODE_ENV === 'test' ? {path: './test/test.env'} : {path: '.env'}
);

if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

export const config = {
    port: parseInt(process.env.PORT || "3000"),
    jwtSecret: process.env.JWT_SECRET || "",
    api: {
        prefix: '/api',
    },
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    database:{
        url: process.env.DATABASE_URL
    }
};