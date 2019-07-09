DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
itemID INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(200) NULL,
department_name VARCHAR(200) NULL,
price DECIMAL(10,4) NULL,
stock_quantity INT(10) NULL,
PRIMARY KEY (itemID)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chainswaw", "Tools", 89.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lawnmower", "Tools", 139.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dark Souls 3", "Video Games", 59.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monster", "beverages", 4.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blade Runner", "Movies", 19.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Risk", "Board Games", 39.99, 200);

SELECT stock_quantity FROM products WHERE itemID = 2;
UPDATE products SET stock_quantity = stock_quantity + 5 WHERE itemID = 2;