-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Insert data into users table
INSERT INTO users (id, name, email) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Alice Johnson', 'alice.johnson@example.com'),
(4, 'Bob Brown', 'bob.brown@example.com'),
(5, 'Charlie Green', 'charlie.green@example.com'),
(6, 'David Adams', 'david.adams@example.com'),
(7, 'Eva Thompson', 'eva.thompson@example.com'),
(8, 'Frank Turner', 'frank.turner@example.com'),
(9, 'Grace Hill', 'grace.hill@example.com'),
(10, 'Hugo Scott', 'hugo.scott@example.com');

-- Create products table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(255) NOT NULL
);

-- Insert data into products table
INSERT INTO products (id, name, price, category) VALUES
(1, 'Smartphone', 500.00, 'Electronics'),
(2, 'Laptop', 900.00, 'Electronics'),
(3, 'Tablet', 300.00, 'Electronics'),
(4, 'Monitor', 200.00, 'Electronics'),
(5, 'Bluetooth Speaker', 100.00, 'Electronics'),
(6, 'Book', 20.00, 'Books'),
(7, 'Headphones', 80.00, 'Electronics'),
(8, 'Keyboard', 50.00, 'Electronics'),
(9, 'Mouse', 30.00, 'Electronics'),
(10, 'Printer', 150.00, 'Electronics');

-- Create orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert data into orders table
INSERT INTO orders (id, user_id, product_id, quantity, created_at) VALUES
(1, 1, 1, 1, '2023-01-10 10:30:00'),
(2, 1, 3, 2, '2023-01-15 14:45:00'),
(3, 2, 2, 1, '2023-02-05 11:15:00'),
(4, 2, 7, 1, '2023-02-10 16:30:00'),
(5, 3, 5, 3, '2023-02-20 12:00:00'),
(6, 3, 1, 1, '2023-02-28 18:00:00'),
(7, 4, 4, 2, '2023-03-04 09:45:00'),
(8, 4, 6, 5, '2023-03-10 15:30:00'),
(9, 5, 9, 2, '2023-03-15 10:15:00'),
(10, 5, 1, 1, '2023-03-18 11:30:00'),
(11, 6, 3, 1, '2023-03-22 14:20:00'),
(12, 6, 8, 1, '2023-03-25 17:10:00'),
(13, 7, 5, 4, '2023-04-01 13:05:00'),
(14, 7, 7, 1, '2023-04-05 16:50:00'),
(15, 8, 2, 1, '2023-04-08 10:30:00'),
(16, 8, 10, 1, '2023-04-12 15:00:00'),
(17, 9, 1, 1, '2023-04-15 11:45:00'),
(18, 9, 4, 1, '2023-04-20 10:15:00'),
(19, 10, 6, 3, '2023-04-22 16:30:00'),
(20, 1, 4, 3, '2023-04-22 16:35:00'),
(21, 10, 3, 1, '2023-04-28 19:00:00');


-- RESULT
SELECT
	u.id,
    u.name,
    u.email,
    SUM(o.quantity * p.price) as total_spent
FROM
    users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id
WHERE
    p.category = 'Electronics'
GROUP BY
    u.id, u.name, u.email
HAVING
    COUNT(o.id) >= 3 AND SUM(o.quantity * p.price) > 1000
ORDER BY
    total_spent DESC;