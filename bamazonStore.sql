
DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;


USE bamazonDB;


CREATE TABLE products (

  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Goggles', 'Swimming', 10, 20),
        ('Male Swim Suit', 'Swimming', 20, 20),
        ('Female Swim Suit', 'Swimming', 20, 20),
        ('Flippers', 'Swimming', 10, 20),
        ('Kick Board', 'Swimming', 10, 20),
        ('Snorkel', 'Swimming', 5, 20),
        ('Towel', 'Swimming', 10, 20),
        ('Swim Bag', 'Swimming', 20, 20),
        ('Swim Watch', 'Swimming', 100, 10),
        ('Chlorine-Out Shampoo', 'Swimming', 20, 20);

CREATE TABLE departments (
	dpt_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	dpt_name VARCHAR(45) NOT NULL,
	PRIMARY KEY (dpt_id)
);

INSERT INTO departments (dpt_name)
  VALUES ('Swimming');
