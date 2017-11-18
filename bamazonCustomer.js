

const mysql = require('mysql');
const inquirer = require('inquirer');
let connection = {};


function BamazonCustomerApp() {


  const bam = this;



  //
  // BamazonCustomerApp.prototype.working = () => {
  //   console.log('current department = ' + this.currentDepartment);
  // };
  //


  BamazonCustomerApp.prototype.chooseDepartment = () => {
    connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      database: "bamazonDB"
    });
    console.log('');
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which Department would you like to shop from?',
        choices: ['Swimming', 'Hardware', 'Knick-Knacks'],
        name: 'dept'
      }
    ]).then( function(answers) {
      connection.connect();
      connection.query('SELECT * FROM `products` WHERE `department_name` = ?',[answers.dept], (err, results) => {
        if (err) throw err;
        bam.displayItems(results);
      });
    });

  };


  BamazonCustomerApp.prototype.displayItems = items => {
    let i=0;
    console.log('');
    console.log('Id  Price   Item');
    console.log('__  _____   ____');
    console.log('');
    for(i; i<10; i++) {
      i < 9 ?
      console.log(items[i].item_id + '   $' + items[i].price + '    ' + items[i].product_name) :
      console.log(items[i].item_id + '  $' + items[i].price + '    ' + items[i].product_name);
    }
    console.log('');
    bam.chooseAltDept(items);
  };

  BamazonCustomerApp.prototype.chooseAltDept = (items) => {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Please choose an option: ',
        choices: ['Purchase An Item From This Department', 'Choose Another Department'],
        name: 'altOpt'
      }
    ]).then( answers => {
      answers.altOpt === 'Purchase An Item From This Department' ?
        bam.customerPurchaseItemCheck(items) :
        bam.chooseDepartment();
    });
  };

  BamazonCustomerApp.prototype.customerPurchaseItemCheck = items => {
    inquirer.prompt([
      {
        type: 'input',
        message: 'What is the ID Number of the product you would like to buy?',
        name: 'productId'
      }
    ]).then(answers => {
      isNaN(answers.productId) ?
        (console.log('That is not a number. Please try again:'), bam.customerPurchaseItemCheck(items)) : +answers.productId === 0 ?
          (console.log('That is not a number. Please try again:'), bam.customerPurchaseItemCheck(items)) :
            bam.customerPurchaseItem(answers, items);
      });
  }

  BamazonCustomerApp.prototype.customerPurchaseItem = (answers, items) => {
      let adjustedId = bam.adjustId(answers.productId);
      let parsedId = parseInt(adjustedId);
      console.log('');

      parsedId !== NaN ?
        parsedId > 0 && parsedId < 31 ?
          items[parsedId-1].stock_quantity > 0 ?

          (console.log(''), console.log('There are ' + items[parsedId - 1].stock_quantity + ' units left of ' + items[parsedId -1].product_name + '\'s in stock'), console.log(''), bam.customerPurchaseQuanCheck(items, parsedId)) :

          (console.log('That item is out of stock :('), bam.customerPurchaseItem(items)) :

        (console.log('That is not an item ID. Please try again: '), bam.customerPurchaseItem(items)) :

      (console.log('That is not a number. Please try again: '), bam.customerPurchaseItem(items));


    };


  BamazonCustomerApp.prototype.adjustId = id => {
    let newId = 0;
    id > 10 && id <21 ? newId = id - 10 :
      id > 20 && id < 31 ? newId = id -20 :
        newId = id;

    return newId;
  };

  BamazonCustomerApp.prototype.customerPurchaseQuanCheck = (items, item_id) => {

    inquirer.prompt([
      {
        type: 'input',
        message: 'How many would you like?',
        name: 'productQuan'
      }
    ]).then(answers => {
       isNaN(answers.productQuan) ?
        (console.log('That is not a number. Please try again:'), bam.customerPurchaseQuanCheck(items, item_id)) : +answers.productQuan === 0 ?
          (console.log('That is not a number. Please try again:'), bam.customerPurchaseQuanCheck(items, item_id)) :
            bam.customerPurchaseQuan(items, item_id, answers);
      });
    };

  BamazonCustomerApp.prototype.customerPurchaseQuan = (items, item_id, answers) => {

      let parsedQuan = parseInt(answers.productQuan);

      parsedQuan <= items[item_id-1].stock_quantity ?

        (console.log(''),
        console.log('You have purchased ' + parsedQuan + ' units of ' + items[item_id-1].product_name + '\'s'),
        console.log(parsedQuan + ' units at $' + items[item_id-1].price + ' each = $' + (parsedQuan * items[item_id-1].price) + ' Total'),
        console.log(''),
        console.log('The quantity of ' + items[item_id-1].product_name + '\'s in stock is now: ' + (items[item_id-1].stock_quantity - parsedQuan)),
        bam.updateDB(items[item_id-1].product_name, (items[item_id-1].stock_quantity - parsedQuan))) :

      (console.log('There are not that many items in stock'), bam.customerPurchaseQuan(items, item_id, answers));
  };


  BamazonCustomerApp.prototype.updateDB = (productName, newProductQuan) => {

    var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newProductQuan,
      },
      {
        product_name: productName
      }
    ],
    function(err, res) {
      bam.shopAgain();
    });
  };

  BamazonCustomerApp.prototype.shopAgain = () => {

    inquirer.prompt([
      {
        type: 'confirm',
        message: 'Would you like to shop again?',
        name: 'shopAgain'
      }
    ]).then(answers => {
      let bamApp = {};
      answers.shopAgain ? (connection.end(), bam.chooseDepartment()) :
        (connection.end(),
        console.log(''),
        console.log(''),
        console.log('Thank you for shoppping with Bamazon! \nHave a great day!'),
        console.log(''),
        process.exit());
    });
  };

}

module.exports = BamazonCustomerApp;
