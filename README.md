# Backend

## Getting Started

First, install the application

npm install

# or

yarn

next run if it the first time runing the app 
knex migrate:latest

if you have run the app befor run 

knex migrate:rollback --all

then 

knex migrate:latest

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:1337](http://localhost:1337) with your browser to see the result.

for admin access set isadmin on users table to true 

first account on the system is BOT account with id of 1