import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});


// const connection = async() => {
//   await mysql.createConnection(
//     {host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DATABASE,
//   });
// }
// query database

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
// });

// const connection = async () => {
// try {
// await mysql
// .createConnection({
// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DATABASE,
// })
//
// console.log("DB connected");
// } catch (er) {
// console.log("Error while connecting db", er);
// }
// };

// export default pool;



export default pool;
