const dbhost = process.env.DB_HOST || "localhost";
const dbuser = process.env.DB_USER || "root";
const dbpwd = process.env.DB_PWD || "admin";
const dbname = process.env.DB_NAME || "teacherapp";

module.exports = {
  host: `${dbhost}`,
  user: `${dbuser}`,
  password: `${dbpwd}`,
  database: `${dbname}`
};