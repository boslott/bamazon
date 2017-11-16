
const inquirer = require('inquirer');
const BamazonCustomerApp = require('./bamazonCustomer');


function BamazonApp() {



}

BamazonApp.prototype.chooseUser = function() {

};

BamazonApp.prototype.welcome = function() {
    console.log('\033c');
    console.log('');
    console.log(' ******************************************'.red.bold);
    console.log('');
    console.log('  __                     |\\      /|    /\\'.red.bold)
    console.log(' |   \\        / \\        | \\    / |   |  |'.red.bold);
    console.log(' |    |      /   \\       |  \\  /  |   |  |'.red.bold);
    console.log(' |   /      /     \\      |   \\/   |   |  |'.red.bold);
    console.log(' |   \\     / ----- \\     |        |   |  |'.red.bold);
    console.log(' |    |   /         \\    |        |    \\/'.red.bold)
    console.log(' |    |  /           \\   |        |    /\\'.red.bold);
    console.log(' |_ _/  /             \\  |        |    \\/'.red.bold);
    console.log(' ');
    console.log(' ******************************************'.red.bold);
    console.log('');
    console.log('');
    console.log(' Welcome to BAMazon Storefront Node App!'.blue.bold);
    console.log('');
    console.log('');
};


BamazonApp.prototype.runCustomerApp = function() {
  const customer = new BamazonCustomerApp();
  customer.chooseDepartment();
};


const bamazon = new BamazonApp();

bamazon.welcome();
bamazon.runCustomerApp();
