import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '15M@rs19',
  database: 'apptoyou'
});

export default connection;
