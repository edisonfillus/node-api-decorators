# Node Express boilerplate to work with modern typescript decorators

## Steps to create from scratch

### Enable Typescript and Nodemon
Start npm project
```
npm init
```
Install Typescript
```
npm install typescript
```
Generate tsconfig.json
```
npx -p typescript tsc --init
```
Install ts-node and nodemon
```
npm install ts-node nodemon
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
Create the start script on package.json with nodemon
```
"start": "nodemon"
```
Create the index.ts at /src, and check if it is running
```
npm start
```

