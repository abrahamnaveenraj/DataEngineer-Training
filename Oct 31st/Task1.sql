CREATE DATABASE IF NOT EXISTS retail_tracker;
USE retail_tracker;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  product_id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  unit_price DECIMAL(10,2),
  supplier_id VARCHAR(32),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales table
CREATE TABLE IF NOT EXISTS sales (
  sale_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(32),
  sale_date DATE,
  quantity INT,
  unit_price DECIMAL(10,2),
  region VARCHAR(100),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  inventory_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(32),
  warehouse VARCHAR(100),
  quantity INT,
  reorder_level INT DEFAULT 10,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

--  insert product
INSERT INTO products (product_id, name, category, unit_price, supplier_id)
VALUES ('P001','Blue T-Shirt','Apparel',249.99,'SUP001');

-- Insert sales
INSERT INTO sales (product_id, sale_date, quantity, unit_price, region)
VALUES ('P001','2025-10-01',3,249.99,'South');

-- Insert inventory
INSERT INTO inventory (product_id, warehouse, quantity, reorder_level)
VALUES ('P001','WH-1',25,5);

-- Read queries
SELECT * FROM products;
SELECT * FROM sales WHERE sale_date BETWEEN '2025-10-01' AND '2025-10-31';
SELECT * FROM inventory WHERE quantity < reorder_level;

-- Update example
UPDATE inventory SET quantity = quantity - 3 WHERE product_id='P001' AND warehouse='WH-1';

-- Delete example
DELETE FROM sales WHERE sale_id = 1;

-- Stored procedure to list low-stock items across warehouses

CREATE PROCEDURE get_low_stock()
BEGIN
  SELECT i.product_id, p.name, i.warehouse, i.quantity, i.reorder_level
  FROM inventory i
  JOIN products p ON p.product_id = i.product_id
  WHERE i.quantity <= i.reorder_level
  ORDER BY i.quantity ASC;


-- Call the procedure
CALL get_low_stock();
