

const mysql = require('mysql');
const colors = require('colors');

const welcome = () => {
  console.log('\033c');
  console.log('');
  console.log('Welcome to BAMazon!');
  console.log('Node StoreFront App');
  console.log('');
};

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

connection.connect(err => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  welcome();
  afterConnection();
});

const afterConnection = () => {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res[0].product_name);
    connection.end();
  });
}
