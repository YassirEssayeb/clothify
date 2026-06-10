SET FOREIGN_KEY_CHECKS = 0;

-- Create Database
CREATE DATABASE IF NOT EXISTS clothify_db;
USE clothify_db;

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'COD',
    payment_status VARCHAR(50) DEFAULT 'Pending',
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing data to prevent duplicates
TRUNCATE TABLE products;

-- Insert Dummy Data
INSERT INTO products (name, price, image, description, category) VALUES
('Premium Tee', 290.00, 'https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elevate your daily style with this premium quality tee.', 'Tops'),
('Denim Jacket', 899.00, 'https://images.pexels.com/photos/13662420/pexels-photo-13662420.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Classic denim jacket with a modern fit and durable design.', 'Outerwear'),
('Summer Dress', 499.00, 'https://images.pexels.com/photos/19895977/pexels-photo-19895977.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Experience ultimate comfort and style with this premium summer dress.', 'Dresses'),
('Canvas Sneakers', 599.00, 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Modern sneakers designed for comfort and durability.', 'Footwear'),
('Linen Shirt', 390.00, 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Light and breathable linen shirt for any occasion.', 'Tops'),
('Chino Pants', 450.00, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=1260', 'Comfortable chino pants with a modern tapered fit.', 'Pants'),
('Beanie Hat', 190.00, 'https://images.pexels.com/photos/11170599/pexels-photo-11170599.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Keep warm and stylish with this premium beanie hat.', 'Accessories'),
('Leather Belt', 340.00, 'https://images.pexels.com/photos/31367058/pexels-photo-31367058.jpeg?auto=compress&cs=tinysrgb&w=1260', 'High-quality leather belt with a classic finish.', 'Accessories'),
('Urban Hoodie', 540.00, 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Stay cozy and stylish with this oversized urban hoodie.', 'Outerwear'),
('Floral Skirt', 350.00, 'https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1260', 'A beautiful floral skirt perfect for spring and summer days.', 'Dresses'),
('Classic Polo', 320.00, 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Timeless polo shirt made from breathable cotton piqué.', 'Tops'),
('Leather Boots', 1200.00, 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Rugged and stylish leather boots built for any adventure.', 'Footwear'),
('Silk Scarf', 250.00, 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=1260', 'Elegant silk scarf to add a touch of class to your outfit.', 'Silk Scarf'),
('Slim Fit Jeans', 650.00, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1260', 'Durable slim-fit jeans with a comfortable stretch.', 'Pants'),
('Wool Overcoat', 1490.00, 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1260', 'Stay warm this winter with our premium wool blend overcoat.', 'Outerwear'),
('Wrist Watch', 850.00, 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Minimalist analog watch with a genuine leather strap.', 'Accessories'),
('Suede Loafers', 950.00, 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Elegant suede loafers for a sophisticated look.', 'Footwear'),
('Aviator Sunglasses', 450.00, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=1260', 'Classic aviator sunglasses with polarized lenses.', 'Accessories'),
('V-Neck Sweater', 590.00, 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?auto=compress&cs=tinysrgb&w=1260', 'Soft wool-blend V-neck sweater for layering.', 'Tops'),
('Cargo Pants', 680.00, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=1260', 'Durable cargo pants with multiple utility pockets.', 'Pants');

-- Create Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;
