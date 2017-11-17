
const inquirer = require('inquirer');
const mysql = require('mysql');
let connection = {};


function BamazonManagerApp() {

  const bamMan = this;

  BamazonManagerApp.prototype.displayManagerOptions = () => {
    console.log('');

    inquirer.prompt([
      {
        type: 'list',
        message: "What would you like to do?",
        choices: ['View All Products For Sale',
                  'View Low Inventory Items',
                  'Add To Inventory',
                  'Exit The App'],
        name: 'managerOpts'
      }
    ]).then (answers => {

      answers.managerOpts === 'View All Products For Sale' ?
        bamMan.displayAllItems() :
          answers.managerOpts === 'View Low Inventory Items' ?
            bamMan.displayLowInvenItems() :
              answers.managerOpts === 'Add To Inventory' ?
                bamMan.addToInvenCheck() :
        process.exit();
    });
  };

  BamazonManagerApp.prototype.displayAllItems = () => {

    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "bamazonDB"
    });

    connection.connect();

    connection.query('SELECT * FROM `products`', (err, results) => {
      if (err) throw err;
      bamMan.displayAllItemsTable(results);
    });
  };

  BamazonManagerApp.prototype.displayAllItemsTable = (items) => {
    let i=0;
    console.log('');
    console.log('Id  Price  Quantity  Item');
    console.log('__  _____  ________  ____');
    console.log('');
    for(i; i<30; i++) {
      i < 9 ?
      console.log(items[i].item_id + '   $' + items[i].price + '    ' + items[i].stock_quantity + '     ' + items[i].product_name) :
      console.log(items[i].item_id + '  $' + items[i].price + '    ' + items[i].stock_quantity + '     ' + items[i].product_name);
    }
    console.log('');

    connection.end();
    bamMan.displayManagerOptions();
  };

  BamazonManagerApp.prototype.displayLowInvenItems = () => {

    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "bamazonDB"
    });

    connection.connect();

    connection.query('SELECT * FROM `products`', (err, results) => {
      if (err) throw err;
      bamMan.displayLowInvenItemsTable(results);
    });

  };

  BamazonManagerApp.prototype.displayLowInvenItemsTable = (items) => {
    let i=0;
    console.log('');
    console.log('Id  Price  Quantity  Item');
    console.log('__  _____  ________  ____');
    console.log('');
    for (i; i<30; i++) {
      items[i].stock_quantity < 6 ?

        i < 9 ?

          console.log(items[i].item_id + '   $' + items[i].price + '    ' + items[i].stock_quantity + '     ' + items[i].product_name) :

          console.log(items[i].item_id + '  $' + items[i].price + '    ' + items[i].stock_quantity + '     ' + items[i].product_name) :

        i = i;
    }

    connection.end();
    bamMan.displayManagerOptions();
  };

  BamazonManagerApp.prototype.addToInvenCheck = () => {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Please list the product item_id you would like to update: ',
        name: 'itemId'
      },
      {
        type: 'input',
        message: 'How many units would you like to add to the inventory?',
        name: 'itemQuan'
      }
    ]).then( answers => {
      isNaN(answers.itemId) ?
      (console.log('You have chosen an item_id that is not a number. Please try again'), bamMan.addToInvenCheck()) : +answers.itemId === 0 ?
        (console.log('You have chosen an item_id that is not a number. Please try again'), bamMan.addToInvenCheck()) :
        bamMan.addToInven(answers);
      });
    };

    BamazonManagerApp.prototype.addToInven = answers => {
      let parsedId = parseInt(answers.itemId);
      let parsedQuan = parseInt(answers.itemQuan);

      connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "bamazonDB"
      });

      connection.connect();

      connection.query('SELECT * FROM `products`', (err, results) => {
        let newQuan = results[parsedId].stock_quantity + parsedQuan;
        console.log('old quan = ' + results[parsedId].stock_quantity);
        console.log('new quan = ' + newQuan);


        connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuan
          },
          {
            item_id: parsedId
          }
        ], (err, res) => {
          console.log('');
          console.log('Inventory has been updated!');
          console.log('');

          connection.end();
          bamMan.displayManagerOptions();
        });
      });
    };


}

module.exports = BamazonManagerApp;

// let bamMan = new BamazonManagerApp();
// bamMan.displayManagerOptions();
