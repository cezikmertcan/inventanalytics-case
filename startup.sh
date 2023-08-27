dockerize -wait tcp://inventanalytics-database:3306 -timeout 60s
npm run db
npm run start