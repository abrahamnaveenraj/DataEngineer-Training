-- Create database
CREATE DATABASE supply_chain;
USE supply_chain;

-- Suppliers Table
CREATE TABLE Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100),
    phone_number VARCHAR(20)
);

-- Inventory Table
CREATE TABLE Inventory (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10
);

-- Orders Table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT,
    item_id INT,
    order_date DATE,
    delivery_date DATE,
    quantity INT,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id),
    FOREIGN KEY (item_id) REFERENCES Inventory(item_id)
); 


--CRUD OPERATIONS 
INSERT INTO Suppliers (supplier_name, contact_email, phone_number)
VALUES ('ABC Traders', 'abc@traders.com', '9876543210');

INSERT INTO Inventory (item_name, quantity, reorder_level)
VALUES ('Laptop', 50, 10);

INSERT INTO Orders (supplier_id, item_id, order_date, delivery_date, quantity)
VALUES (1, 1, '2025-09-10', '2025-09-20', 20);

UPDATE Inventory
SET quantity = quantity - 20
WHERE item_id = 1;

DELETE FROM Orders WHERE order_id = 1;

SELECT * FROM Orders;
