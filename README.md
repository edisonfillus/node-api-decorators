# Node Express boilerplate to work with modern typescript decorators

## Steps to create from scratch

### Enable Typescript and Nodemon
Start npm project
```
npm init
```
Install Typescript
```
npm install --save-dev typescript
```
Create tsconfig.json
```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "./src",
    "removeComments": true,
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```
Install ts-node and nodemon
```
npm install --save-dev ts-node nodemon
```
Create a nodemon.json
```
{
  "watch": [
    "src",
    ".env"
  ],
  "ext": "ts,json",
  "ignore": [
    "src/**/*.spec.ts"
  ],
  "exec": "ts-node  --transpile-only ./src/index.ts"
}
```
Create the start and build scripts on package.json with nodemon
```
"start": "nodemon",
"build": "tsc -p ."
```
Create the index.ts at /src, and check if it is running
```
npm start
```

### Enable Jest
Install Jest and Typescript dependencies
```
npm install --save-dev jest @types/jest ts-jest
```
Create a jest.config.js
```
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
```
Include a test script on package.json
```
"test": "jest --coverage"
```
Create a dummy test on /src/*.test.ts
Run the suite
```
npm test
```


### Configure express and routing-controllers
Install express and dependencies
```
npm install express body-parser multer
npm install -save-dev @types/express @types/body-parser @types/multer
```
Install annotation libraries for mapping and validation
```
npm install class-transformer class-validator
```
Install routing-controllers
```
npm install routing-controllers
```
Install reflect-metadata
```
npm install reflect-metadata
```
Create app.ts
```
import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {Application} from "express";

const app: Application = createExpressServer({
    controllers: [__dirname + "/controllers/*"]
});

export {app};
```
Install supertest
```
npm install --save-dev supertest @types/supertest
```
Create a folder /src/controllers/ and create your controllers and tests


### Configure TypeDi for Dependency Injection
Install TypeDI
```
npm install TypeDI
```
Install Node Types
```
npm install --save-dev @types/node 
```
Initialize the container before express
```
useContainer(Container);
```
Create your @Service 

### Include environment properties management
```
npm install dotenv
```
Create a config loader


### Include authentication
Install bcrypt
```
npm install bcrypt
npm install --save-dev @types/bcrypt
```
Install Json Web Token
```
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```
Create AuthService / TokenService and create a authorizationChecker function on app.ts to request token validation logic and user/roles check

Enjoy the @Authorized annotation
```
@Authorized("ADMIN") 
@Get("/restricted")
restrictedArea() {}
```

### Include TypeORM
Install TypeORM
```
npm install typeorm
```
Install extension for TypeDI
```
npm install typeorm-typedi-extensions
```

Install Database Drivers
```
npm install mysql
npm install pg
npm install oracledb
npm install mongodb 
```



## Configure Build with Docker and PM2

Create a Dockerfile
```
FROM node:12-stretch-slim
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --production
RUN npm install pm2 -g
COPY ./dist .
EXPOSE 3000
CMD ["pm2-runtime", "app.js"]
```
If want to run without compose
``` 
docker build -t app .
docker run --name app -p 3000:3000 -d app
```
Create a docker-compose.yml
```
version: "3"
services:
  app:
    container_name: app
    restart: always
    build: .
    environment:
      - PORT=3000
    ports:
      - "3000:3000"
    links:
      - mongo
  mongo:
    container_name: mongo
    image: mongo
    ports:
      - "27017:27017"
```
Run with docker-compose
```
docker-compose up
```
