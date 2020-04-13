# TeacherAdminApp
The application is to perform the administrative functions by the teacher for the students to create the rest endpoints

## A GovTech assessment using NodeJS, RestAPI, Mysql and Docker Container

### Application setup steps
1. Install NodeJS v13.11.0
2. Verify npm/npx version as 6.13.7
3. Follow the below steps in command prompt to setup the application development environment

```
npm init
npm install express --save
npm install mysql --save
npm install body-parser --save
```

### Application Database setup steps for development environment
1. Install Node MySQL database
2. The application database and data creation scripts are in dbsetup.sql
3. Run the below command in the command prompt ensuring that mysql is set in environment path

```
mysql -u root -padmin < D:\Mone\Projects\sourcecode\govtech-assessment\app\dbsetup\dbsetup.sql
```

### Run the application

```
npm install
npm start
```