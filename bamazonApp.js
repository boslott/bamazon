
const inquirer = require('inquirer');
const colors = require('colors');
const BamazonCustomerApp = require('./bamazonCustomer');
const BamazonManagerApp = require('./bamazonManager');


function BamazonApp() {

  const app = this;

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

  BamazonApp.prototype.appOptions = () => {
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which Program Option Would You Like To Run:',
        choices: ['Customer', 'Manager', 'Exit The App'],
        name: 'appChoice'
      }
    ]).then (answers => {

      switch(answers.appChoice) {
        case 'Customer':
          app.runCustomerApp();
          break;
        case 'Manager':
          app.runManagerApp();
          break;
        case 'Exit The App':
          process.exit();
          break;
        default:
          break;
      };
    });
  };

  BamazonApp.prototype.runCustomerApp = () => {
    const customer = new BamazonCustomerApp();
    customer.chooseDepartment();
  };

  BamazonApp.prototype.runManagerApp = () => {
    const manager = new BamazonManagerApp();
    manager.displayManagerOptions();
  };

}




const bamazon = new BamazonApp();

bamazon.welcome();
bamazon.appOptions();
