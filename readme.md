# inventanalytics-case

![InventAnalytics Logo](https://www.inventanalytics.com/Content/images/logo.svg)

This project, developed by Mertcan Çezik for InventAnalytics, aims to assist users in borrowing and managing their personal library of books. Its purpose is to serve for users to borrow and keep track of their book collection.

## Installation

To get started with the project, follow these steps:

**Clone this repository**

```sh
git clone https://github.com/cezikmertcan/inventanalytics-case.git
```

**Navigate to the project directory**

```sh
cd inventanalytics-case
```

**Create the .env file**
Example .env file

```env
MYSQL_USERNAME="root"
MYSQL_PASSWORD="inventanalytics"
MYSQL_DB="inventanalytics"
MYSQL_HOST="inventanalytics-database"
SERVER_PORT=3000
```

## If you have a docker, please follow this steps

Please keep in mind that the docker compose file will start a mysql, an adminer and the server containers at ports 3306, 8080, and 3000.

**Build the docker compose file**

```sh
docker compose build
```

**Start the docker compose file**

```sh
docker compose up
```

or for detached mode:

```sh
docker compose up -d
```

By doing these steps you can access :
**adminer** at [localhost:8080](http://localhost:8080)
**server** at [localhost:3000](http://localhost:3000)
Server will automatically create the tables so you don't have to create it manually.

**Login information for adminer**

```
System:MYSQL
Server:inventanalytics-database
Username:root
Password:inventanalytics
Database:inventanalytics
```

You can leave the database empty if you want to see all the databases.

## If you want to launch manually, please follow this steps

**Create and initialize the database**
Here is the example [ddl file](http://localhost:3000)
If you do not want to do it manually after creating the database and adding it to the **.env file** you can run this command:

```sh
npm run db
```

This also will create all the tables for the project.

**Install the project dependencies**

```sh
npm install
```

**Start the Application**

```sh
npm run start
```

**Run the Application in Development Mode**
Remember, if you want to use the development mode, you'll need to make sure that there's a MySQL server running on your computer at the address 127.0.0.1:3306.
(or change it however you like in package.json at line 8)

```sh
npm run dev
```

Make sure to set the necessary environment variables using a .env file before running the application.

**Author**
Mertcan Çezik

**Email**: cezikmertcan@gmail.com
**GitHub**: @cezikmertcan
**License:** This project is licensed under the ISC License.
