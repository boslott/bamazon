
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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hammer', 'Hardware', 10, 20),
       ('Adjustable Wrench', 'Hardware', 10, 20),
       ('Pliers', 'Hardware', 10, 20),
       ('Philip\'s Head Screwdriver', 'Hardware', 8, 20),
       ('Flathead Screwdriver', 'Hardware', 8, 20),
       ('Socket Set', 'Hardware', 20, 20),
       ('Box of Nails', 'Hardware', 10, 20),
       ('Deck Screws', 'Hardware', 10, 20),
       ('Circular Saw', 'Hardware', 80, 20),
       ('Chainsaw', 'Hardware', 80, 20);

INSERT INTO products (product_name, deparment_name, price, stock_quantity)
VALUES ('Socks', 'Knick-Knacks', 12, 20),
       ('Toothbrush', 'Knick-Knacks', 19, 20),
       ('Crown Jewels', 'Knick-Knacks', 1000, 20),
       ('Area 51 Laser Gun', 'Knick-Knacks', 95, 20),
       ('Bag of Rocks', 'Knick-Knacks', 17, 20),
       ('Already-Been-Chewed Gum', 'Knick-Knacks', 12, 20),
       ('50lb Bag of Flour', 'Knick-Knacks', 98, 20),
       ('20lbs Plutonium', 'Knick-Knacks', 10, 20),
       ('Neil Armstrong\'s Autograph', 'Knick-Knacks', 60, 20),
       ('Meeting with Carl', 'Knick-Knacks', 99, 20);


CREATE TABLE departments (
	dpt_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	dpt_name VARCHAR(45) NOT NULL,
	PRIMARY KEY (dpt_id)
);

INSERT INTO departments (dpt_name)
  VALUES ('Swimming'),
         ('Hardware'),
         ('Knick-Knacks');
